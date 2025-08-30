import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

interface VerificationCodeProps {
  onNext: (code: string) => void;
  onBack?: () => void;
  phoneNumber?: string;
}

export default function VerificationCode({ onNext, onBack, phoneNumber }: VerificationCodeProps) {
  const [code, setCode] = useState("");

  const handleNext = () => {
    onNext(code || "123456"); // Default for testing
  };

  const handleResend = () => {
    // Handle resend code
    console.log("Resend verification code");
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
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{'\n'}{phoneNumber || "your phone number"}
          </Text>
        </View>

        {/* Code Input */}
        <View style={styles.inputContainer}>
          <View style={styles.codeInputContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View key={index} style={styles.digitBox}>
                <Text style={styles.digitText}>
                  {code[index] || ''}
                </Text>
              </View>
            ))}
          </View>
          
          <TextInput
            style={styles.hiddenInput}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
          
          {/* Resend Options */}
          <View style={styles.resendSection}>
            <Text style={styles.resendText}>Didn't get the code?</Text>
            <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
              <Text style={styles.resendLink}>Resend Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendLink}>Call Me Instead</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center",
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  digitBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  digitText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    letterSpacing: 8,
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  },
  resendSection: {
    alignItems: "center",
    marginTop: 32,
  },
  resendText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 16,
  },
  resendButton: {
    marginBottom: 12,
  },
  resendLink: {
    fontSize: 15,
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
  continueButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
  },
}); 