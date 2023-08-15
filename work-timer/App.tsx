import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
import { Notification } from "expo-notifications";

const App = () => {
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [time, setTime] = useState<number>(25 * 60);
  const [currentTime, setCurrentTime] = useState<"POMO" | "SHORT" | "BREAK">(
    "POMO"
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
      setIsTimeUp(true);
      timeFinished();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const playSound = async (): Promise<void> => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/pop.mp3")
    );
    await sound.playAsync();
  };
  const handleStartStop = (): void => {
    playSound();
    setIsActive(!isActive);
  };

  const sound = new Audio.Sound();

  const timeFinished = async () => {
    try {
      await sound.unloadAsync();
      await sound.loadAsync(require("./assets/Temporizador.mp3"));
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound: ", error);
    }
  };

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
      <View style={{ paddingTop: Platform.OS === "android" ? 30 : 0, flex: 1 }}>
        <Text style={styles.title}>Work Timer</Text>

        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          setIsActive={setIsActive}
          isActive={isActive}
          setIsTimeUp={setIsTimeUp}
        />

        <Timer time={time} />

        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        {isTimeUp && (
          <View style={styles.timeUpView}>
            <Text style={styles.timeUpText}>¡Time's up!</Text>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  timeUpView: {
    marginTop: "10%",
    marginBottom: 0,
    justifyContent: "center",
  },
  timeUpText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
