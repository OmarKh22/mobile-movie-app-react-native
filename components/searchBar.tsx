import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface props{
  onFocus?: () => void;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBar = ({onFocus, placeholder, onChangeText, value}: props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} tintColor="#A8B5DB" className="size-5" />
      <TextInput
        className="text-white flex-1 ml-3"
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor="#b0bde4"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export default SearchBar