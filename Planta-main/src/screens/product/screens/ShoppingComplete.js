import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import shopping from '../../../lottie/shopping.json'

const ShoppingComplete = (props) => {
    const { navigation } = props

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Mua hàng thành công</Text>
            </View>
            <View>
                <LottieView style={styles.lottieView} resizeMode='contain' autoSize source={shopping} autoPlay loop />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ShoppingComplete

const styles = StyleSheet.create({
    textContainer: {
        height: '15%'
    },
    text: {
        fontSize: 24
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
    },
    button: {
        backgroundColor: '#007537',
        borderRadius: 8,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 24,
        height: 50,
        marginTop: 16,
    },
    lottieView: {
        width: '80%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})