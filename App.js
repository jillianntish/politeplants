import { StatusBar } from 'expo-status-bar';
import React from 'react';
import cotton_logo from './assets/cotton_logo.jpg'
import { Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source = {cotton_logo} style ={{ width: 305, height: 500 }}></Image>
      <Text>To share a photo from your phone with a friend, just press the button below!</Text>
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
});
