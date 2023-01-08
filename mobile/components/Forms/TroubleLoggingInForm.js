import React, { useCallback, useReducer, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { requestResetPassword } from '@actions/authAction'
import { validateInput } from '@actions/formAction'
import formReducer from '@reducers/formReducer'
import Input from '@components/Input/Input'
import { useTranslation } from 'react-i18next'
import toastHelper from '@utilities/toastHelper'

const initialFormState = {
  inputValues: {
    email: '',
  },
  inputValidities: {
    email: false,
  },
  formIsValid: false,
}

const TroubleLoggingInForm = ({ isDarkTheme, navigation }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formState, dispatchFormState] = useReducer(formReducer, initialFormState)

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      dispatchFormState({
        type: 'INPUT_CHANGE',
        payload: {
          inputId,
          inputValue,
          validationResult: validateInput(inputId, inputValue),
        },
      })
    },
    [dispatchFormState]
  )

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      await requestResetPassword(formState.inputValues)
      navigation.navigate('ResetPasswordScreen', formState.inputValues)
    } catch (error) {
      toastHelper.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, formState])

  return (
    <>
      <Input
        id="email"
        label={t('Auth.TroubleLoggingInForm.email.label')}
        icon="email"
        autoCapitalize="none"
        keyboardType="email-address"
        initialValue={formState.inputValues.email}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.email}
      />

      <Button
        icon="send-lock-outline"
        mode="contained"
        dark={isDarkTheme}
        onPress={authHandler}
        loading={isLoading}
        style={styles.submitButton}
        disabled={!formState.formIsValid}
      >
        {t('Auth.TroubleLoggingInForm.button.send-email')}
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 20,
  },
})

export default TroubleLoggingInForm
