import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import icon from "./assets/icon.png";

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png",
          }}
          // blurRadius={9}
          style={{
            width: 215,
            height: 294,
            resizeMode: "contain",
          }}
        />
        <Text style={{ color: "#fff" }}>
          Open up App.js to start working on your app!
        </Text>

        <Image
          source={{
            uri: "http://pngimg.com/uploads/php/php_PNG27.png",
          }}
          style={{
            width: 215,
            height: 294,
            resizeMode: "contain",
          }}
        />
        <Text style={{ color: "#fff" }}>
          Open up App.js to start working on your app!
        </Text>
        <Image
          source={{
            uri: "https://brandslogos.com/wp-content/uploads/images/large/python-logo.png",
          }}
          style={{
            width: 215,
            height: 294,
            resizeMode: "contain",
          }}
        />
        <Text style={{ color: "#fff" }}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 50
  },
});
