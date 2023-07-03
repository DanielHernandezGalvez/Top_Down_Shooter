import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function ScreenB({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Screen_A');
    // navigation.goBack();
  };
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen b</Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Go back to Screen A</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
});
