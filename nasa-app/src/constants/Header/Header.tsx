import React from "react";
import { View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View>
      <View>
        <Text>Explore</Text>
      </View>
      <View>
        <Image source={require("../../../assets/img/nasa.png")} />
      </View>
    </View>
  );
};

export default Header;
