import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Input from '@components/Input/Input'
import { validateInput } from '@actions/formAction'
import formReducer from '@reducers/formReducer'
import { signUp } from '@actions/authAction'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import toastHelper from '@utilities/toastHelper'

const initialFormState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
}

const SignUpForm = ({ isDarkTheme }) => {
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
      const singUpAction = signUp(formState.inputValues)
      await dispatch(singUpAction)
    } catch (error) {
      toastHelper.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, formState])

  return (
    <>
      <Input
        id="firstName"
        label={t('Auth.SignUpForm.first-name.label')}
        icon="account"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.firstName}
      />
      <Input
        id="lastName"
        label={t('Auth.SignUpForm.last-name.label')}
        icon="account"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.lastName}
      />
      <Input
        id="email"
        label={t('Auth.SignUpForm.email.label')}
        icon="email"
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.email}
      />
      <Input
        id="password"
        label={t('Auth.SignUpForm.password.label')}
        icon="form-textbox-password"
        autoCapitalize="none"
        secureTextEntry={true}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.password}
      />
      
      <Button
        icon="account-check"
        mode="contained"
        dark={isDarkTheme}
        onPress={authHandler}
        loading={isLoading}
        style={styles.submitButton}
        disabled={!formState.formIsValid}
      >
        {t('Auth.SignUpForm.button.signup')}
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 30,
  },
})

export default SignUpForm
