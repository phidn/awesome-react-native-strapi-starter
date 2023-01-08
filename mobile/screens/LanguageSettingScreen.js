import { StyleSheet, View } from 'react-native'
import React from 'react'
import { List, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { storageKeys } from '@constants/storageKeys'
import AsyncStorage from '@react-native-async-storage/async-storage'
import availableLanguages from '@constants/availableLanguages'

const LanguageSettingScreen = () => {
  const { i18n } = useTranslation()
  const theme = useTheme()
  const listItemStyle = [styles.languageItem, { borderColor: theme.colors.onBackground }]

  const changeLanguageHandler = async (language) => {
    await AsyncStorage.setItem(storageKeys.appLang, language)
    i18n.changeLanguage(language)
  }

  return (
    <View>
      {availableLanguages.map((language) => (
        <List.Item
          key={language.code}
          style={listItemStyle}
          title={language.label}
          onPress={() => changeLanguageHandler(language.code)}
          right={(props) =>
            i18n.resolvedLanguage === language.code 
              ? <List.Icon {...props} icon="check" /> 
              : <List.Icon {...props} icon="check" style={styles.invisible} />
          }
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  languageItem: {
    borderBottomWidth: 1,
  },
  invisible: {
    opacity: 0
  }
})

export default LanguageSettingScreen
