import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import logo from './assets/logo.png';
import splash from './assets/splash.png';
import { Image, StyleSheet, Text, TextInput, View , TouchableOpacity, Button} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import 'react-native-gesture-handler';
//import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { CameraGrab } from './TakePhoto';
import * as Font from 'expo-font';
import { FontAwesome , Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

function HomeScreen({ navigation, route }) {

  return (
    <View style={styles.home}>
      <Image
      source={splash} style={styles.logo} />
      <Button
        title="How Does Your Garden Grow?"
        onPress={() => navigation.push('Greenhouse')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function Description({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="how does your garden grow?"
        style={{ height: 200, padding: 10, backgroundColor: '#f5f5f5' }}
        value={postText}
        onChangeText={setPostText}
      />
      
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Greenhouse', { post: postText });
        }}
      />
    </>
  );
}


function CameraPermission(){
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  

  return (
    <View style={styles.container}>
      
      <Camera ref={ref => {
    this.camera = ref;
  }}
       style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType (
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

function Greenhouse({ navigation, route }) {
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
      <TouchableOpacity onPress={ () => navigation.push('Pic')
    }
 >
        <Text style={styles.picButt}>Take a photo</Text>
      </TouchableOpacity> 

    </View>
  //End of Saved Photo Selector
  );
}



// function TakePic() {
  
//   if (await Camera.isAvailableAsync()) {
    
//     return(
//       <Camera
 
// />
//     );


//   }
// }


export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator 
                  mode="modal" 
                  screenOptions={{
                  headerStyle: {
                    backgroundColor: '#F5F5F5',
                  },
                  headerTintColor: '#355e3b',
                }}>
        <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'Polite Plants', backgroundColor: '#F5F5F5' }}
                />
        <Stack.Screen 
                name="Greenhouse" 
                component={Greenhouse} 
                options= {{ headerRight:() => (<Button
                                              onPress={() => alert('This is a button!')}
                                              title="Info"
                                              color="#355e3b" />),
                        }}
          />
  <Stack.Screen name="Description" component={Description}></Stack.Screen>
  <Stack.Screen name="Pic" component={CameraPermission}></Stack.Screen>
                  
  </Stack.Navigator>
  
 
</NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fffaf0'
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
    backgroundColor: '#fffaf0',
    marginTop:15,
    marginBottom:20
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  camera:{
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain'
  }
});
