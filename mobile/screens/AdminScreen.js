import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text, ToggleButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { toggleMode } from '@store/slices/themeSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logHelper from '@utilities/logHelper'
import toastHelper from '@utilities/toastHelper'

const AdminScreen = (props) => {
  const dispatch = useDispatch()
  const [modeStatus, setModeStatus] = useState('light')

  const onToggleMode = (value) => {
    dispatch(toggleMode())
    setModeStatus(modeStatus === 'light' ? 'dark' : 'light')
  }

  const logAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          logHelper('AsyncStorage item', { [store[i][0]]: store[i][1] })
          return true
        })
      })
    })
  }

  const clearAsyncStorage = () => {
    AsyncStorage.clear()
  }

  const toastErrorMessage = () => {
    // toastHelper.error()
    toastHelper.error('Something when something and something is something & something something...')
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        dark={false}
        mode="contained"
        onPress={() => props.navigation.navigate('ProfileScreen')}
      >
        Go to ProfileScreen
      </Button>
      <Button
        style={styles.button}
        dark={false}
        mode="contained"
        onPress={() => props.navigation.navigate('SettingsScreen')}
      >
        Go to SettingsScreen
      </Button>
      <ToggleButton
        icon="theme-light-dark"
        value="theme-light-dark"
        status={modeStatus === 'light' ? 'unchecked' : 'checked'}
        onPress={onToggleMode}
        style={styles.button}
      />
      <Button style={styles.button} dark={false} mode="contained" onPress={logAsyncStorage}>
        Log AsyncStorage
      </Button>
      <Button style={styles.button} dark={false} mode="contained" onPress={clearAsyncStorage}>
        Clear AsyncStorage
      </Button>
      <Button style={styles.button} dark={false} mode="contained" onPress={toastErrorMessage}>
        Toast error message
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    margin: 10,
    borderRadius: 0,
  },
})

export default AdminScreen
