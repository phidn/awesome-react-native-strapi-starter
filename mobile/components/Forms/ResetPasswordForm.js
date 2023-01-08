import React, { useCallback, useReducer, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { resetPassword } from '@actions/authAction'
import { validateInput } from '@actions/formAction'
import formReducer from '@reducers/formReducer'
import Input from '@components/Input/Input'
import { useTranslation } from 'react-i18next'
import toastHelper from '@utilities/toastHelper'

const initialFormState = {
  inputValues: {
    code: '',
    newPassword: '',
  },
  inputValidities: {
    code: false,
    newPassword: false,
  },
  formIsValid: false,
}

const ResetPasswordForm = ({ isDarkTheme, email }) => {
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
      const resetPasswordAction = resetPassword(formState.inputValues)
      await dispatch(resetPasswordAction)
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
        label={t('Auth.ResetPasswordForm.email.label')}
        icon="email"
        autoCapitalize="none"
        keyboardType="email-address"
        initialValue={email}
        disabled={true}
      />
      <Input
        id="code"
        label={t('Auth.ResetPasswordForm.code.label')}
        icon="key-minus"
        autoCapitalize="none"
        initialValue={formState.inputValues.code}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.code}
      />
      <Input
        id="newPassword"
        label={t('Auth.ResetPasswordForm.new-password.label')}
        icon="lock"
        autoCapitalize="none"
        secureTextEntry={true}
        initialValue={formState.inputValues.newPassword}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.newPassword}
      />

      <Button
        icon="account-check-outline"
        mode="contained"
        dark={isDarkTheme}
        onPress={authHandler}
        loading={isLoading}
        style={styles.submitButton}
        disabled={!formState.formIsValid}
      >
        {t('Auth.ResetPasswordForm.button.reset-password')}
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

export default ResetPasswordForm
