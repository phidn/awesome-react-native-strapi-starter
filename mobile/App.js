import { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { changeTheme } from '@store/slices/themeSlice'
import { appFonts } from '@constants/appFonts'
import AppNavigator from '@navigation/AppNavigator'
import logHelper from '@utilities/logHelper'
import '@config/i18n'

function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load fonts
        await Font.loadAsync(appFonts)

        // Load theme from AsyncStorage
        const theme = await AsyncStorage.getItem('theme')
        if (theme) {
          const themeData = JSON.parse(theme)
          store.dispatch(changeTheme(themeData))
        }
      } catch (error) {
        logHelper('App prepare error', error)
      } finally {
        setAppIsLoaded(true)
      }
    }

    prepare()
  }, [])

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [appIsLoaded])

  return appIsLoaded? (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  ): null
}

export default App
