import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import SettingsScreen from '@screens/SettingsScreen'
import AdminScreen from '@screens/AdminScreen'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator initialRouteName="Admin">
      <Tab.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          title: t('Navigation.BottomTabNavigator.TabScreen.admin'),
          tabBarLabel: t('Navigation.BottomTabNavigator.TabScreen.admin'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'bug' : 'bug-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('Navigation.BottomTabNavigator.TabScreen.settings'),
          tabBarLabel: t('Navigation.BottomTabNavigator.TabScreen.settings'),
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
