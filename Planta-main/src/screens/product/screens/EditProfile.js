import { StyleSheet, Text, View, TextInput, Pressable, ToastAndroid } from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserConText } from '../../user/UserConText';

const EditProfile = (props) => {
  const { navigation } = props
  const {infomation, onEditInfomation} = useContext(UserConText)

  const [fullname, setFullname] = useState(infomation.name)
  const [location, setLocation] = useState(infomation.address)
  const [mobile, setMobile] = useState(infomation.phone)
  const [birthday, setBirthday] = useState(infomation.dob)

  const [showDatetimePicker, setShowDatetimePicker] = useState(false)

  const displayTime = (time) => {
    time = new Date(time)
    return time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()
  }

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatetimePicker(false);
    setBirthday(currentDate);
  }

  const saveInfomation = async () => {
    let obj = {
      name: fullname,
      address: location,
      phone: mobile,
      avatar: "https://steamuserimages-a.akamaihd.net/ugc/1786233211077804024/A02EEA13FC681706AF02B91C0F4E0CD652316C57/",
      dob: birthday
    }
    const result = await onEditInfomation(obj)
    if (result){
      ToastAndroid.show('Chỉnh sửa thành công', ToastAndroid.BOTTOM)
    }else{
      ToastAndroid.show('Chỉnh sửa thất bại vui lòng thử lại sau', ToastAndroid.BOTTOM)
    }
    navigation.replace('Profile')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>
      <Text style={styles.instruction}>Thông tin sẽ được lưu cho lần mua kế tiếp</Text>
      <Text style={styles.instruction}>Bấm vào thông tin chi tiết để chỉnh sửa</Text>
      <View style={styles.formContainer}>
        <TextInput value={fullname} onChangeText={setFullname} style={styles.inputText} />
        <TextInput value={location} onChangeText={setLocation} style={styles.inputText} />
        <TextInput value={mobile} onChangeText={setMobile} style={styles.inputText} />
        <TextInput value={displayTime(birthday)} onPressIn={() => setShowDatetimePicker(true)} style={styles.inputText} />
      </View>
      <Pressable 
        onPress={saveInfomation}
        style={styles.buttonContainer}>
        <Text style={styles.save}>Lưu thông tin</Text>
      </Pressable>

      {showDatetimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(birthday)}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
        />
      )}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  save: {
    color: 'white',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    backgroundColor: '#007537',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  inputText: {
    height: 40,
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 0.5,
    fontSize: 14,
    color: '#7D7B7B',
  },
  formContainer: {
    marginTop: 60,
    width: '100%',
  },
  instruction: {
    color: '#221F1F',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 16,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
    paddingHorizontal: 48,
    position: 'relative',
    alignItems: 'center',
  }
});

