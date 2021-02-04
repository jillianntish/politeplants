import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import logo from './assets/logo.jpg';
import splash from './assets/splash.png';
import { Image, StyleSheet, Text, View , TouchableOpacity, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import 'react-native-gesture-handler';
//import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { CameraGrab } from './TakePhoto';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.home}>
      <Image
      source={splash} style={styles.logo} />
      <Button
        title="Go to Image Selector"
        onPress={() => navigation.push('ImageSelector')}
      />
    </View>
  );
}

function ImageSelector({ navigation }) {
  // Saved Photo Selector
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Button title="Back" onPress={() => navigation.goBack()} />
         <Button
        title="Image Selector"
        onPress={() => navigation.push('ImageSelector')}
      />

      </View>
      );
  }



  return (
    <View style={styles.container}>
      
      <Text style={styles.intro}>How does your garden grow?</Text>
      <Image source={logo} style={styles.logo} /> 
       <TouchableOpacity onPress={openImagePickerAsync} >
        <Text style={styles.picButt}>Choose a photo</Text>
      </TouchableOpacity> 
      <TouchableOpacity onPress={openImagePickerAsync} >
        <Text style={styles.picButt}>Take a photo</Text>
        <Button title="Main" onPress={() => navigation.goBack()} />

      </TouchableOpacity> 
    </View>
  //End of Saved Photo Selector
  );
}

const Stack = createStackNavigator();

function App() {

  return (
<NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
  <Stack.Screen name="ImageSelector" component={ImageSelector}></Stack.Screen>
  </Stack.Navigator>
  
  
</NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  },
  logo: {
    width: 345,
    height: 500,
    marginBottom: 15
  },
  intro: {
    color: 'green',
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom:15
  },
  picButt: {
    fontSize: 18, 
    color: 'green',
    backgroundColor: 'white',
    marginTop:15,
    marginBottom:20
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});

export default App;