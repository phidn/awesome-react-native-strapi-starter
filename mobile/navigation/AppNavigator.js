import React, { useState, useEffect, useMemo } from 'react'
import MainNavigator from './MainNavigator'
import { useDispatch, useSelector } from 'react-redux'
import StartUpScreen from '@screens/StartUpScreen'
import { setupInterceptor } from '@utilities/apiHelper'
import { store } from '@store/store'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Platform, StatusBar } from 'react-native'
import AuthNavigator from './AuthNavigator'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import { getCombined } from '@utilities/themeHelper'

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token)
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin)
  const { isDarkTheme, themeColor } = useSelector((state) => state.theme)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setupInterceptor(store)
    setMounted(true)
  }, [])

  const [theme, inverseTheme, barStyle, barColor] = useMemo(() => {
    const combinedTheme = getCombined(themeColor)
    const lightTheme = combinedTheme.light
    const darkTheme = combinedTheme.dark

    let barStyle
    if (Platform.OS === 'android') {
      barStyle = 'light-content'
    } else {
      barStyle = isDarkTheme ? 'light-content' : 'dark-content'
    }
    const barColor = isDarkTheme
      ? lightTheme.colors.primary
      : darkTheme.colors.inversePrimary

    const inverseTheme = isDarkTheme ? lightTheme: darkTheme
    const theme = isDarkTheme ? darkTheme : lightTheme

    return [theme, inverseTheme, barStyle, barColor]
  }, [Platform, isDarkTheme, themeColor])

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: inverseTheme.colors.primary,
          backgroundColor: theme.colors.inverseSurface,
        }}
        text1Style={{ color: theme.colors.surface }}
        text1NumberOfLines={2}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: inverseTheme.colors.primary,
          backgroundColor: theme.colors.inverseSurface,
        }}
        text1Style={{ color: theme.colors.surface }}
        text1NumberOfLines={2}
      />
    ),
  }

  return mounted ? (
    <PaperProvider theme={theme}>
      <StatusBar barStyle={barStyle} backgroundColor={barColor} />
      <NavigationContainer theme={theme}>
        {isAuth && <MainNavigator />}
        {!isAuth && didTryAutoLogin && <AuthNavigator />}
        {!isAuth && !didTryAutoLogin && <StartUpScreen />}
      </NavigationContainer>
      <Toast position="bottom" onPress={() => Toast.hide()} config={toastConfig} />
    </PaperProvider>
  ) : null
}

export default AppNavigator
