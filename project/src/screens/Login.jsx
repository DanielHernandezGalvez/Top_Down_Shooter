import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MAinDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function Login({navigation}) {
  const [name, setName] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXIST ' +
          'Users' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
      );
    });
  };

  const setData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning', 'please write your name');
    } else {
      try {
        // await AsyncStorage.setItem('UserName', name);
        await db.transaction(async tx => {
          // await tx.executeSql(
          //   "INSERT INTO Users (Name, Age) VALUES ('" +
          //     name +
          //     "', " +
          //     age +
          //     ')',
          await tx.executeSql('INSERT INTO Users (Name, Age) VALUES (?,?)', [
            name,
            age,
          ]);
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text>Login</Text>
      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        onChangeText={value => setName(value)}
      />
      <TouchableOpacity style={styles.button} onPress={setData}>
        <Text style={styles.pressableText}>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
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
  pressableText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});
