import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";

interface ChangePinModalProps {
  visible: boolean;
  onClose: () => void;
  currentPin: string;
  onPinChanged: (newPin: string) => void;
}

export default function ChangePinModal({ 
  visible, 
  onClose, 
  currentPin,
  onPinChanged 
}: ChangePinModalProps) {
  const [step, setStep] = useState<"verify" | "newPin" | "confirmPin">("verify");
  const [enteredPin, setEnteredPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [shakeAnimation] = useState(new Animated.Value(0));

  const handlePinChange = (text: string, setter: (value: string) => void) => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 4);
    setter(numericText);
    setError("");
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleVerifyPin = () => {
    if (enteredPin === currentPin) {
      setStep("newPin");
      setEnteredPin("");
      setError("");
    } else {
      setError("Incorrect PIN");
      triggerShake();
      setEnteredPin("");
    }
  };

  const handleSetNewPin = () => {
    if (newPin.length === 4) {
      setStep("confirmPin");
      setError("");
    }
  };

  const handleConfirmNewPin = () => {
    if (confirmPin === newPin) {
      onPinChanged(newPin);
      handleClose();
    } else {
      setError("PINs don't match");
      triggerShake();
      setConfirmPin("");
    }
  };

  const handleClose = () => {
    setStep("verify");
    setEnteredPin("");
    setNewPin("");
    setConfirmPin("");
    setError("");
    onClose();
  };

  const renderPinDots = (value: string) => {
    return Array.from({ length: 4 }, (_, index) => (
      <View
        key={index}
        style={[
          styles.pinDot,
          index < value.length ? styles.pinDotFilled : styles.pinDotEmpty
        ]}
      />
    ));
  };

  const getCurrentTitle = () => {
    switch (step) {
      case "verify":
        return "Enter current PIN";
      case "newPin":
        return "Enter new PIN";
      case "confirmPin":
        return "Confirm new PIN";
    }
  };

  const getCurrentValue = () => {
    switch (step) {
      case "verify":
        return enteredPin;
      case "newPin":
        return newPin;
      case "confirmPin":
        return confirmPin;
    }
  };

  const getCurrentSetter = () => {
    switch (step) {
      case "verify":
        return setEnteredPin;
      case "newPin":
        return setNewPin;
      case "confirmPin":
        return setConfirmPin;
    }
  };

  const handleContinue = () => {
    switch (step) {
      case "verify":
        handleVerifyPin();
        break;
      case "newPin":
        handleSetNewPin();
        break;
      case "confirmPin":
        handleConfirmNewPin();
        break;
    }
  };

  const currentValue = getCurrentValue();
  const currentSetter = getCurrentSetter();
  const canContinue = currentValue.length === 4;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.handle} />
            
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{getCurrentTitle()}</Text>
            
            {step === "verify" && (
              <Text style={styles.subtitle}>
                Verify your identity to change PIN
              </Text>
            )}
            
            {step === "newPin" && (
              <Text style={styles.subtitle}>
                Choose a 4-digit PIN
              </Text>
            )}
            
            {step === "confirmPin" && (
              <Text style={styles.subtitle}>
                Re-enter your new PIN
              </Text>
            )}

            <Animated.View 
              style={[
                styles.pinContainer,
                { transform: [{ translateX: shakeAnimation }] }
              ]}
            >
              <View style={styles.pinDots}>
                {renderPinDots(currentValue)}
              </View>
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : (
                <View style={styles.errorPlaceholder} />
              )}
            </Animated.View>

            <TouchableOpacity
              style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
              onPress={handleContinue}
              disabled={!canContinue}
            >
              <Text style={styles.continueButtonText}>
                {step === "confirmPin" ? "Update PIN" : "Continue"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.hiddenInput}
              value={currentValue}
              onChangeText={(text) => handlePinChange(text, currentSetter)}
              keyboardType="numeric"
              maxLength={4}
              autoFocus
              secureTextEntry={false}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  keyboardAvoidingView: {
    width: "100%",
  },
  modalContainer: {
    backgroundColor: "rgba(20, 20, 20, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    minHeight: 380,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    marginBottom: 40,
  },
  pinContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  pinDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  pinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  pinDotFilled: {
    backgroundColor: "white",
  },
  pinDotEmpty: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    textAlign: "center",
    height: 16,
  },
  errorPlaceholder: {
    height: 16,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  continueButtonText: {
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