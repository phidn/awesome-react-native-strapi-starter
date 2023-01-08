import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkTheme: true,
    themeColor: 'Healing',
  },
  reducers: {
    toggleMode: (state, {}) => {
      state.isDarkTheme = !state.isDarkTheme
      AsyncStorage.setItem('theme', JSON.stringify(state))
    },
    changeThemeColor: (state, { payload }) => {
      state.themeColor = payload
      AsyncStorage.setItem('theme', JSON.stringify(state))
    },
    changeTheme: (state, { payload }) => {
      if (payload.hasOwnProperty('themeColor')) {
        state.themeColor = payload.themeColor
      }
      if (payload.hasOwnProperty('isDarkTheme')) {
        state.isDarkTheme = payload.isDarkTheme
      }
      AsyncStorage.setItem('theme', JSON.stringify(state))
    }
  },
})

export const { toggleMode, changeThemeColor, changeTheme } = themeSlice.actions
export default themeSlice.reducer
