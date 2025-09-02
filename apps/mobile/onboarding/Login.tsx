import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";

interface LoginProps {
  onNext: (email: string) => void;
  onBack?: () => void;
  onGoogleLogin?: () => void;
}

export default function Login({ onNext, onBack, onGoogleLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    // In a real app, this would authenticate the user
    // For now, we'll just pass the email to continue the flow
    onNext(email || "test@example.com");
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
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>
                Enter your email and password to sign in
              </Text>
            </View>

            {/* Form Inputs */}
            <View style={styles.formSection}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
                <Text style={styles.continueButtonText}>Sign In</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.divider} />
              </View>

              {/* Google Login Button */}
              <TouchableOpacity style={styles.googleButton} onPress={onGoogleLogin}>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleG}>G</Text>
                </View>
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "white",
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textDecorationLine: "underline",
  },
  buttonSection: {
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  orText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 16,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleG: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4285F4",
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
    marginRight: 36,
  },
}); 