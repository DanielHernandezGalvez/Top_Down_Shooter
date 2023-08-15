import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import Header from "./src/components/Header";

const App = () => {
  const [isWorking, setIsWorking] = useState<string>("");
  const [time, setTime] = useState<number>(25 * 60);
  const [currentTime, setCurrentTime] = useState<"POMO" | "SHORT" | "BREAK">(
    "POMO"
  );

  const mainColors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
  const colorIndexMap = {
    POMO: 0,
    SHORT: 1,
    BREAK: 2,
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: mainColors[colorIndexMap[currentTime]] },
      ]}
    >
      <View style={{ paddingTop: Platform.OS === "android" ? 30 : 0 }}>
        <Text>Pomodoro</Text>
        <Text>{time}</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Button title="Pomodoro" onPress={() => {}} />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
});

export default App;
