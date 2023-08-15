import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderProps {
  currentTime: "POMO" | "SHORT" | "BREAK";
  setTime: (time: number) => void;
  setCurrentTime: (currentTime: "POMO" | "SHORT" | "BREAK") => void;
}

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header: React.FC<HeaderProps> = ({
  currentTime,
  setTime,
  setCurrentTime,
}) => {
  function handlePress(index: number) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    const newCurrentTime: "POMO" | "SHORT" | "BREAK" =
      index === 0 ? "POMO" : index === 1 ? "SHORT" : "BREAK";
    setCurrentTime(newCurrentTime);
    setTime(newTime * 60);
  }

  const currentTimeIndex =
    currentTime === "POMO" ? 0 : currentTime === "SHORT" ? 1 : 2;

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTimeIndex !== index && { borderColor: "transparent" },
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
      {/* <Text>{currentTime}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: "30%",
    borderWidth: 3,
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderColor: "#fff",
    marginVertical: 20,
  },
});

export default Header;
