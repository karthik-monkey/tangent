import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";

interface ConnectWalletProps {
  onProceed: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

export default function ConnectWallet({ onProceed, onSkip, onBack }: ConnectWalletProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const walletOptions = [
    { id: "metamask", name: "MetaMask" },
    { id: "walletconnect", name: "WalletConnect" },
    { id: "coinbase", name: "Coinbase Wallet" },
    { id: "trust", name: "Trust Wallet" },
    { id: "phantom", name: "Phantom" },
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleProceed = () => {
    if (selectedWallet) {
      console.log(`Proceeding with wallet: ${selectedWallet}`);
      onProceed();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.headerButton}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={onSkip} style={styles.headerButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>Connect Wallet</Text>
        <Text style={styles.subtitle}>
          Select your preferred wallet
        </Text>

        {/* Wallet List */}
        <View style={styles.listContainer}>
          {walletOptions.map((wallet) => (
            <TouchableOpacity
              key={wallet.id}
              style={styles.walletOption}
              onPress={() => handleWalletSelect(wallet.id)}
            >
              <Text style={styles.walletName}>{wallet.name}</Text>
              {selectedWallet === wallet.id ? (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : (
                <Text style={styles.chevron}>›</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedWallet && styles.disabledButton
            ]} 
            onPress={handleProceed}
            disabled={!selectedWallet}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedWallet && styles.disabledButtonText
            ]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },
  headerButton: {
    padding: 4,
  },
  backText: {
    fontSize: 24,
    color: "#666666",
  },
  skipText: {
    fontSize: 16,
    color: "#666666",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 48,
  },
  listContainer: {
    flex: 1,
  },
  walletOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0A0A0A",
  },
  walletName: {
    fontSize: 17,
    color: "white",
    fontWeight: "400",
  },
  chevron: {
    fontSize: 20,
    color: "#333333",
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 14,
    color: "black",
    fontWeight: "600",
  },
  buttonContainer: {
    paddingVertical: 32,
  },
  continueButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#0A0A0A",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  disabledButtonText: {
    color: "#333333",
  },
});
