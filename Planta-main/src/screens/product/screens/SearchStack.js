import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from './Search';
import Detail from './Detail';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  )
}

export default SearchStack

const styles = StyleSheet.create({})