import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";

interface PinConfirmProps {
  onNext?: () => void;
  onBack?: () => void;
  originalPin: string;
}

export default function PinConfirm({ onNext, onBack, originalPin }: PinConfirmProps) {
  const [pin, setPin] = useState("");

  const handlePinChange = (text: string) => {
    // Only allow numbers and max 4 digits
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(numericText);
  };

  const handleNext = () => {
    if (pin.length === 4) {
      if (pin === originalPin) {
        onNext?.();
      } else {
        Alert.alert(
          "PINs Don't Match",
          "The PINs you entered don't match. Please try again.",
          [
            {
              text: "Try Again",
              onPress: () => {
                setPin("");
                onBack?.();
              }
            }
          ]
        );
      }
    }
  };

  const renderPinDots = () => {
    return Array.from({ length: 4 }, (_, index) => (
      <View
        key={index}
        style={[
          styles.pinDot,
          index < pin.length ? styles.pinDotFilled : styles.pinDotEmpty
        ]}
      />
    ));
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
              <Text style={styles.title}>Confirm passcode</Text>
              <Text style={styles.subtitle}>
                Enter your passcode again to confirm.
              </Text>
            </View>

            {/* PIN Input Section */}
            <View style={styles.codeSection}>
              <View style={styles.codeContainer}>
                <View style={styles.pinDots}>
                  {renderPinDots()}
                </View>
              </View>
            </View>

            {/* Confirm Button */}
            <View style={styles.buttonSection}>
              <TouchableOpacity 
                style={[styles.verifyButton, pin.length !== 4 && styles.verifyButtonDisabled]} 
                onPress={handleNext}
                disabled={pin.length !== 4}
              >
                <Text style={styles.verifyButtonText}>Confirm Passcode</Text>
              </TouchableOpacity>
            </View>

            {/* Hidden TextInput for native keypad */}
            <TextInput
              style={styles.hiddenInput}
              value={pin}
              onChangeText={handlePinChange}
              keyboardType="numeric"
              maxLength={4}
              autoFocus
              secureTextEntry={false}
            />
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
  codeSection: {
    flex: 1,
    alignItems: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  pinDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pinDotFilled: {
    backgroundColor: "white",
  },
  pinDotEmpty: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonSection: {
    paddingBottom: 40,
  },
  verifyButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  verifyButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  hiddenInput: {
    position: "absolute",
    left: -1000,
    opacity: 0,
  },
}); 