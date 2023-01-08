import { validate } from 'validate.js'
import { isIntegerPositive, isIntegerPositiveIncludeZero, isString } from './commonHelper'
import i18n from '@config/i18n'

const validateName = (name, value) => {
  const constraints = {
    presence: { allowEmpty: false, message: i18n.t('Validation.required') },
  }
  if (isString(value) && value !== '') {
    constraints.format = {
      pattern: "^(?!\s)([a-z ,.'-]+)$",
      flags: 'i',
      message: i18n.t('Validation.letters'),
    }
  }
  const result = validate({ [name]: value }, { [name]: constraints })
  return result && result[name]
}

const validateLetters = (name, value) => {
  const constraints = {
    presence: { allowEmpty: false, message: i18n.t('Validation.required') },
  }
  if (isString(value) && value !== '') {
    constraints.format = {
      pattern: '[a-z]+',
      flags: 'i',
      message: i18n.t('Validation.letters'),
    }
  }
  const result = validate({ [name]: value }, { [name]: constraints })
  return result && result[name]
}

const validateLength = (name, value, minLength, maxLength, allowEmpty) => {
  const constraints = {
    presence: { allowEmpty: allowEmpty, message: i18n.t('Validation.required') },
    length: {},
  }
  if (!allowEmpty || value) {
    if (isIntegerPositiveIncludeZero(minLength)) {
      constraints.length.minimum = minLength
      constraints.length.tooShort = i18n.t('Validation.length.too-short')
    }
    if (isIntegerPositive(maxLength)) {
      constraints.length.maximum = maxLength
      constraints.length.tooLong = i18n.t('Validation.length.too-long')
    }
  }
  const result = validate({ [name]: value }, { [name]: constraints })
  return result && result[name]
}

const validateEmail = (name, value) => {
  const constraints = {
    presence: { allowEmpty: false, message: i18n.t('Validation.required') },
    email: { message: i18n.t('Validation.email') },
  }
  const result = validate({ [name]: value }, { [name]: constraints })
  return result && result[name]
}

const validatePassword = (name, value) => {
  const constraints = {
    presence: { allowEmpty: false, message: i18n.t('Validation.required') },
    length: { minimum: 6, message: i18n.t('Validation.password') },
  }
  const result = validate({ [name]: value }, { [name]: constraints })
  return result && result[name]
}

const validateCode = (name, value) => {
  const constraints = {
    presence: { allowEmpty: false, message: i18n.t('Validation.required') },
  }
  if (isString(value) && value !== '') {
    constraints.format = {
      pattern: '[a-z0-9]+',
      flags: 'i',
      message: i18n.t('Validation.code'),
    }
  }
  const result = validate({ [name]: value }, { [name]: constraints })
  return result && result[name]
}

export {
  validateName,
  validateLetters,
  validateEmail,
  validatePassword,
  validateLength,
  validateCode,
}
