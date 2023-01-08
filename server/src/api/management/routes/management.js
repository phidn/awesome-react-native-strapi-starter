module.exports = {
  routes: [
    /**
     * ====================================================
     * User routes
     */
    {
      method: 'PUT',
      path: '/management/users/me',
      handler: 'management.updateUser',
    },
    {
      method: 'PUT',
      path: '/management/users/password',
      handler: 'management.updateUserPassword',
    },
    {
      method: 'PUT',
      path: '/v2/management/users/me',
      handler: 'management.updateUserV2',
    },

    /**
     * ====================================================
     * Auth routes
     */
    {
      method: 'POST',
      path: '/management/auth/forgot-password',
      handler: 'auth-override.forgotPassword',
    },

    /**
     * ====================================================
     * Upload routes
     */
    {
      method: 'POST',
      path: '/management/upload/cloudinary',
      handler: 'upload-cloudinary.uploadCloudinary',
    },
  ],
}
