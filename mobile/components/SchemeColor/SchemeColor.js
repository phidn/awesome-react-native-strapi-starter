import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RowContainer from '@components/Containers/RowContainer'
import { Avatar } from 'react-native-paper'

const SchemeColor = ({ colors, style, gap = 10 }) => {
  return (
    <RowContainer style={[ style, { paddingHorizontal: gap / -2, } ]}>
      {colors.map((color, index) => (
        <Avatar.Text
          key={`color_${color}_${index}`}
          size={14}
          style={{ backgroundColor: color, marginHorizontal: gap / 2, }}
        />
      ))}
    </RowContainer>
  )
}

export default SchemeColor
