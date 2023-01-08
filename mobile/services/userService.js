import Api from '@utilities/apiHelper'

const getUserService = async (jwt) => {
  return await Api.get('/users/me', {
    headers: { Authorization: `Bearer ${jwt}` },
  })
}

const updateUserService = async (newData) => {
  return await Api.put('/management/users/me', newData)
}

const updateUserV2Service = async (formData) => {
  return await Api.put('/v2/management/users/me', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

const updateUserPasswordService = async (newData) => {
  return await Api.put('/management/users/password', newData)
}

// prettier-ignore
export {
  getUserService,
  updateUserService,
  updateUserV2Service,
  updateUserPasswordService
}
