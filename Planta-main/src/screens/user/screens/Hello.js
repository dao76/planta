import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import LottieView from 'lottie-react-native';
import earth from '../../../lottie/earth.json'
const Hello = (props) => {
  const {navigation} = props

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('Login'), 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  

  return (
    <View style={styles.container}>
        <LottieView resizeMode='contain' autoSize source={earth} autoPlay loop />
        <Text style={styles.text}>Planta</Text>
    </View>
  )
}

export default Hello

const styles = StyleSheet.create({
  text: {
    color: '#007537',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 27,
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})