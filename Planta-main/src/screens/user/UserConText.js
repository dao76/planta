import React, {createContext, useState} from 'react'
import { login, register, editInfomation } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserConText = createContext();

export const UserConTextProvider = (props) => {
    const {children} = props
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [infomation, setInfomation] = useState()

    const onLogin = async (email, password) => {
        try {
            const res = await login(email, password)
            if (res.error == false) {
                const token = res.data.token
                await AsyncStorage.setItem('token', token)
                setIsLoggedIn(true)
                return true
            }
        } catch (error) {
            console.log('onLogin error: ', error)
        }
        await AsyncStorage.removeItem('item')
        setIsLoggedIn(false)
        return false
    }

    const onRegister = async (email, password) => {
        try {
            const res = await register(email, password)
            if (res.error == false) {
                return true
            }
        } catch (error) {
            console.log('error' , error)
        }
        return false
    }

    const onInfomation = async (email, password) => {
        const res = await login(email, password);
        if (res.error == false){
            return res.data.user
        }else{
            return false
        }
    }

    const onEditInfomation = async (obj) => {
        const res = await editInfomation(obj)
        if (res.error == false){
            return true
        }
        return false
    }

    return(
        <UserConText.Provider
            value={{
                isLoggedIn,
                onLogin,onRegister, onInfomation, email, setEmail, password, setPassword,
                setInfomation, infomation, onEditInfomation
            }}
        >
            {children}
        </UserConText.Provider>
    )
} 
