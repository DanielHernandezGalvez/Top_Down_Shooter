import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

import { PostImage } from "../../types";

const TodaysImage: React.FC<PostImage> = ({ date, title, url }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: url }} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.buttonContainer}>
        <Button title="View" color="#6378c2" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c449d",
    marginVertical: 16,
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 16,
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: 190,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#eee",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginVertical: 12,
    fontWeight: "bold",
  },
  date: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default TodaysImage;
