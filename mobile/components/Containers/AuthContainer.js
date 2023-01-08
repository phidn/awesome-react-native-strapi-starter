import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '@components/Logo/Logo'
import { useTheme, Text } from 'react-native-paper'
import PageContainer from './PageContainer'

const AuthContainer = ({ children, title }) => {
  const theme = useTheme()

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
            <View style={styles.logoContainer}>
              <Logo color={theme.colors.tertiary} width={200} height={100} />
            </View>
            {title && (
              <View style={styles.screenTitleContainer}>
                <Text variant="headlineMedium">{title}</Text>
              </View>
            )}
            {children}
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  screenTitleContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
})

export default AuthContainer
