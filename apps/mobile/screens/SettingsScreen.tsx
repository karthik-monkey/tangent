import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch, Alert } from "react-native";
import ChangePinModal from "../components/ChangePinModal";
import WalletSelector from "../components/WalletSelector";
import ChangeAddressModal from "../components/ChangeAddressModal";

interface SettingsScreenProps {
  onBack?: () => void;
  onSignOut?: () => void;
  onAddWallet?: () => void;
  onWalletSetup?: () => void;
  currentPin?: string;
  onPinChanged?: (newPin: string) => void;
}

export default function SettingsScreen({ onBack, onSignOut, onAddWallet, onWalletSetup, currentPin = "1234", onPinChanged }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [doubleClickEnabled, setDoubleClickEnabled] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [showChangeAddressModal, setShowChangeAddressModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState({
    id: "wallet1",
    name: "Alex Garden",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bE4635",
    type: "MetaMask"
  });
  const [homeAddress, setHomeAddress] = useState({
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States"
  });

  // Mock wallet data - in a real app, this would come from your state management
  const availableWallets = [
    { id: "wallet1", name: "Alex Garden", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bE4635", type: "MetaMask" },
    { id: "wallet2", name: "Personal Wallet", address: "0x8901234567890123456789012345678901234567", type: "WalletConnect" },
    { id: "wallet3", name: "Trading Account", address: "0x1234567890123456789012345678901234567890", type: "Coinbase" },
    { id: "wallet4", name: "Savings Wallet", address: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12", type: "Trust Wallet" },
    { id: "wallet5", name: "DeFi Wallet", address: "0x9876543210987654321098765432109876543210", type: "Phantom" },
  ];

  const handlePinChanged = (newPin: string) => {
    setShowChangePinModal(false);
    onPinChanged?.(newPin);
    Alert.alert("Success", "Your PIN has been updated", [{ text: "OK" }]);
  };

  const handleWalletSelect = (wallet: any) => {
    setSelectedWallet(wallet);
    console.log("Selected wallet:", wallet);
  };

  const formatWalletDisplay = () => {
    const lastFour = selectedWallet.address.slice(-4);
    return `${selectedWallet.name} •••• ${lastFour}`;
  };

  const formatAddressDisplay = () => {
    return `${homeAddress.street}, ${homeAddress.city}, ${homeAddress.state}`;
  };

  const handleAddressChanged = (newAddress: typeof homeAddress) => {
    setHomeAddress(newAddress);
    setShowChangeAddressModal(false);
    Alert.alert("Success", "Your home address has been updated", [{ text: "OK" }]);
  };

  const renderSettingRow = (title: string, subtitle?: string, rightComponent?: React.ReactNode, onPress?: () => void) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent && (
        <View style={styles.settingRight}>
          {rightComponent}
        </View>
      )}
      {onPress && !rightComponent && (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Payment Wallets Section */}
        {renderSectionHeader("PAYMENT WALLETS")}
        <View style={styles.section}>
          {renderSettingRow(
            "Add Wallet", 
            undefined, 
            undefined, 
            onAddWallet
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Wallet Setup", 
            "Manage your wallets and payment methods", 
            undefined, 
            () => onWalletSetup?.()
          )}
        </View>

        {/* Transaction Defaults Section */}
        {renderSectionHeader("TRANSACTION DEFAULTS")}
        <View style={styles.section}>
          {renderSettingRow(
            "Default Wallet", 
            formatWalletDisplay(), 
            undefined, 
            () => setShowWalletSelector(true)
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Home Address", 
            formatAddressDisplay(), 
            undefined, 
            () => setShowChangeAddressModal(true)
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Phone", 
            "+1 (555) 123-4567", 
            undefined, 
            () => console.log("Phone")
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Email", 
            "alex@example.com"
          )}
        </View>

        {/* Privacy & Security Section */}
        {renderSectionHeader("PRIVACY & SECURITY")}
        <View style={styles.section}>
          {renderSettingRow(
            "Change PIN", 
            "Update your payment passcode", 
            undefined, 
            () => setShowChangePinModal(true)
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Allow Access When Locked", 
            "Coming soon", 
            <Switch
              value={doubleClickEnabled}
              onValueChange={() => {}}
              disabled={true}
              trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(52, 199, 89, 1)" }}
              thumbColor="rgba(255, 255, 255, 0.3)"
              style={{ opacity: 0.3 }}
            />
          )}
        </View>

        {/* Notifications Section */}
        {renderSectionHeader("NOTIFICATIONS")}
        <View style={styles.section}>
          {renderSettingRow(
            "Notifications", 
            "Transaction alerts and updates", 
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "rgba(120, 120, 128, 0.16)", true: "rgba(52, 199, 89, 1)" }}
              thumbColor="white"
            />
          )}
        </View>

        {/* Support Section */}
        {renderSectionHeader("SUPPORT")}
        <View style={styles.section}>
          {renderSettingRow(
            "Report an Issue", 
            undefined, 
            undefined, 
            () => console.log("Report issue")
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Help & Feedback", 
            undefined, 
            undefined, 
            () => console.log("Help")
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Terms & Conditions", 
            undefined, 
            undefined, 
            () => console.log("Terms")
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Privacy Policy", 
            undefined, 
            undefined, 
            () => console.log("Privacy")
          )}
        </View>

        {/* App Info Section */}
        {renderSectionHeader("APP INFO")}
        <View style={styles.section}>
          {renderSettingRow(
            "Version", 
            "1.0.0", 
            undefined, 
            undefined
          )}
          {renderSeparator()}
          {renderSettingRow(
            "Build", 
            "2024.1.1", 
            undefined, 
            undefined
          )}
        </View>

        {/* Logout Section */}
        {renderSectionHeader("ACCOUNT")}
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingRow} onPress={onSignOut}>
            <View style={styles.settingContent}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Account Section */}
        {renderSectionHeader("DANGER ZONE")}
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingRow} onPress={() => {
            Alert.alert(
              "Delete Account",
              "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    Alert.alert(
                      "Confirm Deletion",
                      "Please confirm that you want to permanently delete your account. This is your final warning.",
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        {
                          text: "Delete Account",
                          style: "destructive",
                          onPress: () => {
                            console.log("Account deletion confirmed");
                            Alert.alert(
                              "Account Deleted",
                              "Your account has been successfully deleted.",
                              [
                                {
                                  text: "OK",
                                  onPress: () => {
                                    onSignOut?.();
                                  }
                                }
                              ]
                            );
                          }
                        }
                      ]
                    );
                  }
                }
              ]
            );
          }}>
            <View style={styles.settingContent}>
              <Text style={styles.deleteAccountText}>Delete Account</Text>
              <Text style={styles.deleteAccountSubtext}>Permanently remove your account and all data</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <ChangePinModal
        visible={showChangePinModal}
        onClose={() => setShowChangePinModal(false)}
        currentPin={currentPin}
        onPinChanged={handlePinChanged}
      />

      <WalletSelector
        visible={showWalletSelector}
        onClose={() => setShowWalletSelector(false)}
        onSelect={handleWalletSelect}
        currentWalletId={selectedWallet.id}
        wallets={availableWallets}
      />

      <ChangeAddressModal
        visible={showChangeAddressModal}
        onClose={() => setShowChangeAddressModal(false)}
        currentAddress={homeAddress}
        onAddressChanged={handleAddressChanged}
      />
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
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 18,
  },
  settingRight: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.3)",
    marginLeft: 8,
    fontWeight: "300",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginLeft: 16,
  },
  bottomPadding: {
    height: 40,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FF3B30",
    marginBottom: 2,
  },
  deleteAccountText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FF3B30",
    marginBottom: 2,
  },
  deleteAccountSubtext: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255, 59, 48, 0.6)",
    lineHeight: 18,
  },
}); 