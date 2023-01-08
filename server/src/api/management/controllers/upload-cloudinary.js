const { parseMultipartData } = require('@strapi/utils')
const { ApplicationError } = require('@strapi/utils').errors
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
})

const uploadCloudinary = async (ctx, next) => {
  try {
    const uploadData = parseMultipartData(ctx)
    
    if (!uploadData?.files) {
      throw new Error('Invalid file upload')
    }

    const file = Object.entries(uploadData.files)[0][1]
    const result = await cloudinary.uploader.upload(file.path)
    if (!result.secure_url) {
      throw new Error('Error uploading to cloudinary')
    }

    return {
      ok: true,
      data: result.secure_url
    }
  } catch (error) {
    console.log('→ controller.upload-cloudinary.upload error', error)
    throw new ApplicationError(error.message)
  }
}

module.exports = {
  uploadCloudinary
}
