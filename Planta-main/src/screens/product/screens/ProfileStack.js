import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Profile'
import EditProfile from './EditProfile'
import CartHistory from './CartHistory'

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='CartHistory' component={CartHistory} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})