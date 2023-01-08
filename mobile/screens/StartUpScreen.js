import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { authenticate, setDidTryAutoLogin } from '@store/slices/authSlice'
import { getUserService } from '@services/userService'
import { commonStyles } from '@constants/commonStyles'

const StartUpScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const storedAuthInfo = await AsyncStorage.getItem('userData')
        const { token, userId } = JSON.parse(storedAuthInfo) || {}
        if (!storedAuthInfo || !token || !userId) {
          dispatch(setDidTryAutoLogin())
          return
        }

        const userData = await getUserService(token)
        
        if (userData?.id) {
          dispatch(authenticate({ token, userData }))
        } else {
          throw new Error('Invalid credentials')
        }
      } catch (error) {
        dispatch(setDidTryAutoLogin())
      }
    }
    tryLogin()
  }, [dispatch])

  return (
    <View style={commonStyles.center}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  )
}

export default StartUpScreen
