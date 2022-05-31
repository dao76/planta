import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ToastAndroid, Modal } from 'react-native'
import { UserConText } from '../UserConText'
import LottieView from 'lottie-react-native';
import planta from '../../../lottie/planta.json'
import loading from '../../../lottie/loading.json'
import ld from '../../../lottie/ld.json'

const ShowModalLoading = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            // onRequestClose={() => {
            //     Alert.alert("Modal has been closed.");
            //     setModalVisible(!modalVisible);
            // }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <LottieView style={styles.lottieView} resizeMode='contain' autoSize source={ld} autoPlay loop />
                    <Text>Loading...</Text>
                </View>
            </View>
        </Modal>
    )
}

const Login = (props) => {
    const { navigation } = props
    const { onLogin, email, setEmail, password, setPassword } = useContext(UserConText)
    const [modalVisible, setModalVisible] = useState(false);

    const login = async () => {
        setModalVisible(true)
        const result = await onLogin(email, password)
        if (result == false) {
            ToastAndroid.show('Login Fail', ToastAndroid.BOTTOM)
            setModalVisible(false)
        }
    }

    return (
        // <KeyboardAvoidingView>
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {/* <Image style={styles.image}
                        source={require('../../../assets/images/banner.png')} /> */}
                    <LottieView style={styles.image} resizeMode='contain' autoSize source={planta} autoPlay loop />
                </View>
                <View style={styles.fromContainer}>
                    <Text style={styles.planta}>Planta</Text>
                    <Text style={styles.slogan}>Mua sắm và trải nghiệm sản phẩm cây trồng cùng phụ kiện độc đáo duy nhất tại Việt Nam</Text>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput} />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry />
                    <Pressable
                        onPress={login}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#007537' : '#7D7B7B'
                            },
                            styles.button
                        ]}
                    >
                        <Text style={styles.login}>Đăng nhập</Text>
                    </Pressable>
                    <Text onPress={() => navigation.replace('Register')}
                        style={styles.register}>Đăng ký</Text>
                </View>
                <ShowModalLoading modalVisible={modalVisible} />
            </View>
        </ScrollView>
        // </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    lottieView: {
        width: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    register: {
        marginTop: 11,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    login: {
        color: 'white',
    },
    button: {
        height: 50,
        width: '100%',
        // backgroundColor: '#7D7B7B',
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 4,
        height: 40,
        width: '100%',
        fontSize: 14
    },
    slogan: {
        fontSize: 14,
        lineHeight: 26,
    },
    planta: {
        color: '#007537',
        fontSize: 30,
        fontWeight: 'bold',
        // paddingVertical: 27,
    },
    fromContainer: {
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '100%',
        height: 330
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    }
})
