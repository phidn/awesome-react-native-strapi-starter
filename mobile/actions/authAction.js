import { authenticate, logout, updateUserData } from '@store/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logHelper from '@utilities/logHelper'
import {
  requestResetPasswordService,
  resetPasswordService,
  signInService,
  signUpService,
} from '@services/authService'
import { updateUserV2Service } from '@services/userService'
import uuid from 'react-native-uuid'
import i18n from '@config/i18n'

// prettier-ignore
const signUp = ({ firstName, lastName, email, password }) => async (dispatch) => {
  try {
    const { jwt: token, user: userData } = await signUpService({
      username: email,
      email,
      password,
      firstName,
      lastName,
    })

    dispatch(authenticate({ token, userData }))
    saveDataToStorage({ token, userId: userData.id })
  } catch (error) {
    logHelper('signUp error', error)
    const message =
      error.message === 'Email or Username are already taken'
        ? i18n.t('Auth.LoginForm.error.email-taken')
        : i18n.t('Common.error.wrong')
    throw new Error(message)
  }
}

// prettier-ignore
const signIn = ({ email, password }) => async (dispatch) => {
  try {
    const { jwt: token, user: userData } = await signInService({ identifier: email, password })
    dispatch(authenticate({ token, userData }))
    saveDataToStorage({ token, userId: userData.id })
  } catch (error) {
    logHelper('signIn error', error)
    const message =
      error.message === 'Invalid identifier or password' || 'Forbidden'
        ? i18n.t('Auth.LoginForm.error.invalid')
        : i18n.t('Common.error.wrong')
    throw new Error(message)
  }
}

// prettier-ignore
const requestResetPassword = async ({ email }) => {
  try {
    await requestResetPasswordService({ email })
  } catch (error) {
    logHelper('requestResetPassword error', error)
    throw new Error(i18n.t('Common.error.wrong'))
  }
}

// prettier-ignore
const resetPassword = ({ code, newPassword }) => async (dispatch) => {
  try {
    const { jwt: token, user: userData } = await resetPasswordService({
      code,
      password: newPassword,
      passwordConfirmation: newPassword
    })
    dispatch(authenticate({ token, userData }))
    saveDataToStorage({ token, userId: userData.id })
  } catch (error) {
    logHelper('resetPassword error', error)
    const message = error.name === 'ValidationError'? error.message: i18n.t('Common.error.wrong')
    throw new Error(message)
  }
}

const logoutUser = () => async (dispatch) => {
  AsyncStorage.clear()
  dispatch(logout())
}

const saveDataToStorage = ({ token, userId }) => {
  AsyncStorage.setItem('userData', JSON.stringify({ token, userId }))
}

const updateProfile = (updatedValues, userData) => async (dispatch) => {
  const formData = new FormData()
  if (updatedValues.imageUrl && updatedValues.imageUrl !== userData.imageUrl) {
    const ext = updatedValues.imageUrl.split('.').pop() || 'jpg'
    const file = {
      name: uuid.v4(),
      type: `image/${ext}`,
      uri: updatedValues.imageUrl,
    }
    formData.append('files.imageUrl', file)
    delete updatedValues.imageUrl
  }
  formData.append('data', JSON.stringify(updatedValues))
  await updateUserV2Service(formData)
  dispatch(updateUserData(updatedValues))
}

// prettier-ignore
export { 
  signUp,
  signIn,
  logoutUser,
  requestResetPassword,
  resetPassword,
  updateProfile
}
