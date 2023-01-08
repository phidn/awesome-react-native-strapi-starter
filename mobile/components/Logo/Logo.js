import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Logo = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20">
      <Path
        d="m24 12-5.72 5.746-5.724-5.741 5.724-5.75L24 12zM5.72 6.254 0 12l5.72 5.746h11.44L5.72 6.254z"
        fill={color}
      />
    </Svg>
  )
}

export default Logo
