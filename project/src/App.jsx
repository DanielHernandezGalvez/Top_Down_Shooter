/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScreenA from './ScreenA';
import ScreenB from './ScreenB';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const Stack = createStackNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        {/* <Tab.Navigator screenOptions={{header: () => null}}> */}
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size, color}) => {
              let iconName;
              if (route.name === 'Screen_A') {
                iconName = 'amazon';
                size = focused ? 25 : 20;
                color = focused ? '#f0f' : '#555';
              } else if (route.name === 'Screen_B') {
                iconName = 'btc';
                size = focused ? 25 : 20;
                color = focused ? '#f0f' : '#555';
              }
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#f0f',
            inactiveTintColor: '#555',
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#999',
            showlabel: false,
            labelStyle: {fontSize: 14},
          }}>
          <Tab.Screen
            name="Screen_A"
            component={ScreenA}
            options={{tabBarBadge: 3}}
            // options={{header: () => null}}
          />
          <Tab.Screen name="Screen_B" component={ScreenB} />
          {/* <Stack.Screen name="Screen_B" component={ScreenB} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </>
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

export default App;
