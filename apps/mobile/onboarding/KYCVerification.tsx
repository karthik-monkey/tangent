import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import * as Linking from 'expo-linking';

interface KYCVerificationProps {
  onNext?: () => void;
  onBack?: () => void;
  stripeKYCUrl?: string; // URL for Stripe KYC verification
}

export default function KYCVerification({ onNext, onBack, stripeKYCUrl = "https://connect.stripe.com/setup/example" }: KYCVerificationProps) {
  
  const handleKYCRedirect = async () => {
    try {
      const canOpen = await Linking.canOpenURL(stripeKYCUrl);
      if (canOpen) {
        await Linking.openURL(stripeKYCUrl);
      } else {
        Alert.alert(
          "Unable to open link", 
          "Please try again or contact support if the issue persists."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error", 
        "Failed to open verification link. Please try again."
      );
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Verification",
      "You can complete your KYC verification later in your account settings. Some features may be limited until verification is complete.",
      [
        { text: "Go Back", style: "cancel" },
        { text: "Skip for Now", onPress: onNext }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forwardButton} onPress={onNext}>
            <Text style={styles.forwardArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Title and Description */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Identity Verification</Text>
            <Text style={styles.subtitle}>
              We've partnered with Stripe to securely verify your identity.
            </Text>
          </View>

          {/* Simple Info */}
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              Click the link below to complete your verification with Stripe. 
              This process takes just a few minutes and helps us comply with financial regulations.
            </Text>
          </View>
        </View>

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleKYCRedirect}
        >
          <Text style={styles.primaryButtonText}>Start Verification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleSkip}
        >
          <Text style={styles.secondaryButtonText}>Skip for Now</Text>
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
    paddingTop: 16,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  infoSection: {
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 24,
    textAlign: "center",
  },
  buttonSection: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  primaryButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
}); 