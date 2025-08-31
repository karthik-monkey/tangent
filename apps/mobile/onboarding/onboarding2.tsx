import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Onboarding2() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Page indicator */}
        <View style={styles.pageIndicator}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Main content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>
            Fast and secure{'\n'}cryptocurrency{'\n'}payments
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDot: {
    backgroundColor: "white",
    width: 24,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
});
