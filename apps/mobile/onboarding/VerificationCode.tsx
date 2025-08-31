import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

interface VerificationCodeProps {
  onNext: (code: string) => void;
  onBack?: () => void;
  email?: string;
}

export default function VerificationCode({ onNext, onBack, email }: VerificationCodeProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleNext = () => {
    const fullCode = code.join("");
    onNext(fullCode || "123456"); // Default for testing
  };

  const handleResend = () => {
    console.log("Resend verification code");
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
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
          <Text style={styles.title}>Confirm your email</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to {email || "your email address"}
          </Text>
        </View>

        {/* Code Input Boxes */}
        <View style={styles.codeSection}>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.digitInput,
                  digit ? styles.digitInputFilled : null
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                maxLength={1}
                keyboardType="number-pad"
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Resend Option */}
          <View style={styles.resendSection}>
            <Text style={styles.resendText}>Didn't get a code? </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Verify Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.verifyButton} onPress={handleNext}>
            <Text style={styles.verifyButtonText}>Verify Your Email</Text>
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
  codeSection: {
    flex: 1,
    alignItems: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  digitInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    backgroundColor: "transparent",
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  digitInputFilled: {
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  resendSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
  resendLink: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
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
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
}); 