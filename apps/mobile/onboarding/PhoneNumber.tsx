import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

interface PhoneNumberProps {
  onNext: (phoneNumber: string) => void;
  onBack?: () => void;
}

export default function PhoneNumber({ onNext, onBack }: PhoneNumberProps) {
  const [phoneDigits, setPhoneDigits] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const placeholderNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handleNext = () => {
    const phoneNumber = phoneDigits.join("");
    onNext(phoneNumber || "1234567890"); // Default for testing
  };

  const handleDigitChange = (text: string, index: number) => {
    const newDigits = [...phoneDigits];
    newDigits[index] = text;
    setPhoneDigits(newDigits);

    // Auto-focus next input
    if (text && index < 9) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !phoneDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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
        <View style={styles.titleSection}>
          <Text style={styles.title}>Enter your phone number</Text>
          <Text style={styles.subtitle}>
            We'll send you a verification code to confirm your number
          </Text>
        </View>

        {/* Phone Number Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.phoneContainer}>
            {phoneDigits.map((digit, index) => (
              <React.Fragment key={index}>
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.digitInput,
                    digit ? styles.digitInputFilled : null
                  ]}
                  value={digit}
                  placeholder={placeholderNumbers[index]}
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  onChangeText={(text) => handleDigitChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  maxLength={1}
                  keyboardType="number-pad"
                  textAlign="center"
                  autoFocus={index === 0}
                />
                {(index === 2 || index === 5) && (
                  <Text style={styles.dash}>-</Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Send Code Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.sendCodeButton}
            onPress={handleNext}
          >
            <Text style={styles.sendCodeButtonText}>Send Code</Text>
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
  inputSection: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 80,
  },
  phoneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  digitInput: {
    width: 30,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  digitInputFilled: {
    borderBottomColor: "white",
  },
  dash: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "600",
    alignSelf: "center",
    marginTop: 10,
  },
  buttonSection: {
    paddingBottom: 40,
  },
  sendCodeButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  sendCodeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
}); 