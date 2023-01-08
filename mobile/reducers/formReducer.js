const formReducer = (state, { type, payload }) => {
  switch (type) {
    case 'INPUT_CHANGE': {
      const { inputId, inputValue, validationResult } = payload
      
      const updatedInputValues = {
        ...state.inputValues,
        [inputId]: inputValue
      }

      const updatedInputValidities = {
        ...state.inputValidities,
        [inputId]: validationResult,
      }
      let updatedFormIsValid = true
      for (const key in updatedInputValidities) {
        if (Object.hasOwnProperty.call(updatedInputValidities, key)) {
          const inputValidate = updatedInputValidities[key]
          if (inputValidate !== undefined) {
            updatedFormIsValid = false
            break
          }
        }
      }

      return {
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formIsValid: updatedFormIsValid,
      }
    }
    case 'RESET': {
      return payload
    }
    default:
      return state
  }
}

export default formReducer
