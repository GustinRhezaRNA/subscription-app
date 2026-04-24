import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ListHeading = ({ title, onPress }: ListHeadingProps) => {
  return (
    <View className='list-head'>
      <Text className='list-title'>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text className='list-action-text'>See All</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListHeading