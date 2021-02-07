import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import logo from './assets/logo.png';
import splash from './assets/splash.png';
import { Alert, Modal, Image, StyleSheet, Text, TextInput, View , TouchableOpacity, TouchableHighlight,  Button} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';
import { FontAwesome , Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.home}>
      <Image
      source={splash} style={styles.splash} />
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



function Greenhouse({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
    console.log('params:' + params, 'route:' + route, 'post:' + post);
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
    console.log('pickerRes:' + pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  }
  
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: route.params?.photo.uri }} style={styles.logo}/>
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
      <Text style={styles.intro}>How's it growing?</Text>
      <Image source={logo} style={styles.logo} /> 
       <TouchableOpacity onPress={openImagePickerAsync} >
        <Text style={styles.picButt}>Choose a photo</Text>
      </TouchableOpacity> 
      <TouchableOpacity onPress={ () => navigation.push('Pic')}>
        <Text style={styles.picButt}>Take a photo</Text>
      </TouchableOpacity> 
    </View>
  );
}

function Nursery({ navigation, route }) {
  const { photo } = route.params;
  return (
  <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
  
  <Image source={{ uri: photo.uri }} style={{width:380,height:550}}/>
 </View>
  );
}


function CameraPermission( { navigation, route }){
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);


  const [modalVisible, setModalVisible] = useState(false);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) { return <View />; }
  if (hasPermission === false) { return <Text>No access to camera</Text>; }

  snap = async () => {
      let photo = await this.camera.takePictureAsync({base64: true });
      navigation.navigate('Nursery', { photo: photo});

  //  setSelectedImage({ localUri: photo.uri });
      //navigation.navigate('Greenhouse', { newPic: selectedImage });
    };

  
  onPictureSaved = photo => {
  //  console.log(photo);
  //  newPic = photo
  if (photo.uri !== null){
    return <View style={styles.centeredView}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
               

              <Text style={styles.modalText}>Save Photo & Add Description?</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
  
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>

  }
} 

  return (
    <View style={styles.container}>
      <Camera ref={ref => { this.camera = ref;}} style={styles.camera} type={type}>
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
            <Text style={styles.button}> Flip </Text>
          </TouchableOpacity>
          
        </View>
      </Camera>
      <Button onPress={snap } style={styles.button} title="Snap"/>
 

    </View>
    
  );
}
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
  <Stack.Screen name="Nursery" component={Nursery}></Stack.Screen>
          
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
    backgroundColor: '#f5f5f5'
  },
  
  logo: {
    width: 500,
    height: 500
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
    width: 4,
    height: 300,
    resizeMode: "contain"
  },
  camera:{
    flex: 1,
    position: 'absolute',
    bottom: 150,
    right: 0,
    left: 0,
    top: 20,
    resizeMode: 'contain'
  },
  splash: {
      flex: 1,
      position: 'absolute',
      bottom: 150,
      right: 0,
      left: 0,
      top: 20,
      resizeMode: 'contain'
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});
