import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ImageBackground, Pressable } from 'react-native'
import { ProductContext } from '../ProductContext'
import LottieView from 'lottie-react-native';
import loading from '../../../lottie/loading.json'

const Home = (props) => {
    const { navigation } = props
    const { onGetProductForHomePage } = useContext(ProductContext)
    const [data, setData] = useState([])

    useEffect(async () => {
        const res = await onGetProductForHomePage()
        setData(res)
    }, [])


    const renderHeader = () => {
        return (
            <View>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.imageBackground}
                    resizeMode='cover'>
                    <Text style={styles.textImageBackground}>Planta - toả sáng</Text>
                    <Text style={styles.textImageBackground}>không gian nhà bạn</Text>
                    <Text style={styles.textViewMore}>Xem hàng mới về <Image source={require('../../../assets/images/arrowright.png')} /></Text>
                </ImageBackground>
            </View>
        )
    }

    const renderFotter = () => {
        return (
            <View style={styles.footterContainer}>
                <Text style={styles.textCombo}>Combo chắm sóc mới</Text>
                <View style={styles.footterContainerDetail}>
                    <View style={styles.footterText}>
                        <Text style={styles.textLemon}>Lemon Balm Grow Kit </Text>
                        <Text style={styles.textDetail}>Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker đánh dấu...</Text>
                    </View>
                    <Image source={require('../../../assets/images/footterFlatlist.png')} />
                </View>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        const { name, products } = item
        return (
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryName}>{name}</Text>
                <View style={styles.productsContainer}>
                    {
                        products.map(pro => {
                            return (
                                <Pressable
                                    onPress={() => navigation.navigate('Detail', { id: pro._id })}
                                    style={styles.product} key={pro._id}>
                                    <View style={styles.productImageContainer}>
                                        <Image style={styles.productImage}
                                            resizeMode='cover'
                                            source={{ uri: pro.images[0] }}
                                        />
                                    </View>
                                    <View style={styles.productNameContainer}>
                                        <Text numberOfLines={1}
                                            style={styles.productName}>{pro.name}</Text>
                                    </View>
                                    <View style={styles.productPriceContainer}>
                                        <Text style={styles.productPrice}>{pro.price}đ</Text>
                                    </View>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                data.length == 0 ?
                    <View style={styles.lottieContainer}>
                        <LottieView style={styles.lottieView} resizeMode='contain' autoSize source={loading} autoPlay loop />
                    </View>
                    : <FlatList
                        data={data}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFotter}
                        keyExtractor={item => item._id}
                    />
            }


        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    lottieContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottieView: {
        width: 300,
    },
    textImageBackground: {
        fontWeight: '500',
        fontSize: 20,
    },
    textViewMore: {
        fontWeight: '500',
        fontSize: 16,
        color: '#007537'
    },
    imageBackground: {
        width: '100%',
        height: 205,
        paddingTop: 30,
        paddingLeft: 10
    },
    textDetail: {
        fontWeight: 'normal',
        fontSize: 14,
        color: '#7D7B7B',
    },
    textLemon: {
        fontWeight: '500',
        fontSize: 16,
    },
    footterContainerDetail: {
        flexDirection: 'row'
    },
    footterText: {
        backgroundColor: '#F6F6F6',
        width: '65%',
        justifyContent: 'center',
        padding: 24
    },
    footterContainer: {
        padding: 24,
    },
    textCombo: {
        fontWeight: '500',
        fontSize: 24,
        marginBottom: 15,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: '600',
        color: '#007537'
    },
    productPriceContainer: {

    },
    productName: {
        fontSize: 16,
        color: '#221F1F',
        fontWeight: '500'
    },
    productNameContainer: {

    },
    productImage: {
        width: 100,
        height: 100,
    },
    productImageContainer: {
        height: 134,
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    product: {
        width: Dimensions.get('window').width / 2 - 31.5,
        marginBottom: 15,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    categoryName: {
        color: '#221F1F',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 16,
    },
    categoryContainer: {
        padding: 24
    },
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    }
})

