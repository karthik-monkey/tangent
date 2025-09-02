import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

interface Wallet {
  id: string;
  name: string;
  address: string;
  type: string;
}

interface WalletSetupScreenProps {
  onBack?: () => void;
  onAddWallet?: () => void;
}

export default function WalletSetupScreen({ onBack, onAddWallet }: WalletSetupScreenProps) {
  const [wallets, setWallets] = useState<Wallet[]>([
    { 
      id: "wallet1", 
      name: "Alex Garden", 
      address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bE4635", 
      type: "MetaMask"
    },
    { 
      id: "wallet2", 
      name: "Personal Wallet", 
      address: "0x8901234567890123456789012345678901234567", 
      type: "WalletConnect"
    },
    { 
      id: "wallet3", 
      name: "Trading Account", 
      address: "0x1234567890123456789012345678901234567890", 
      type: "Coinbase"
    },
  ]);

  const formatAddress = (address: string) => {
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  const handleRemoveWallet = (walletId: string) => {
    const wallet = wallets.find(w => w.id === walletId);
    Alert.alert(
      "Remove Wallet",
      `Are you sure you want to remove "${wallet?.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setWallets(prev => prev.filter(w => w.id !== walletId));
          }
        }
      ]
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet Setup</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>CONNECTED WALLETS</Text>
        
        <View style={styles.section}>
          {wallets.map((wallet, index) => (
            <React.Fragment key={wallet.id}>
              <View style={styles.walletRow}>
                <View style={styles.walletContent}>
                  <Text style={styles.walletName}>{wallet.name}</Text>
                  <Text style={styles.walletSubtitle}>
                    {wallet.type} • {formatAddress(wallet.address)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveWallet(wallet.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
              {index < wallets.length - 1 && renderSeparator()}
            </React.Fragment>
          ))}
          
          {wallets.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No wallets connected</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={onAddWallet}>
          <Text style={styles.addButtonText}>+ Add New Wallet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 30,
    marginBottom: 8,
    marginHorizontal: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
  },
  walletContent: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    marginBottom: 2,
  },
  walletSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.6)",
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  removeButtonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#FF3B30",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 16,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.4)",
  },
  addButton: {
    marginTop: 24,
    marginHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#007AFF",
  },
});