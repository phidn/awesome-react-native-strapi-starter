import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import { storageKeys } from '@constants/storageKeys'
import logHelper from './logHelper'

const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      await AsyncStorage.getItem(storageKeys.appLang).then((language) => {
        // console.log('→ language:', language)
        if (language) {
          return callback(language)
        } else {
          return callback(Localization.locale)
        }
      })
    } catch (error) {
      logHelper('languageDetector error', error)
    }
  },
  cacheUserLanguage: async function (language) {
    // console.log('→ cacheUserLanguage language:', language)
    try {
      await AsyncStorage.setItem(storageKeys.appLang, language)
    } catch (error) {}
  },
}

export { languageDetector }
