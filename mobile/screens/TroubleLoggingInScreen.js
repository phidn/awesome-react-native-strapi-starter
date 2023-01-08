import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import TroubleLoggingInForm from '@components/Forms/TroubleLoggingInForm'
import AuthContainer from '@components/Containers/AuthContainer'
import { useTranslation } from 'react-i18next'

const TroubleLoggingInScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const { isDarkTheme } = useSelector((state) => state.theme)

  return (
    <AuthContainer title={t('Auth.TroubleLoggingInScreen.title')}>
      <TroubleLoggingInForm navigation={navigation} />

      <View style={styles.actionContainer}>
        <Button mode="text" dark={isDarkTheme} onPress={() => navigation.navigate('LoginScreen')}>
          {t('Auth.TroubleLoggingInForm.button.back-to-login')}
        </Button>
        <Button mode="text" dark={isDarkTheme} onPress={() => navigation.navigate('SignupScreen')}>
          {t('Auth.TroubleLoggingInForm.button.create-new-account')}
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

export default TroubleLoggingInScreen
