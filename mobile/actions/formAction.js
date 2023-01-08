import {
  validateEmail,
  validatePassword,
  validateLetters,
  validateLength,
  validateCode,
  validateName
} from '@utilities/validationConstraints'

const validateInput = (inputId, inputValue) => {
  switch (inputId) {
    case 'firstName':
    case 'lastName':
      return validateName(inputId, inputValue)
    case 'email':
      return validateEmail(inputId, inputValue)
    case 'newPassword':
    case 'confirmNewPassword':
    case 'password':
      return validatePassword(inputId, inputValue)
    case 'about':
      return validateLength(inputId, inputValue, 5, 10, true)
    case 'code':
      return validateCode(inputId, inputValue)
    default:
      return
  }
}

export { validateInput }
