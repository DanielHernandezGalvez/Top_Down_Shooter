import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  const suma = () => {
    let resultado = count + 1;
    setCount(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World I am Daniel</Text>
      <Text style={styles.title}>Hello World I am {count}</Text>
      <View style={styles.button}>
        <Button
          title="Youtube Chanel"
          onPress={() => {
            Linking.openURL("https://www.youtube.com/@DanielGalvezCoder");
          }}
        ></Button>
      </View>
      <Button title="suma" onPress={suma}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});
