import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStack from './screens/HomeStack'
import CartStack from './screens/CartStack'
import ProfileStack from './screens/ProfileStack'
import SearchStack from './screens/SearchStack'

const Tab = createBottomTabNavigator();

const ProductNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen name='HomeStack' component={HomeStack} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/images/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: 'black'
                            }}
                        />
                        {
                            focused ? <Image source={require('../../assets/images/dot.png')} /> : null
                        }

                    </View>
                )
            }} />
            <Tab.Screen name='SearchStack' component={SearchStack} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/images/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: 'black'
                            }}
                        />
                        {
                            focused ? <Image source={require('../../assets/images/dot.png')} /> : null
                        }
                    </View>
                )
            }} />
            <Tab.Screen name='CartStack' component={CartStack} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/images/shopping.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor:'black'
                            }}
                        />
                        {
                            focused ? <Image source={require('../../assets/images/dot.png')} /> : null
                        }
                    </View>
                )
            }} />
            <Tab.Screen name='ProfileStack' component={ProfileStack} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../assets/images/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: 'black'
                            }}
                        />
                        {
                            focused ? <Image source={require('../../assets/images/dot.png')} /> : null
                        }
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

export default ProductNavigation
