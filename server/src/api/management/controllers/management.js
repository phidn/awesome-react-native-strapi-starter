const _ = require('lodash')
const { parseMultipartData } = require('@strapi/utils')
const { uploadCloudinary } = require('./upload-cloudinary')
const { ApplicationError } = require('@strapi/utils').errors

const getController = (name) => {
  return strapi.plugins['users-permissions'].controller(name)
}

const updateUser = async (ctx, next) => {
  const user = ctx.state.user

  // User has to be logged in to update themselves
  if (!user) {
    return ctx.unauthorized()
  }

  // Pick only specific fields for security
  const newData = _.pick(ctx.request.body, [
    'email',
    'username',
    'firstName',
    'lastName',
    'about',
    'imageUrl',
  ])

  // Make sure there is no duplicate user with the same email
  if (newData.email) {
    const userWithSameEmail = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { email: newData.email.toLowerCase() } })

    if (userWithSameEmail && userWithSameEmail.id != user.id) {
      return ctx.badRequest('Email already taken')
    }
    newData.email = newData.email.toLowerCase()
  }

  // Check if user is changing password and make sure passwords match
  if (newData.password) {
    if (!newData.confirmPassword) {
      return ctx.badRequest('Missing password confirmation')
    } else if (newData.password !== newData.confirmPassword) {
      return ctx.badRequest("Passwords don't match")
    }
    delete newData.confirmPassword
  }

  // Reconstruct context so we can pass to the controller
  ctx.request.body = newData
  ctx.params = { id: user.id }

  // Update the user and return the sanitized data
  return await getController('user').update(ctx)
}

const updateUserPassword = async (ctx, next) => {
  const user = ctx.state.user

  // User has to be logged in to update themselves
  if (!user) {
    return ctx.unauthorized()
  }

  // Pick only specific fields for security
  const newData = _.pick(ctx.request.body, [
    'currentPassword',
    'newPassword',
    'confirmNewPassword',
  ])

  // Check if user is changing password and make sure passwords match
  if (newData.currentPassword) {
    if (!newData.confirmNewPassword) {
      return ctx.badRequest('Missing new password confirmation')
    } else if (newData.newPassword !== newData.confirmNewPassword) {
      return ctx.badRequest("Passwords don't match")
    }
    const validPassword = await strapi
      .plugin('users-permissions')
      .service('user')
      .validatePassword(newData.currentPassword, user.password)
    if (validPassword) {
      newData.password = newData.newPassword
      delete newData.newPassword
      delete newData.confirmNewPassword
    } else {
      return ctx.badRequest('Invalid current password')
    }
  } else {
    return ctx.badRequest('Missing current password')
  }

  // Reconstruct context so we can pass to the controller
  ctx.request.body = newData
  ctx.params = { id: user.id }

  // Update the user and return the sanitized data
  return await getController('user').update(ctx)
}

const updateUserV2 = async (ctx, next) => {
  try {
    const { files, data } = parseMultipartData(ctx)
    
    if (!_.isEmpty(files)) {
      const uploadResult = await uploadCloudinary(ctx)
      if (uploadResult.data) {
        data.imageUrl = uploadResult.data
      }
    }
    
    ctx.request.body = data
    await updateUser(ctx, next)

  } catch (error) {
    console.log('→ controller.management.updateUserV2 error', error)
    throw new ApplicationError(error.message)
  }
}

module.exports = {
  updateUser,
  updateUserPassword,
  updateUserV2,
}
