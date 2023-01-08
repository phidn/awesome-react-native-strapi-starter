import React, { useState, useReducer, useCallback } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { validateInput } from '@actions/formAction'
import formReducer from '@reducers/formReducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserPasswordService } from '@services/userService'
import { Button } from 'react-native-paper'
import InputV2 from '@components/Input/InputV2'
import PageContainer from '@components/Containers/PageContainer'
import { useTranslation } from 'react-i18next'
import toastHelper from '@utilities/toastHelper'

const ChangePasswordScreen = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isDarkTheme } = useSelector((state) => state.theme)
  const initialFormState = {
    inputValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    inputValidities: {
      currentPassword: undefined,
      newPassword: undefined,
      confirmNewPassword: undefined,
    },
    formIsValid: false,
  }
  const [formState, dispatchFormState] = useReducer(formReducer, initialFormState)
  const [isLoading, setIsLoading] = useState(false)

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

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues
    try {
      setIsLoading(true)
      await updateUserPasswordService(updatedValues)
      dispatchFormState({ type: 'RESET', payload: initialFormState })
      toastHelper.saved()
    } catch (error) {
      toastHelper.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [initialFormState, formState, dispatch])

  return (
    <PageContainer>
      <ScrollView>
        <KeyboardAvoidingView style={styles.formContainer}>
          <InputV2
            id="currentPassword"
            label={t('Settings.ChangePasswordScreen.current-password.label')}
            icon="lock"
            autoCapitalize="none"
            secureTextEntry={true}
            value={formState.inputValues.currentPassword}
            onInputChanged={inputChangedHandler}
          />
          <InputV2
            id="newPassword"
            label={t('Settings.ChangePasswordScreen.new-password.label')}
            icon="form-textbox-password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={formState.inputValues.newPassword}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities.newPassword}
          />
          <InputV2
            id="confirmNewPassword"
            label={t('Settings.ChangePasswordScreen.confirm-new-password.label')}
            icon="form-textbox-password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={formState.inputValues.confirmNewPassword}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities.confirmNewPassword}
          />
          <View style={styles.action}>
            <Button
              disabled={!formState.formIsValid}
              icon="account-check-outline"
              mode="contained"
              dark={isDarkTheme}
              onPress={saveHandler}
              loading={isLoading}
            >
              {t('Common.save')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  action: {
    marginTop: 30,
  },
  loading: {
    marginTop: 20,
  },
  snackbar: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
})

export default ChangePasswordScreen
