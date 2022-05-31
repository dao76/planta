import React, { useState, useContext, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Pressable, ToastAndroid } from 'react-native'
import PagerView from 'react-native-pager-view'
import { ProductContext } from '../ProductContext'

const PartiaView = (props) => {
    const {product, navigation} = props
    const { price, size, madein, quantity, _id } = product

    const {cart, setCart, updateCart} = useContext(ProductContext)

    const [number, setNumber] = useState(0)

    const onNumberChange = (isAdd) => {
        if (isAdd == true) {
            setNumber(number + 1)
        } else if (isAdd == false && number >= 1) {
            setNumber(number - 1)
        }
    }

    const addProductToCart = () => {
        updateCart(product, number, price, true)
        ToastAndroid.show('add success', ToastAndroid.BOTTOM)
    }

    return (
        <>
            <View style={styles.productInfoContainer}>
                <Text style={styles.productPrice}>{price}đ</Text>
                <Text style={styles.productTitle}>Chi tiết sản phẩm</Text>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Kích cỡ</Text>
                    <Text style={styles.productDetailText}>{size}</Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Xuất xứ</Text>
                    <Text style={styles.productDetailText}>{madein}</Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Tình trạng</Text>
                    <Text style={styles.productDetailText}>Còn {quantity} sp</Text>
                </View>
            </View>
            <View style={styles.cartProcessContainer}>
                <View style={styles.processQuantity}>
                    <Text style={styles.quantityText}>Đã chọn {number} sản phẩm</Text>
                    <View style={styles.quantityAction}>
                        <Text onPress={() => onNumberChange(false)} style={styles.removeAction}>-</Text>
                        <Text style={styles.quantity}>{number}</Text>
                        <Text onPress={() => onNumberChange(true)} style={styles.addAction}>+</Text>
                    </View>
                </View>
                <View style={styles.processTotal}>
                    <Text style={styles.totalText}>Tạm tính</Text>
                    <Text style={styles.total}>{number * price}đ</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={addProductToCart} style={[styles.button, number > 0 ? styles.changeBackgroundColor : null]}>
                    <Text style={styles.buttonText}>Chọn mua</Text>
                </Pressable>
            </View>
        </>
    )
}

const Detail = (props) => {
    const { navigation, route: { params: { id } } } = props

    const { onGetProductDetail } = useContext(ProductContext)

    const [product, setProduct] = useState(null)

    useEffect(async () => {
        const res = await onGetProductDetail(id)
        setProduct(res)
        return () => { res }
    }, [])

    if (!product){
        return (<></>)
    }

    const { name, images, price, size, madein, quantity } = product

    return (
        <View style={styles.container}>
            <View style={styles.productNameContainer}>
                <Image source={require('../../../assets/images/chevronleft.png')} />
                <Text numberOfLines={1} style={styles.productName}>{name}</Text>
                <Image source={require('../../../assets/images/frame.png')} />
            </View>
            <View style={styles.productImagesContainer}>
                <PagerView style={styles.productImagesPager}
                    initialPage={0} orientation='horizontal'>
                    {
                        images.map(img => {
                            return (
                                <Image key={Math.random()}
                                    source={{ uri: img }}
                                    style={styles.productImage}
                                    resizeMode='contain' />
                            )
                        })
                    }
                </PagerView >
            </View>
            <PartiaView product={product} navigation={navigation}/>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    changeBackgroundColor: {
        backgroundColor: '#007537'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase',
    },
    button: {
        backgroundColor: '#ABABAB',
        borderRadius: 8,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 24,
        height: 50,
        marginTop: 16,
    },
    total: {
        marginTop: 4,
        textAlign: 'right',
        fontSize: 24,
        fontWeight: '500',
    },
    totalText: {
        color: 'black',
        opacity: 0.6,
    },
    processTotal: {

    },
    addAction: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 22.5,
        height: 22.5,
        textAlign: 'center',
        lineHeight: 20.5,
        color: 'black',
    },
    quantity: {

    },
    removeAction: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 22.5,
        height: 22.5,
        textAlign: 'center',
        lineHeight: 20.5,
        color: 'black',
    },
    quantityAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    quantityText: {
        fontSize: 14,
        opacity: 0.6,
    },
    processQuantity: {

    },
    cartProcessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    productDetailText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3A3A3A'
    },
    productDetail: {
        borderBottomColor: '#221F1F',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3A3A3A',
        marginTop: 15,
        borderBottomColor: '#221F1F',
        borderBottomWidth: 0.5,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: '500',
        color: '#007537',
    },
    productInfoContainer: {
        paddingHorizontal: 48,
        paddingVertical: 32,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    productImagesPager: {
        flex: 1,
    },
    productImagesContainer: {
        width: '100%',
        height: 210,
    },
    productNameContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        height: 55,
        marginTop: 20,
    },
    productName: {
        fontSize: 15,
        fontWeight: '500',
    },
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    }
})

