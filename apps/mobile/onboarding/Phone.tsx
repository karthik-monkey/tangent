import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

interface PhoneProps {
  onNext: (phoneNumber: string) => void;
  onBack?: () => void;
}

export default function Phone({ onNext, onBack }: PhoneProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    // Pass the phone number to the parent component for navigation
    onNext(phoneNumber || "+1234567890");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
            <View style={styles.titleSection}>
              <Text style={styles.title}>Add your Phone Number</Text>
              <Text style={styles.subtitle}>
                We'll send you a verification code to confirm your number
              </Text>
            </View>

            {/* Phone Input Section */}
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.phoneContainer}>
                  <Text style={styles.phonePrefix}>+1</Text>
                  <View style={styles.phoneDivider} />
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="(555) 123-4567"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoFocus
                  />
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <View style={styles.buttonSection}>
              <TouchableOpacity 
                style={[styles.continueButton, !phoneNumber && styles.disabledButton]}
                onPress={handleNext}
                disabled={!phoneNumber}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 40,
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
  titleSection: {
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 22,
  },
  formSection: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 28,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 12,
    fontWeight: "500",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
  },
  phonePrefix: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    marginRight: 8,
  },
  phoneDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "white",
  },
  buttonSection: {
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
}); 