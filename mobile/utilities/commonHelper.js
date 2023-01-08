const isString = (string) => Object.prototype.toString.call(string) === '[object String]'

const isInteger = (number) => /^-?[0-9]+$/.test(number + '')
const isIntegerPositive = (number) => /^[0-9]+$/.test(number + '') && number > 0
const isIntegerPositiveIncludeZero = (number) => /^[0-9]+$/.test(number + '')

const hasChanges = (data, newData) => {
  for (const key in data) {
    if (data[key] !== newData[key]) {
      return true
    }
  }

  return false
}

export { isString, isInteger, isIntegerPositive, isIntegerPositiveIncludeZero, hasChanges }
