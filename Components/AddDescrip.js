
import React, { useState, useEffect, Component } from 'react';
import { Image, StyleSheet, Text, TextInput, View , TouchableOpacity, Button} from 'react-native';


export function AddDescription({ navigation, route }) {
    const [postText, setPostText] = React.useState('');
  
    return (
      <>
        <TextInput
          multiline
          placeholder="how does your garden grow?"
          style={{ height: 200, padding: 10, backgroundColor: 'white' }}
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
  