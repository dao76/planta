import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from './Cart';
import ShoppingComplete from './ShoppingComplete';
import Home from './Home'

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Cart' component={Cart} />
            <Stack.Screen name='ShoppingComplete' component={ShoppingComplete} />
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}

export default CartStack

const styles = StyleSheet.create({})