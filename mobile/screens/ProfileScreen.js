import React, { useState, useReducer, useCallback } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Input from '@components/Input/Input'
import PageContainer from '@components/Containers/PageContainer'
import ProfileImage from '@components/ProfileImage/ProfileImage'
import { validateInput } from '@actions/formAction'
import { updateProfile } from '@actions/authAction'
import formReducer from '@reducers/formReducer'
import { useTranslation } from 'react-i18next'
import toastHelper from '@utilities/toastHelper'

const ProfileScreen = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)
  const { isDarkTheme } = useSelector((state) => state.theme)
  const initialFormState = {
    inputValues: {
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      about: userData.about || '',
      imageUrl: userData.imageUrl || '',
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
      imageUrl: undefined,
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
      const updateProfileAction = updateProfile(updatedValues, userData)
      await dispatch(updateProfileAction)
      toastHelper.saved()
    } catch (error) {
      toastHelper.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, formState, userData])

  const hasChanges = () => {
    const currentValues = formState.inputValues
    for (const inputId in currentValues) {
      if (currentValues[inputId] !== userData[inputId]) {
        return true
      }
    }

    return false
  }

  return (
    <PageContainer>
      <ScrollView>
        <KeyboardAvoidingView style={styles.formContainer}>
          <ProfileImage
            size={80}
            userId={userData.userId}
            uri={userData.imageUrl}
            onImageChange={(tempUri) => inputChangedHandler('imageUrl', tempUri)}
          />
          <Input
            id="firstName"
            label={t('Settings.ProfileScreen.first-name.label')}
            icon="account"
            initialValue={userData.firstName}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities.firstName}
          />
          <Input
            id="lastName"
            label={t('Settings.ProfileScreen.last-name.label')}
            icon="account"
            initialValue={userData.lastName}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities.lastName}
          />
          <Input
            id="email"
            label={t('Settings.ProfileScreen.email.label')}
            icon="email"
            autoCapitalize="none"
            keyboardType="email-address"
            initialValue={userData.email}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities.email}
          />
          <Input
            id="about"
            label={t('Settings.ProfileScreen.about.label')}
            icon="account-box-outline"
            initialValue={userData.about}
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities.about}
          />
          <View style={styles.action}>
            <Button
              disabled={!formState.formIsValid || !hasChanges()}
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

export default ProfileScreen
