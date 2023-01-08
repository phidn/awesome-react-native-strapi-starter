import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, { payload }) => {
      state.token = payload.token
      state.userData = payload.userData
      state.didTryAutoLogin = true
    },
    setDidTryAutoLogin: (state) => {
      state.didTryAutoLogin = true
    },
    logout: (state) => {
      state.token = null
      state.userData = null
      state.didTryAutoLogin = false
    },
    updateUserData: (state, { payload }) => {
      state.userData = { ...state.userData, ...payload }
    },
  },
})

export const { authenticate, setDidTryAutoLogin, logout, updateUserData } = authSlice.actions
export default authSlice.reducer
