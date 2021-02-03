import { StatusBar } from 'expo-status-bar';
import React from 'react';
import logo from './assets/logo.jpg'
import { Image, StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }
  

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} /> 
      <Text style={styles.intro}>How does your garden grow?</Text>
      <TouchableOpacity onPress={openImagePickerAsync} >
        <Text style={styles.picButt}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 345,
    height: 500,
  //  marginBottom: 15
  },
  intro: {
    color: 'green',
    fontSize: 12,
    marginHorizontal: 20
  },
  picButt: {
    fontSize: 10, 
    color: 'white',
    backgroundColor: 'green'
  }
});
