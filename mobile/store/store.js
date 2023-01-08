import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import themeSlice from './slices/themeSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice
  },
})

export { store }
