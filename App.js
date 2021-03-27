import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import logo from './assets/logo.png';
import splash from './assets/splash.png';
import { Alert, Modal, Image, StyleSheet, Text, TextInput, View , TouchableOpacity, TouchableHighlight,  Button, SafeAreaView, FlatList} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';
import { FontAwesome , Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import ImagePlaceholder from 'react-native-image-with-placeholder'
import dismissKeyboard from 'react-native-dismiss-keyboard';

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
const RootStack = createStackNavigator();
/******************************************************************************************* */

function ModalScreen({ navigation, route }) {
   const [postText, setPostText] = React.useState('');
   const { selectedImage, photo } = route.params;
  //
  //
  //if image is chosen from phone files
  //
  //
  if(route.params?.selectedImage){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18 }}> The Nursery  </Text> 
        <Image source={{ uri: selectedImage.localUri }} style={{  width:250, height:300 }} />
          <>
            <TextInput
              multiline placeholder="eg. Thai Basil | 03/26/20201 | Part Sun"
              style={{ height: 200, padding: 10, backgroundColor: '#f5f5f5' }}
              value={postText}
              onChangeText={setPostText}
              blurOnSubmit={true}
            />
          </>
      <Button title="Save & Add to Garden" onPress={() => navigation.navigate('Gallery', { selectedImage:selectedImage, post:route.params?.post, photo:photo })} />
      <Button onPress={() => navigation.goBack()} title="Take Another Photo" />
      <Button title="Back to Greenhouse" onPress={() => navigation.push('Greenhouse')} />
    </View>
  ); 
  //
  //
  //if a photo is taken instead
  //
  //
} else if (route.params?.photo) {
    return (    
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}> The Nursery </Text> 
            <Image source={{ uri: photo.uri }} style={{ width:250, height:300 }}/>
              <> 
                <TextInput
                  multiline placeholder="eg. Thai Basil | 03/26/20201 | Part Sun"
                  style={{ height: 200, padding: 10, backgroundColor: '#f5f5f5' }}
                  value={postText}
                  onChangeText={setPostText}
                  blurOnSubmit={true}
                />
              </>
          <Button title="Save & Add to Garden" onPress={() => navigation.navigate('Gallery', { selectedImage:selectedImage, post:route.params?.post })} />
          <Button onPress={() => navigation.navigate('Greenhouse')} title="Back to Greenhouse" />
        </View>
      ); 
  //
  //
  //if just updating documentation
  //
  //
} else {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}> What's Growing Well? </Text> 
            <>
              <TextInput
                multiline placeholder="eg. Thai Basil | 03/26/20201 | Part Sun"
                style={{ height: 200, padding: 10, backgroundColor: '#f5f5f5' }}
                value={postText}
                onChangeText={setPostText}
              />
            </>
          <Button title="Garden" onPress={() => navigation.navigate('Gallery', { selectedImage:selectedImage, post:route.params?.post })} />
          <Button onPress={() => navigation.goBack()} title="Back to Greenhouse" />
        </View>
          )
        }
      };


/******************************************************************************************* */


function Greenhouse({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
    //console.log('params:' + params, 'route:' + route, 'post:' + post);
    }
  }, [route.params?.post]);

  // Saved Photo Selector
  const [selectedImage, setSelectedImage]  = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  }

  //if no image selected, or no text entered, or if no image selected and there i
  if (selectedImage !== null && !route.params?.post 
     || selectedImage !== null && route.params?.post === null ) {
    return (
      <View style={styles.container}>
      <Image source={{ uri: selectedImage.localUri }} style={{ width:380, height:550 }} />
      <Button onPress={() => navigation.navigate('MyModal', { selectedImage:selectedImage})} title="Add Documentation" />
      <Text style={{ margin: 10 }}>{route.params?.post}</Text>
      <Button title="Root" onPress={() => navigation.goBack()} />
      <Button title="Greenhouse" onPress={() => navigation.push('Greenhouse')} />
      </View>
      );
  } else if (selectedImage !== null && route.params?.post) {
    return (
    <View style={styles.container}>
    <Image source={{ uri: selectedImage.localUri }} style={{ width:380, height:550 }} />
    <Button onPress={() => navigation.navigate('MyModal')} title="Add a Documentation" />
    <Text style={{ margin: 10 }}>{route.params?.post}</Text>
    <Button title="Root" onPress={() => navigation.goBack()} />
    <Button title="Gallery" onPress={() => navigation.navigate('Gallery', { selectedImage:selectedImage, post:route.params?.post })}
    />
    </View>
    );
  }  

  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 18 }}> Welcome to the Greenhouse. </Text> 
      <Text style={styles.intro}>How's it growing?</Text>
      <Image source={logo} style={styles.logo} /> 
       <TouchableOpacity onPress={openImagePickerAsync} >
        <Text style={styles.picButt}>Choose a Photo</Text>
      </TouchableOpacity> 
      <TouchableOpacity onPress={ () => navigation.push('Pic')}>
        <Text style={styles.picButt}>Take a Photo</Text>
      </TouchableOpacity> 
    </View>
  );
}


