import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface props{
  onPress?: ()=>void
  palceholder: string
}

const SearchBar = ({onPress , palceholder}: props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} tintColor="#A8B5DB" className="size-5" />
      <TextInput className='text-white flex-1 ml-3'
      onPress={onPress}
      placeholder={palceholder}
      placeholderTextColor="#b0bde4"
      value=''
      onChangeText={()=>{}}
      />
    </View>
  )
}

export default SearchBar