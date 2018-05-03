import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const MapButton = (props) => {

  const { onPress, color, icon, name } = props

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      >
      <Icon
        name={name}
        type='material-icons'
        size={40}
        icon = {icon}
        color={color}
        raised
        containerStyle={{width: 50, height: 50, borderRadius: 31}}
        />
    </TouchableOpacity>
  )
}

export default {MapButton}
