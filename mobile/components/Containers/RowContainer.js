import { View } from 'react-native'
import React from 'react'

const RowContainer = ({ style, reverse, children, ...rest }) => {
  const direction = reverse ? 'row-reverse' : 'row'

  return (
    <View style={[style, { flexDirection: direction }]} {...rest}>
      {children}
    </View>
  )
}

export default RowContainer
