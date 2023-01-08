import { StyleSheet, View } from 'react-native'
import React from 'react'
import LoginForm from '@components/Forms/LoginForm'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import AuthContainer from '@components/Containers/AuthContainer'
import { useTranslation } from 'react-i18next'

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { isDarkTheme } = useSelector((state) => state.theme)

  return (
    <AuthContainer title={t('Auth.LoginScreen.title')}>
      <LoginForm />

      <View style={styles.actionContainer}>
        <Button
          style={{}}
          mode="text"
          dark={isDarkTheme}
          onPress={() => navigation.navigate('TroubleLoggingInScreen')}
        >
          {t('Auth.LoginScreen.navigation.forgot-password')}
        </Button>
        <Button
          mode="text"
          dark={isDarkTheme}
          onPress={() => navigation.navigate('SignupScreen')}
        >
          {t('Auth.LoginScreen.navigation.sign-up')}
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

export default LoginScreen
