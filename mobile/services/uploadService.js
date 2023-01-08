import Api from '@utilities/apiHelper'

const uploadCloudinaryService = async (data) => {
  return await Api.post('/management/upload/cloudinary', data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export { uploadCloudinaryService }
