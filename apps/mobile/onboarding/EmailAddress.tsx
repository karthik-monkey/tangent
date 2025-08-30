import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

interface EmailAddressProps {
  onNext: (email: string) => void;
  onBack?: () => void;
}

export default function EmailAddress({ onNext, onBack }: EmailAddressProps) {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    onNext(email || "test@example.com"); // Default for testing
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forwardButton} onPress={handleNext}>
            <Text style={styles.forwardArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Email Address</Text>
          <Text style={styles.subtitle}>
            Enter your email address for account notifications
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email address"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />
        </View>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleNext}
          >
            <Text style={styles.continueButtonText}>Next</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 32,
    justifyContent: "space-between",
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 28,
    color: "white",
    fontWeight: "300",
  },
  forwardButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  forwardArrow: {
    fontSize: 28,
    color: "white",
    fontWeight: "300",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    paddingTop: 20,
  },
  emailInput: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 17,
    color: "white",
    fontWeight: "500",
  },
  buttonContainer: {
    paddingBottom: 44,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
  },
}); 