/************************************************************************* */
//TODO

function Gallery({navigation, route}) {
  const { post, photo, selectedImage } = route.params
  const DATA = [ photo, selectedImage, post ]

  const Item = ({ post}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{post}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item} />
  );



  return (

<SafeAreaView style={styles.listContainer}>
<FlatList  
// data={route.params}
// numColumns={3}
// renderItem={renderItem}
// keyExtractor={({ item }) => this.renderItem(item)}
// />
// <Image source={item.selectedImage.localUri} style={styles.image}></Image>
data={route.params}
extraData={route.params}
horizontal keyExtractor={selectedImage => selectedImage} //no idea if this is a good practice or not
renderItem={({ item, index }) => {
  console.log(picture); //this will log undefined for each item in list
  console.log('hi'); //this will log for each item in list
  return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: item}} style={{ width: 100, height: 100 }} />
     </View>
   );
}} />
</SafeAreaView>
  );
};
/******************************************************************************************* */

function CameraPermission( { navigation, route }){
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) { return <View />; }
  if (hasPermission === false) { return <Text>No access to camera</Text>; }

  snap = async () => {
    // the base 64 setting enables the passage of the newly taken photo
      let photo = await this.camera.takePictureAsync({ base64: true });
      //then we pass the photo to a temporary container for review
      // the 'navigate' method is key for passing the param back and forth through the routes
      navigation.navigate('MyModal', { photo: photo});
    };

  return (
    <View style={styles.container}>
      <Camera ref={ref => { this.camera = ref;}} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            syle={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setType (
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.textStyle}> Flip </Text>
          </TouchableOpacity>
          
        </View>
      </Camera>
      <Button onPress={snap } style={styles.openButton} title="Snap"/>
    </View>
    
  );
}


/********************************************************************/
/*
function Nursery({ navigation, route }) {
  const { photo, post } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = React.useState('');


  return (

  <View style={styles.centeredView}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                multiline
                placeholder="how does your garden grow?"
                style={{ width: 375, height: 300, padding: 10, backgroundColor: '#f5f5f5' }}
                value={postText}
                onChangeText={setPostText}
                blurOnSubmit={true}
              />

              <Image source={{ uri: photo.uri }} style={{width:375,height:300}}/>
              <Text style={styles.modalText}>Document specimen and add to garden?</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
      onPress={() => {navigation.goBack(); 
        // navigation.goBack(); }
        }}>
      <Text style={styles.textStyle}>Take Another</Text>
    </TouchableHighlight>
        <Image source={{ uri: photo.uri }} style={{width:375 ,height:300}}/>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
          onPress={() => navigation.navigate('MyModal', { photo:photo                                })}>
          <Text style={styles.textStyle}>Add A Description</Text>
        </TouchableHighlight>
      </View>

  );
}*/


/************************************************************************* */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" 
        screenOptions={{
        headerStyle: {
          backgroundColor: '#F5F5F5',
        },
        headerTintColor: '#355e3b',
      }} >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Polite Plants', backgroundColor: '#F5F5F5' }} />
      <Stack.Screen 
        name="Greenhouse" 
        component={Greenhouse} 
        options= {{ 
          headerRight:() => (
          <Button onPress={() => alert('This is a button!')} title="Info" color="#355e3b" />), }} />
  <Stack.Screen name="Pic" component={CameraPermission}></Stack.Screen>
  {/* <Stack.Screen name="Nursery" component={Nursery}></Stack.Screen> */}
  <Stack.Screen name="Gallery" component={Gallery}></Stack.Screen>
  <RootStack.Screen name="MyModal" component={ModalScreen} />
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
    image: {
      width: 250,
      height: 150,
      margin: 10,
      },
      flatListStyle: { flex: 1,},
      listContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
      button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
});
