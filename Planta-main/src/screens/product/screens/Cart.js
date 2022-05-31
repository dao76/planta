import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Pressable, FlatList, Image, Dimensions, Modal, ToastAndroid } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProductContext } from '../ProductContext';
import LottieView from 'lottie-react-native';
import emptyFrame from '../../../lottie/emptyFrame.json'

const CartItems = (props) => {

    const { cart } = props
    const { updateCart } = useContext(ProductContext)

    const [refeshing, setRefeshing] = useState(false)

    const renderItem = ({ item }) => {
        const { product, quantity, price, checked } = item

        return (
            <View style={styles.itemContainer}>
                {/* <View style={styles.checkedContainer}>
                    {
                        checked == true ?
                            <FontAwesome name="check-square" size={24} color="black" />
                            :
                            <FontAwesome name="square-o" size={24} color="black" />
                    }
                </View> */}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode='cover'
                        source={{ uri: product.images[0] }} />
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <Text numberOfLines={1}>{product.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>{product.price}đ</Text>
                    </View>
                    <View style={styles.quantityAction}>
                        <Text
                            onPress={() => updateCart(product, quantity - 1, price, true)}
                            style={styles.removeAction}>-</Text>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <Text
                            onPress={() => updateCart(product, quantity + 1, price, true)}
                            style={styles.addAction}>+</Text>
                        {/* <Text style={styles.deleteAction}>Xóa</Text> */}
                    </View>
                </View>
            </View>
        )
    }

    const onRefresh = () => {
        setRefeshing(true)

        setRefeshing(false)
    }

    return (
        <FlatList
            data={cart}
            renderItem={renderItem}
            style={styles.flatListContainer}
            keyExtractor={item => Math.random()}
            showsVerticalScrollIndicator={false}
            refreshing={refeshing}
            onRefresh={onRefresh}
        />
    )
}

const DeleteModal = (props) => {
    const { isShowDeleteModal, setIsShowDeleteModal } = props
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isShowDeleteModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.checkout}>Xác nhận xóa tất cả đơn hàng</Text>
                    <Pressable style={styles.checkoutButton}>
                        <Text style={styles.checkoutText}>Đồng ý</Text>
                    </Pressable>
                    <Text onPress={() => setIsShowDeleteModal(false)} style={styles.cancel}>Hủy bỏ</Text>
                </View>
            </View>
        </Modal>
    )
}

const CheckoutModal = (props) => {
    const { navigation } = props
    const { isShowModal, setIsShowModal } = props
    const { onSaveCart } = useContext(ProductContext)

    const checkOut = () => {
        onSaveCart()
        ToastAndroid.show('Pay success', ToastAndroid.BOTTOM)
        setIsShowModal(false)
        navigation.navigate('ShoppingComplete')
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isShowModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.checkout}>Xác nhận thanh toán</Text>
                    <Pressable
                        onPress={checkOut}
                        style={styles.checkoutButton}>
                        <Text style={styles.checkoutText}>Đồng ý</Text>
                    </Pressable>
                    <Text onPress={() => setIsShowModal(false)} style={styles.cancel}>Hủy bỏ</Text>
                </View>
            </View>
        </Modal>
    )
}

const EmprtyFrames = (props) => {
    return (
        <View style={styles.lottieViewContainer}>
            <LottieView resizeMode='contain' autoSize source={emptyFrame} autoPlay loop />
            <Text>Giỏ hàng của bạn đang trống!</Text>
        </View>
    )
}

const Cart = (props) => {
    const { navigation } = props
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModalModal] = useState(false)

    const { cart, setCart } = useContext(ProductContext)

    const isShowCheckout = () => {
        const items = cart.filter(item => item.checked == true) || []
        let total = 0
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            total += element.quantity * element.price

        }
        return { isShow: items.length > 0, total: total }
    }

    return (
        <View style={styles.container}>
            {
                cart.length == 0 ?
                    <EmprtyFrames />
                    :
                    <>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Giỏ hàng</Text>
                            {/* <FontAwesome onPress={() => setIsShowDeleteModalModal(true)}
                                style={styles.trash} name="trash-o" size={24} color="black" /> */}
                        </View>
                        {/* <View>
                            {
                                cart.length == 0 ?
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.empty}>Giỏ hàng của bạn đang trống</Text>
                                    </View> :
                                    <CartItems cart={cart} />
                            }
                        </View> */}
                        <View>
                            <CartItems cart={cart} />
                        </View>
                        <View style={styles.checkoutContainer}>
                            {
                                isShowCheckout().isShow == true ?
                                    <>
                                        <View style={styles.totalContainer}>
                                            <Text style={styles.totalText}>Tạm tính</Text>
                                            <Text>{isShowCheckout().total}đ</Text>
                                        </View>
                                        <Pressable onPress={() => setIsShowModal(true)} style={styles.buttonContainer}>
                                            <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
                                            <MaterialIcons style={styles.buttonIcon}
                                                name="keyboard-arrow-right" size={24} color="white" />
                                        </Pressable>
                                    </> : <></>
                            }

                        </View>
                        <CheckoutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} navigation={navigation} />
                        <DeleteModal isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModalModal} />
                    </>
            }
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    lottieViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 8,
    },
    checkoutText: {
        color: 'white'
    },
    checkoutButton: {
        backgroundColor: '#007537',
        height: 50,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    checkout: {
        color: '#252A31',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 30,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

    },
    flatListContainer: {
        maxHeight: Dimensions.get('window').height - 200,
        width: '92%'
    },
    buttonText: {
        color: 'white',
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#007537',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
        width: '100%'
    },
    totalText: {
        opacity: 0.6,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    checkoutContainer: {
        paddingHorizontal: 28,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    trash: {
        position: 'absolute',
        right: 24,
    },
    deleteAction: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
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
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        color: '#007537',
        fontSize: 16,
    },
    image: {
        width: '80%',
        height: '80%',
    },
    infoContainer: {
        marginLeft: 0,
    },
    imageContainer: {
        width: 77,
        height: 77,
        borderRadius: 8,
        marginLeft: 0,
    },
    checkedContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 24,
        paddingHorizontal: 24,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        textTransform: 'uppercase',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        position: 'relative',
    }
})



