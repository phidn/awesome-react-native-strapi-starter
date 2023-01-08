import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import SettingsScreen from '@screens/SettingsScreen'
import BottomTabNavigator from './BottomTabNavigator'
import ProfileScreen from '@screens/ProfileScreen'
import ChangePasswordScreen from '@screens/ChangePasswordScreen'
import LanguageSettingScreen from '@screens/LanguageSettingScreen'
import ThemeColorsSettingScreen from '@screens/ThemeColorsSettingScreen'

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: t('Navigation.MainNavigator.StackScreen.settings'),
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: t('Navigation.MainNavigator.StackScreen.profile'),
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerTitle: t('Navigation.MainNavigator.StackScreen.change-password'),
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="LanguageSettingScreen"
        component={LanguageSettingScreen}
        options={{
          headerTitle: t('Navigation.MainNavigator.StackScreen.language'),
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="ThemeColorsSettingScreen"
        component={ThemeColorsSettingScreen}
        options={{
          headerTitle: t('Navigation.MainNavigator.StackScreen.theme-colors'),
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
