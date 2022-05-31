import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import UserNavigation from '../user/UserNavigation'
import ProductNavigation from '../product/ProductNavigation'
import { UserConText } from '../user/UserConText';

export default Navigation = () => {
    const {isLoggedIn} = useContext(UserConText)
    return (
        <NavigationContainer>
            {
                isLoggedIn == true ? 
                <ProductNavigation/> : 
                <UserNavigation/>
            }
        </NavigationContainer>
    )
}


