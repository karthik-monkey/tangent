import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";

interface ChangePhoneModalProps {
  visible: boolean;
  onClose: () => void;
  currentPhone: string;
  onPhoneChanged: (newPhone: string) => void;
  onRequestVerification: (phoneNumber: string) => void;
}

export default function ChangePhoneModal({ 
  visible, 
  onClose, 
  currentPhone, 
  onPhoneChanged,
  onRequestVerification 
}: ChangePhoneModalProps) {
  const [step, setStep] = useState<"phone" | "verification">("phone");
  const [newPhone, setNewPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<(TextInput | null)[]>([]);

  const handlePhoneSubmit = () => {
    if (!newPhone) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }
    
    const formattedPhone = `+1${newPhone.replace(/\D/g, "")}`;
    onRequestVerification(formattedPhone);
    setStep("verification");
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }
    
    const formattedPhone = formatPhoneDisplay(`+1${newPhone.replace(/\D/g, "")}`);
    onPhoneChanged(formattedPhone);
    handleClose();
    Alert.alert("Success", "Your phone number has been updated");
  };

  const handleResendCode = () => {
    const formattedPhone = `+1${newPhone.replace(/\D/g, "")}`;
    onRequestVerification(formattedPhone);
    Alert.alert("Code Sent", "A new verification code has been sent to your phone");
  };

  const handleClose = () => {
    setStep("phone");
    setNewPhone("");
    setVerificationCode(["", "", "", "", "", ""]);
    onClose();
  };

  const formatPhoneDisplay = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  const formatPhoneInput = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const parts = [];
      if (match[1]) parts.push(`(${match[1]}`);
      if (match[2]) parts.push(`) ${match[2]}`);
      if (match[3]) parts.push(`-${match[3]}`);
      return parts.join("");
    }
    return text;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.title}>
                {step === "phone" ? "Change Phone Number" : "Verify Phone Number"}
              </Text>
              <View style={styles.placeholder} />
            </View>

            {step === "phone" ? (
              <>
                <Text style={styles.description}>
                  Enter your new phone number. We'll send you a verification code to confirm.
                </Text>

                <View style={styles.inputSection}>
                  <Text style={styles.label}>Current Phone</Text>
                  <View style={styles.currentPhoneContainer}>
                    <Text style={styles.currentPhone}>{currentPhone}</Text>
                  </View>

                  <Text style={[styles.label, { marginTop: 20 }]}>New Phone Number</Text>
                  <View style={styles.phoneContainer}>
                    <Text style={styles.phonePrefix}>+1</Text>
                    <View style={styles.phoneDivider} />
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="(555) 123-4567"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      value={formatPhoneInput(newPhone)}
                      onChangeText={(text) => setNewPhone(text.replace(/\D/g, ""))}
                      keyboardType="phone-pad"
                      maxLength={14}
                      autoFocus
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={[styles.submitButton, !newPhone && styles.disabledButton]}
                  onPress={handlePhoneSubmit}
                  disabled={!newPhone}
                >
                  <Text style={styles.submitButtonText}>Send Verification Code</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.description}>
                  We sent a 6-digit code to {formatPhoneDisplay(`+1${newPhone}`)}
                </Text>

                <View style={styles.codeSection}>
                  <Text style={styles.label}>Verification Code</Text>
                  <View style={styles.codeContainer}>
                    {verificationCode.map((digit, index) => (
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

                  <View style={styles.resendSection}>
                    <Text style={styles.resendText}>Didn't get a code? </Text>
                    <TouchableOpacity onPress={handleResendCode}>
                      <Text style={styles.resendLink}>Resend</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={handleVerifyCode}
                >
                  <Text style={styles.submitButtonText}>Verify & Update</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => setStep("phone")}
                >
                  <Text style={styles.backButtonText}>Change Number</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: 400,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cancelButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  placeholder: {
    width: 50,
  },
  description: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 24,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 8,
    fontWeight: "500",
  },
  currentPhoneContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  currentPhone: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.5)",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
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
    paddingVertical: 14,
    fontSize: 16,
    color: "white",
  },
  codeSection: {
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  digitInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    backgroundColor: "black",
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  digitInputFilled: {
    borderColor: "white",
    backgroundColor: "black",
  },
  resendSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resendText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.7)",
  },
  resendLink: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  backButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "black",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});