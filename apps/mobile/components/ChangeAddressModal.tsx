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
  ScrollView,
} from "react-native";

interface ChangeAddressModalProps {
  visible: boolean;
  onClose: () => void;
  currentAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onAddressChanged: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
}

export default function ChangeAddressModal({ 
  visible, 
  onClose, 
  currentAddress,
  onAddressChanged 
}: ChangeAddressModalProps) {
  const [street, setStreet] = useState(currentAddress.street);
  const [city, setCity] = useState(currentAddress.city);
  const [state, setState] = useState(currentAddress.state);
  const [zipCode, setZipCode] = useState(currentAddress.zipCode);
  const [country, setCountry] = useState(currentAddress.country);

  const isValid = () => {
    return street.trim() && 
           city.trim() && 
           state.trim() && 
           zipCode.trim() && 
           country.trim() &&
           /^\d{5}(-\d{4})?$/.test(zipCode.trim());
  };

  const handleSave = () => {
    if (isValid()) {
      onAddressChanged({
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        country: country.trim(),
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setStreet(currentAddress.street);
    setCity(currentAddress.city);
    setState(currentAddress.state);
    setZipCode(currentAddress.zipCode);
    setCountry(currentAddress.country);
    onClose();
  };

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

            <Text style={styles.title}>Home Address</Text>

            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.input}
                value={street}
                onChangeText={setStreet}
                placeholder="Street Address"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="City"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  value={state}
                  onChangeText={setState}
                  placeholder="State"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  maxLength={2}
                  autoCapitalize="characters"
                />
                
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  value={zipCode}
                  onChangeText={setZipCode}
                  placeholder="ZIP"
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              
              <TextInput
                style={styles.input}
                value={country}
                onChangeText={setCountry}
                placeholder="Country"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />

              <TouchableOpacity
                style={[styles.saveButton, !isValid() && styles.saveButtonDisabled]}
                onPress={handleSave}
                disabled={!isValid()}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  keyboardAvoidingView: {
    width: "100%",
  },
  modalContainer: {
    backgroundColor: "#0A0A0A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    minHeight: 420,
  },
  handle: {
    width: 36,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "300",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    marginBottom: 32,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: "white",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  halfInput: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});