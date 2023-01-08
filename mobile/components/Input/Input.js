import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'

const Input = ({ label, icon, errorText, onInputChanged, id, initialValue, ...props }) => {
  const theme = useTheme()
  const [value, setValue] = useState(initialValue)
  const onChangeText = (text) => {
    setValue(text)
    onInputChanged(id, text)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={styles.input}
          label={label}
          value={value}
          onChangeText={onChangeText}
          right={<TextInput.Icon icon={icon} />}
        />
      </View>
      {errorText?.length && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{errorText[0]}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontSize: 13,
  },
})

export default Input
