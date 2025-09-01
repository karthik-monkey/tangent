import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";

interface ConnectWalletPostProps {
  onProceed: () => void;
  onCancel: () => void;
}

export default function ConnectWalletPost({ onProceed, onCancel }: ConnectWalletPostProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const walletOptions = [
    { id: "metamask", name: "MetaMask", icon: "🦊", iconBg: "#F6851B" },
    { id: "walletconnect", name: "WalletConnect", icon: "🔗", iconBg: "#3B99FC" },
    { id: "coinbase", name: "Coinbase Wallet", icon: "🔵", iconBg: "#0052FF" },
    { id: "trust", name: "Trust Wallet", icon: "🛡️", iconBg: "#3375BB" },
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleAddWallet = () => {
    // Handle add custom wallet
    console.log("Add custom wallet");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header with back and cancel */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onCancel}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Title and Description at top */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Add Wallet</Text>
          <Text style={styles.subtitle}>
            Connect a crypto wallet to manage your digital assets with Tangent.
          </Text>
        </View>

        {/* Wallet Options and Buttons */}
        <View style={styles.bottomContainer}>
          <ScrollView 
            style={styles.walletList} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {walletOptions.map((wallet) => (
              <TouchableOpacity
                key={wallet.id}
                style={[
                  styles.walletOption,
                  selectedWallet === wallet.id && styles.selectedWallet
                ]}
                onPress={() => handleWalletSelect(wallet.id)}
              >
                <View style={styles.walletIcon}>
                  <Text style={styles.walletIconEmoji}>{wallet.icon}</Text>
                </View>
                <Text style={styles.walletName}>{wallet.name}</Text>
                {selectedWallet === wallet.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}

            {/* Can't find wallet option */}
            <TouchableOpacity style={styles.addWalletOption} onPress={handleAddWallet}>
              <View style={styles.addWalletIcon}>
                <Text style={styles.addWalletIconText}>+</Text>
              </View>
              <Text style={styles.walletName}>Can't find your wallet?</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.connectButton,
                !selectedWallet && styles.disabledButton
              ]} 
              onPress={onProceed}
              disabled={!selectedWallet}
            >
              <Text style={styles.connectButtonText}>Connect Wallet</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
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
  cancelText: {
    fontSize: 17,
    color: "white",
    fontWeight: "400",
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
  bottomContainer: {
    flex: 1,
  },
  walletList: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  walletOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  selectedWallet: {
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  addWalletOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "transparent",
    marginBottom: 8,
    marginTop: 6,
  },
  walletIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  walletIconEmoji: {
    fontSize: 16,
  },
  addWalletIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  addWalletIconText: {
    fontSize: 18,
    fontWeight: "200",
    color: "rgba(255, 255, 255, 0.5)",
  },
  walletName: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    flex: 1,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    fontSize: 12,
    fontWeight: "600",
    color: "black",
  },
  buttonContainer: {
    paddingBottom: 44,
  },
  connectButton: {
    backgroundColor: "white",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  connectButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
  },
}); 