import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ToastAndroid, Modal } from 'react-native'
import { UserConText } from '../UserConText'
import ld from '../../../lottie/ld.json'
import LottieView from 'lottie-react-native';

const Register = (props) => {
    const { navigation } = props

    const { onRegister, setEmail, setPassword } = useContext(UserConText)
    const [modalVisible, setModalVisible] = useState(false);

    const [email, setEmail2] = useState()
    const [password, setPassword2] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const register = async () => {
        setModalVisible(true)
        if (confirmPassword.trim() == password.trim()) {
            const res = await onRegister(email, password)
            if (res == false) {
                setModalVisible(false)
                ToastAndroid.show('Đăng ký không thành công', ToastAndroid.BOTTOM)
            } else {
                setModalVisible(false)
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.BOTTOM)
                setEmail(email)
                setPassword(password)
                navigation.replace('Login')
            }
        } else {
            setModalVisible(false)
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.BOTTOM)
        }
    }

    return (
        // <KeyboardAvoidingView>
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.fromContainer}>
                    <Text style={styles.planta}>Planta</Text>
                    <Text style={styles.slogan}>Mua sắm và trải nghiệm sản phẩm cây trồng cùng phụ kiện độc đáo duy nhất tại Việt Nam</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail2}
                        placeholder='Email'
                        style={styles.textInput} />
                    <TextInput
                        value={password}
                        onChangeText={setPassword2}
                        placeholder='Password'
                        style={styles.textInput} secureTextEntry />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder='Confirm Password'
                        style={styles.textInput} secureTextEntry />
                    <Pressable
                        onPress={register}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#007537' : '#7D7B7B'
                            },
                            styles.button
                        ]}
                    >
                        <Text style={styles.login}>Đăng ký</Text>
                    </Pressable>
                    <Text onPress={() => navigation.replace('Login')} style={styles.register}>Đăng nhập</Text>
                </View>
            </View>
            <ShowModalLoading modalVisible={modalVisible} />
        </ScrollView>
        // </KeyboardAvoidingView>
    )
}

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

export default Register

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
        paddingVertical: 27,
        marginTop: 48,
    },
    fromContainer: {
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
})
