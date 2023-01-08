import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { List, Switch, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '@store/slices/themeSlice'
import { logoutUser } from '@actions/authAction'
import { useTranslation } from 'react-i18next'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isDarkTheme } = useSelector((state) => state.theme)

  const toggleColorMode = useCallback(() => {
    dispatch(toggleMode())
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutUser())
  }, [])

  return (
    <View style={styles.container}>
      <List.Section style={{ backgroundColor: theme.colors.surfaceVariant }}>
        <List.Item
          title={t('Settings.SettingsScreen.item.profile.label')}
          left={(props) => <List.Icon {...props} icon="account-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate('ProfileScreen')}
        />
        <List.Item
          title={t('Settings.SettingsScreen.item.change-password.label')}
          left={(props) => <List.Icon {...props} icon="lock-reset" />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        />
        <List.Item
          title={t('Settings.SettingsScreen.item.logout.label')}
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logoutHandler}
        />
      </List.Section>

      <List.Section style={{ backgroundColor: theme.colors.surfaceVariant }}>
        <List.Item
          title={t('Settings.SettingsScreen.item.language.label')}
          left={(props) => <MaterialIcons {...props} name="language" size={24} />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate('LanguageSettingScreen')}
        />
        <List.Item
          title={t('Settings.SettingsScreen.item.color-mode.label')}
          description={
            isDarkTheme
              ? t('Settings.SettingsScreen.item.color-mode.dark')
              : t('Settings.SettingsScreen.item.color-mode.light')
          }
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => <Switch value={isDarkTheme} onValueChange={toggleColorMode} />}
        />
        <List.Item
          title={t('Settings.SettingsScreen.item.theme-colors.label')}
          left={(props) => <Ionicons {...props} name="color-palette-outline" size={24} />}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => navigation.navigate('ThemeColorsSettingScreen')}
        />
      </List.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  listSection: {},
})
export default SettingsScreen
