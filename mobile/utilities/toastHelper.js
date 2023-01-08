import Toast from 'react-native-toast-message'
import i18n from '@config/i18n'

const toastError = (message) => {
  Toast.show({
    type: 'error',
    text1: message || i18n.t('Common.error.wrong'),
    visibilityTime: 7000,
  })
}

const toastSuccess = (message) => {
  Toast.show({ type: 'success', text1: message, visibilityTime: 7000 })
}

const toastSaved = () => {
  Toast.show({ type: 'success', text1: i18n.t('Common.saved'), visibilityTime: 7000 })
}

const toastHelper = {
  error: toastError,
  success: toastSuccess,
  saved: toastSaved,
}

export default toastHelper
