import Api from '@utilities/apiHelper'

const signUpService = async (data) => {
  return await Api.post('/auth/local/register', data)
}

const signInService = async (data) => {
  return await Api.post('/auth/local', data)
}

const requestResetPasswordService = async (data) => {
  return await Api.post('/management/auth/forgot-password', data)
}

const resetPasswordService = async (data) => {
  return await Api.post('/auth/reset-password', data)
}

export { signUpService, signInService, requestResetPasswordService, resetPasswordService }
