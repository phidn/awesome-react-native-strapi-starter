import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import userImage from '@assets/images/userImage.jpeg'
import { Feather } from '@expo/vector-icons'
import { launchImagePicker } from '@utilities/imagePickerHelper'
import { useState } from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const ProfileImage = ({ size, uri, onImageChange }) => {
  const theme = useTheme()
  const source = uri ? { uri } : userImage
  const [image, setImage] = useState(source)
  const [isLoading, setIsLoading] = useState(false)

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (tempUri) {
        onImageChange(tempUri)
        setImage({ uri: tempUri })
        setIsLoading(true)
      }
    } catch (error) {} finally {
      setIsLoading(false)
    }
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      {isLoading ? (
        <View style={[styles.loadingContainer, { width: size, height: size }]}>
          <ActivityIndicator animating={true} size="small" />
        </View>
      ) : (
        <Image source={image} style={[styles.image, {
          width: size,
          height: size,
          borderColor: theme.colors.outline,
        }]} />
      )}
      <View style={[styles.editIconContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Feather name="edit-3" size={15} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderWidth: 1,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 6,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProfileImage
