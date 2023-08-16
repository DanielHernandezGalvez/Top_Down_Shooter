import React from "react";
import Home from "../views/Home";
import Detail from "../views/Detail/Detail";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParams } from "../types";

const Stack = createNativeStackNavigator<RootStackParams>();
const RouteScreensDefaultOptions = {
  headerStyle: {
    backgroundColor: "rgba(7,26,93,255)",
  },
  headerTitleStyle: {
    color: "#fff",
  },
};

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={RouteScreensDefaultOptions}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={RouteScreensDefaultOptions}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
