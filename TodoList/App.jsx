/**
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Section,
  Image,
} from 'react-native';
import firebase from './src/utils/firebase';
import 'firebase/auth';

function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      console.log(response);
    });
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Text style={styles.text}>To do list</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {},
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 40,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});

export default App;
