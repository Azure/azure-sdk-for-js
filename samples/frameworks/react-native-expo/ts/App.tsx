import "./shims";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SentimentScreen } from "./screens/SentimentScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <SentimentScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: RNStatusBar.currentHeight,
    position: "relative",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    width: "100%",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
