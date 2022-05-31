import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { UserConText } from '../../user/UserConText'
import LottieView from 'lottie-react-native';
import loading from '../../../lottie/loading.json'

const Profile = (props) => {
    const { navigation } = props
    const { onInfomation, email, password, setInfomation } = useContext(UserConText)
    const [data, setData] = useState()
    const [getLoading, setLoading] = useState(true)

    useEffect(async () => {
        const result = await onInfomation(email, password)
        setData(result)
        console.log('result = ', result);
        setInfomation(result)
        setLoading(false)
    }, [])

    return (
        <View style={styles.container}>
            {
                getLoading == true ?
                    <View style={styles.lottieContainer}>
                        <LottieView style={styles.lottieView} resizeMode='contain' autoSize source={loading} autoPlay loop />
                    </View> :
                    <>
                        <Text style={styles.title}>Profile</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.avatarContainer}>
                                {
                                    !data.avatar ?
                                    <Image style={styles.avatar} 
                                        source={require('../../../assets/images/user.png')} />
                                    :
                                    <Image source={{ uri: data.avatar }} resizeMode='cover'
                                    style={styles.avatar} />
                                }
                            </View>
                            <View style={styles.nameContainer}>
                                <Text numberOfLines={1} style={styles.name}>{data.name}</Text>
                                <Text numberOfLines={1} style={styles.email}>{data.email}</Text>
                            </View>
                        </View>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionTitle}>Chung</Text>
                            <Text onPress={() => navigation.replace('EditProfile')} style={styles.action}>Chỉnh sửa thông tin</Text>
                            <Text onPress={() => navigation.navigate('CartHistory')} style={styles.action}>Lịch sử giao dịch</Text>
                            <Text style={styles.actionTitle}>Ứng dụng</Text>
                            <Text style={[styles.action, styles.logout]}>Đăng xuất</Text>
                        </View></>
            }

        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    lottieContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottieView: {
        width: 300,
    },
    logout: {
        color: '#FF0000'
    },
    action: {
        marginTop: 15,
    },
    actionTitle: {
        fontSize: 16,
        color: '#7F7F7F',
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1,
        marginTop: 16,
    },
    actionContainer: {
        marginTop: 0,
    },
    email: {
        fontSize: 14,
        color: '#7F7F7F',
    },
    name: {
        fontSize: 16,
    },
    nameContainer: {
        marginLeft: 26,
    },
    avatar: {
        width: '80%',
        height: '80%',
        borderRadius: 20,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    infoContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 15,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingHorizontal: 48,
    }
})

