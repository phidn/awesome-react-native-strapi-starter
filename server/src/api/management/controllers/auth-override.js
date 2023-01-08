/**
 * node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js
 */
const crypto = require('crypto')
const { yup, validateYupSchema } = require('@strapi/utils')
const utils = require('@strapi/utils')
const { getAbsoluteAdminUrl, getAbsoluteServerUrl, sanitize } = utils
const _ = require('lodash')
const getService = (name) => {
  return strapi.plugin('users-permissions').service(name)
}

const forgotPasswordSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .noUnknown()
const validateForgotPasswordBody = validateYupSchema(forgotPasswordSchema)

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state
  const userSchema = strapi.getModel('plugin::users-permissions.user')

  return sanitize.contentAPI.output(user, userSchema, { auth })
}

const forgotPassword = async (ctx, next) => {
  const { email } = await validateForgotPasswordBody(ctx.request.body)

  const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' })

  const emailSettings = await pluginStore.get({ key: 'email' })
  const advancedSettings = await pluginStore.get({ key: 'advanced' })

  // Find the user by email.
  const user = await strapi
    .query('plugin::users-permissions.user')
    .findOne({ where: { email: email.toLowerCase() } })

  if (!user || user.blocked) {
    return ctx.send({ ok: true })
  }

  // Generate random token.
  const userInfo = await sanitizeUser(user, ctx)

  const resetPasswordToken = crypto.randomBytes(4).toString('hex')

  const resetPasswordSettings = _.get(emailSettings, 'reset_password.options', {})
  const emailBody = await getService('users-permissions').template(resetPasswordSettings.message, {
    URL: advancedSettings.email_reset_password,
    SERVER_URL: getAbsoluteServerUrl(strapi.config),
    ADMIN_URL: getAbsoluteAdminUrl(strapi.config),
    USER: userInfo,
    TOKEN: resetPasswordToken,
  })

  const emailObject = await getService('users-permissions').template(resetPasswordSettings.object, {
    USER: userInfo,
  })

  const emailToSend = {
    to: user.email,
    from:
      resetPasswordSettings.from.email || resetPasswordSettings.from.name
        ? `${resetPasswordSettings.from.name} <${resetPasswordSettings.from.email}>`
        : undefined,
    replyTo: resetPasswordSettings.response_email,
    subject: emailObject,
    text: emailBody,
    html: emailBody,
  }

  // NOTE: Update the user before sending the email so an Admin can generate the link if the email fails
  await getService('user').edit(user.id, { resetPasswordToken })

  // Send an email to the user.
  await strapi.plugin('email').service('email').send(emailToSend)

  ctx.send({ ok: true })
}

module.exports = {
  forgotPassword,
}
