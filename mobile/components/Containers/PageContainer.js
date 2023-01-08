import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

const PageContainer = (props) => {
  const theme = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }, props.style]}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})

export default PageContainer
