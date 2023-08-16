import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Routes from "./src/routes";

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(7,26,93,255)",
  },
});
