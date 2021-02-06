import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { Image, StyleSheet, Text, TextInput, View , TouchableOpacity, Button} from 'react-native';
import React, { useState, useEffect, Component } from 'react';


function takePicture() {
    if (this.camera) {
      let photo = this.camera.takePictureAsync();
  
    }
  }


  

 function ImageSelector({ navigation, route}) {
    React.useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.post]);
  
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
          <Button
          title="Add a Description"
          onPress={() => navigation.navigate('Description')}
        />
        <Text style={{ margin: 10 }}>{route.params?.post}</Text>
  
          <Button title="Back" onPress={() => navigation.goBack()} />
           <Button
          title="Greenhouse"
          onPress={() => navigation.push('Greenhouse')}
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
        <TouchableOpacity onPress={GetPermission} >
          <Text style={styles.picButt}>Take a photo</Text>
        </TouchableOpacity> 
  
      </View>
    //End of Saved Photo Selector
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
    },
    camera:{
      flex: 1
    }
  });
  
  export default ImageSelector
  