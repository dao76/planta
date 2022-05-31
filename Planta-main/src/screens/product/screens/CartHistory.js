import { FlatList, Image, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ProductContext } from '../ProductContext'
import moment from "moment"
import LottieView from 'lottie-react-native';
import loading from '../../../lottie/loading.json'

const CartHistory = () => {
  const [data, setData] = useState([])
  const { onGetCartHistory } = useContext(ProductContext)
  const [getLoading, setLoading] = useState(true)

  useEffect(async () => {
    const res = await onGetCartHistory()
    setData(res)
    setLoading(false)
  }, [])

  const dayOfWeek = (firtDay, createdAt) => {
    console.log("firtDay = ", firtDay);
    switch (firtDay) {
      case "Monday":
        var date = moment(createdAt).utc().format('DD/MM/YYYY')
        return "Thứ hai, " + date
      case "Tuesday":
        var date = moment(createdAt).utc().format('DD/MM/YYYY')
        return "Thứ ba," + date
      case "Wednesday":
        var date = moment(createdAt).utc().format('DD/MM/YYYY')
        return "Thứ tư," + date
      case "Thursday":
        var date = moment(createdAt).utc().format('DD/MM/YYYY')
        return "Thứ năm," + date
      case "Friday":
        var date = moment(createdAt).utc().format('DD/MM/YYYY')
        return "Thứ sáu," + date
      case "Saturday":
        var date = moment(createdAt).utc().format('DD/MM/YYYY')
        return "Thứ bảy," + date
    }
    var date = moment(createdAt).utc().format('DD/MM/YYYY')
    return "Chủ nhật, " + date
  }

  const quantity = (products) => {
    var sum = 0
    products.forEach(element => {
      sum += element.quantity
    });
    return sum
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 27 }}>
        <Text
          style={{ fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#7D7B7B' }}
        >{dayOfWeek(moment(item.createdAt).utc().format('dddd'), item.createdAt)}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 77, height: 74, margin: 15 }} resizeMode='contain' source={require('../../../assets/images/a15.png')} />
          <View>
            <Text style={{ fontSize: 16, color: '#007537' }}>{item.status}</Text>
            <Text style={{ fontSize: 16, fontWeight: '500' }} numberOfLines={1}>{item.products[0].product}</Text>
            <Text>{quantity(item.products)} sản phẩm</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {
        getLoading ?
          <View style={styles.lottieContainer}>
            <LottieView style={styles.lottieView} resizeMode='contain' autoSize source={loading} autoPlay loop />
          </View> :
          <>
            <View style={{ flexDirection: 'row', marginTop: 60, justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
              <Image source={require('../../../assets/images/chevronleft.png')} />
              <Text style={{ fontSize: 16 }}>LỊCH SỬ GIAO DỊCH</Text>
              <Text></Text>
            </View>
            <View style={{ paddingHorizontal: 48 }}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingBottom: 100, marginTop: 20 }}
              />
            </View></>
      }
    </View>
  )
}

export default CartHistory

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottieView: {
    width: 300,
  },
})