import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

interface Onboarding2Props {
  onNext: () => void;
}

export default function Onboarding2({ onNext }: Onboarding2Props) {
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

        {/* Next button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    backgroundColor: "#E5E5E5",
  },
  activeDot: {
    backgroundColor: "#000000",
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
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
}); 