import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

interface HomeAddressProps {
  onNext: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
  onBack?: () => void;
}

export default function HomeAddress({ onNext, onBack }: HomeAddressProps) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");

  const handleNext = () => {
    onNext({ 
      street: street || "123 Main St", 
      city: city || "Anytown", 
      state: state || "CA", 
      zipCode: zipCode || "12345",
      country: country || "United States"
    }); // Default for testing
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forwardButton} onPress={handleNext}>
            <Text style={styles.forwardArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title and Description */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Home address</Text>
            <Text style={styles.subtitle}>
              This info needs to be accurate with your ID document.
            </Text>
          </View>

          {/* Address Inputs */}
          <View style={styles.inputSection}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Address Line</Text>
              <TextInput
                style={styles.input}
                placeholder="Mr. Jhon Doe"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={street}
                onChangeText={setStreet}
                autoFocus
              />
            </View>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City, State"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={city}
                onChangeText={setCity}
              />
            </View>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Postcode</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 00000"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Country of Residence</Text>
              <View style={styles.countryContainer}>
                <Text style={styles.flagIcon}>🇺🇸</Text>
                <TextInput
                  style={styles.countryInput}
                  placeholder="United States"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={country}
                  onChangeText={setCountry}
                />
              </View>
            </View>
          </View>

          {/* Continue Button - Now part of scrollable content */}
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={handleNext}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  titleSection: {
    marginBottom: 40,
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
    paddingTop: 20,
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  flagIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  countryInput: {
    flex: 1,
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  buttonSection: {
    paddingTop: 40,
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
}); 