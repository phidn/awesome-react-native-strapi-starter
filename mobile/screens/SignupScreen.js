import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import SignUpForm from '@components/Forms/SignUpForm'
import AuthContainer from '@components/Containers/AuthContainer'
import { useTranslation } from 'react-i18next'

const SignupScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { isDarkTheme } = useSelector((state) => state.theme)

  return (
    <AuthContainer title={t('Auth.SignupScreen.title')}>
      <SignUpForm />
      <View style={styles.actionContainer}>
      <Button mode="text" dark={isDarkTheme} onPress={() => navigation.navigate('LoginScreen')}>
        {t('Auth.SignupScreen.navigation.login')}
      </Button>
      </View>
    </AuthContainer>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 20,
  },
})

export default SignupScreen
