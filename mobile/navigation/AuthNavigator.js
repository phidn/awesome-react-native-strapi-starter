import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@screens/LoginScreen'
import SignupScreen from '@screens/SignupScreen'
import TroubleLoggingInScreen from '@screens/TroubleLoggingInScreen'
import ResetPasswordScreen from '@screens/ResetPasswordScreen'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="TroubleLoggingInScreen" component={TroubleLoggingInScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
