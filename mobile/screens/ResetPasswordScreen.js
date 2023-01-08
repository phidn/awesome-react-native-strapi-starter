import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import ResetPasswordForm from '@components/Forms/ResetPasswordForm'
import AuthContainer from '@components/Containers/AuthContainer'
import { useTranslation } from 'react-i18next'

const ResetPasswordScreen = ({ navigation, route: { params } }) => {
  const { t } = useTranslation()
  const { isDarkTheme } = useSelector((state) => state.theme)

  return (
    <AuthContainer title={t('Auth.ResetPasswordScreen.title')}>
      <ResetPasswordForm isDarkTheme={isDarkTheme} navigation={navigation} email={params.email} />

      <View style={styles.actionContainer}>
        <Button mode="text" dark={isDarkTheme} onPress={() => navigation.navigate('TroubleLoggingInScreen')}>
          {t('Auth.ResetPasswordScreen.navigation.trouble-logging-in')}
        </Button>
        <Button mode="text" dark={isDarkTheme} onPress={() => navigation.navigate('LoginScreen')}>
          {t('Auth.ResetPasswordScreen.navigation.login')}
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

export default ResetPasswordScreen
