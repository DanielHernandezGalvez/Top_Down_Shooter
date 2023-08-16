import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../constants/Header/Header";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Home;
