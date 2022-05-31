import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Image, FlatList, Button, TouchableOpacity, Pressable, ToastAndroid } from 'react-native'
import { ProductContext } from '../ProductContext'

const Search = (props) => {
    const { navigation } = props
    const [dataArr, setDataArr] = useState([])
    const [history, setHistory] = useState(dataHistory)
    const [searchProduct, setSearchProduct] = useState('')

    const { onGetProductSearch } = useContext(ProductContext)

    const filterData = () => dataArr.filter(item => item.name.toLowerCase().includes(searchProduct.toLowerCase()))

    useEffect(async () => {
        const res = await onGetProductSearch()
        setDataArr(res)
    }, [])

    const addHistoryItem = (item) => {
        let check = false
        history.forEach(element => {
            if (element.id == item._id) {
                check = true
                return
            }
        });
        if (!check) {
            const obj = {}
            obj.id = item._id
            obj.name = item.name
            setHistory([...history, obj])
        }
        navigation.navigate('Detail', { id: item._id })
    }

    const renderItem = ({ item }) => {
        const { name, price, quantity, images } = item
        return (
            <Pressable
                style={styles.headerItemContainer}
                onPress={() => addHistoryItem(item)} >
                <Image source={{ uri: images[0] }} style={styles.imagesProduct} />
                <View style={{ width: '70%' }}>
                    <Text style={{ fontWeight: '500', fontSize: 16 }} numberOfLines={1}>{name}</Text>
                    <Text style={{ fontWeight: '500', fontSize: 16 }}>{price}</Text>
                    <Text style={{ fontWeight: '500', fontSize: 14 }}>Còn {quantity} sản phẩm</Text>
                </View>
            </Pressable>
        )
    }

    const removeItemHistory = (id) => {
        setHistory(history.filter(item => item.id != id))
    }

    return (
        <View style={styles.container}>
            <View style={styles.textSearchContainer}>
                <Image source={require('../../../assets/images/chevronleft.png')} />
                <Text style={styles.textSearch}>TÌM KIẾM</Text>
                <Text></Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setSearchProduct(text)}
                    placeholder='Từ khóa tìm kiếm' />
                <View style={styles.searchIcon}>
                    <Image source={require('../../../assets/images/search.png')} />
                </View>
            </View>
            {
                searchProduct.length > 0 ?
                    <FlatList
                        data={filterData()}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    /> :
                    <View style={{ paddingHorizontal: 48 }}>
                        <Text style={{ marginVertical: 10 }}>Tìm kiếm gần đây</Text>
                        {
                            history.map(item => {
                                return (
                                    <View
                                        key={item.id}
                                        style={{ flexDirection: 'row', justifyContent: 'center', margin: 5 }}
                                    >
                                        <Image source={require('../../../assets/images/clock.png')} />
                                        <Text
                                            onPress={() => { navigation.navigate('Detail', { id: item.id }) }}
                                            style={{ width: '90%', paddingHorizontal: 11 }}
                                            numberOfLines={1}>{item.name}</Text>
                                        <Pressable onPress={() => removeItemHistory(item.id)}>
                                            <Image
                                                source={require('../../../assets/images/quit.png')}
                                            />
                                        </Pressable>
                                    </View>
                                )
                            })
                        }
                    </View>
            }


        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    headerItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    imagesProduct: {
        height: 77,
        width: 77,
    },
    searchIcon: {
        position: 'absolute',
        right: 48,
        top: 10
    },
    textInput: {
        width: '100%',
        height: '100%',
        borderBottomColor: '#221F1F',
        borderBottomWidth: 1.5,
        paddingRight: 25,
    },
    textInputContainer: {
        paddingHorizontal: 48,
        height: 40,
    },
    textSearch: {
        fontSize: 16,
        fontWeight: '500',
    },
    textSearchContainer: {
        alignItems: 'center',
        paddingTop: 32,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    }
})

var dataHistory = [
    {
        "id": "61d12d14555401c8610cfa3e",
        "name": "Spider Plant "
    },
    {
        "id": "61d12d14555401c8610cfa3a",
        "name": "Song of India"
    }
]
