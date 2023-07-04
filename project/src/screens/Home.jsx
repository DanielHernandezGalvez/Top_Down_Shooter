import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import GlobalStyles from '../utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';

export default function Home({navigation}) {
  const [name, setName] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserName').then(value => {
        if (value != null) {
          setName(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning', 'please write your name');
    } else {
      try {
        await AsyncStorage.setItem('UserName', name);
        Alert.alert('succes', 'your data has been updated');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      // await AsyncStorage.removeItem('UserName', name);
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <View>
        <Text style={[GlobalStyles.mainTitle, styles.text]}>
          Welcome {name}
        </Text>
        <TextInput
          value={name}
          placeholder="Enter your name"
          style={styles.input}
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={updateData}>
          <Text style={styles.pressableText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={removeData}>
          <Text style={styles.pressableText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  input: {
    width: 300,
    borderRadius: 5,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
});
