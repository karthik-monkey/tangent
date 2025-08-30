import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from "react-native";

interface HomeAddressProps {
  onNext: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  onBack?: () => void;
}

export default function HomeAddress({ onNext, onBack }: HomeAddressProps) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleNext = () => {
    onNext({ 
      street: street || "123 Main St", 
      city: city || "Anytown", 
      state: state || "CA", 
      zipCode: zipCode || "12345" 
    }); // Default for testing
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
          <Text style={styles.title}>Home Address</Text>
          <Text style={styles.subtitle}>
            Please provide your home address for verification
          </Text>
        </View>

        {/* Address Inputs */}
        <ScrollView style={styles.inputContainer} showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={street}
            onChangeText={setStreet}
            autoFocus
          />
          
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={city}
            onChangeText={setCity}
          />
          
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={state}
              onChangeText={setState}
            />
            
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="ZIP Code"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
        </ScrollView>

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
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 17,
    color: "white",
    fontWeight: "500",
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 44,
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
  },
}); 