import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './screens/Login'
import Register from './screens/Register'
import ProductNavigation from '../product/ProductNavigation'
import Hello from './screens/Hello'

const Stack = createNativeStackNavigator()

const UserNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Hello' component={Hello} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ProductNavigation' component={ProductNavigation} />
        </Stack.Navigator>
    )
}

export default UserNavigation
