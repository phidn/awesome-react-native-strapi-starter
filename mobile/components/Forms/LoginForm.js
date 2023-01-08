import React, { useCallback, useReducer, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { signIn } from '@actions/authAction'
import { validateInput } from '@actions/formAction'
import formReducer from '@reducers/formReducer'
import Input from '@components/Input/Input'
import toastHelper from '@utilities/toastHelper'

const isTestMode = true

const initialFormState = isTestMode
  ? {
      inputValues: {
        email: 'phidndev@gmail.com',
        password: '123456789',
      },
      inputValidities: {
        email: true,
        password: true,
      },
      formIsValid: true,
    }
  : {
      inputValues: {
        email: '',
        password: '',
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formIsValid: false,
    }

const LoginForm = ({ isDarkTheme }) => {
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
      const singInAction = signIn(formState.inputValues)
      await dispatch(singInAction)
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
        label={t('Auth.LoginForm.email.label')}
        icon="email"
        autoCapitalize="none"
        keyboardType="email-address"
        initialValue={formState.inputValues.email}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities.email}
      />
      <Input
        id="password"
        label={t('Auth.LoginForm.password.label')}
        icon="lock"
        autoCapitalize="none"
        secureTextEntry={true}
        initialValue={formState.inputValues.password}
        onInputChanged={inputChangedHandler}
      />
      <Button
        icon="login"
        mode="contained"
        dark={isDarkTheme}
        onPress={authHandler}
        loading={isLoading}
        style={styles.submitButton}
      >
        {t('Auth.LoginForm.button.login')}
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

export default LoginForm
