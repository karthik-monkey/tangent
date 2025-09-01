import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from "react-native";
import SettingsScreen from "./SettingsScreen";

interface Card {
  id: string;
  name: string;
  lastFour: string;
  balance: string;
  gradient: string[];
}

interface HomeScreenProps {
  onAddWallet?: () => void;
}

const mockCards: Card[] = [
  {
    id: "1",
    name: "Alex Garden",
    lastFour: "4635",
    balance: "$2097",
    gradient: ["#FF9A56", "#FF6B9D", "#C471F5", "#5B9BD5"]
  },
  {
    id: "2", 
    name: "Alex Garden",
    lastFour: "9524",
    balance: "$290",
    gradient: ["#8B5FBF", "#6366F1", "#8B5FBF"]
  },
  {
    id: "3",
    name: "Alex Garden", 
    lastFour: "7823",
    balance: "$150",
    gradient: ["#FF7B54", "#FF9478", "#FFB199"]
  }
];

export default function HomeScreen({ onAddWallet }: HomeScreenProps = {}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showPaymentReady, setShowPaymentReady] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [password, setPassword] = useState("");
  
  const handleAddCard = () => {
    if (onAddWallet) {
      onAddWallet();
    } else {
      console.log("Add new card");
    }
  };

  const handleSettingsPress = () => {
    setShowSettings(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const handleCardPress = (card: Card) => {
    setSelectedCard(card);
    setShowPaymentReady(true);
  };

  const handlePasswordSubmit = () => {
    // In a real app, this would verify against stored PIN
    if (password === "1234") {
      setShowPasswordPrompt(false);
      setPassword("");
      setShowPaymentReady(true);
    } else {
      Alert.alert("Incorrect Password", "Please try again.");
      setPassword("");
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPassword("");
    setSelectedCard(null);
  };

  const handlePaymentComplete = () => {
    setShowPaymentReady(false);
    setSelectedCard(null);
  };

  if (showSettings) {
    return <SettingsScreen onBack={handleBackFromSettings} />;
  }

  const renderCard = (card: Card, index: number) => {
    return (
      <TouchableOpacity 
        key={card.id} 
        style={[styles.card, { marginTop: index * 12 }]}
        activeOpacity={0.95}
        onPress={() => handleCardPress(card)}
      >
        <View style={styles.cardGradient}>
          {/* Mastercard Logo */}
          <View style={styles.mastercardContainer}>
            <View style={[styles.mastercardCircle, styles.mastercardRed]} />
            <View style={[styles.mastercardCircle, styles.mastercardOrange]} />
          </View>

          {/* Card Info */}
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardNumber}>** {card.lastFour}</Text>
          </View>

          {/* Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>{card.balance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Cards</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <ScrollView 
        style={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContent}
      >
        {mockCards.map((card, index) => renderCard(card, index))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.cardIconContainer}>
            <View style={styles.cardIcon}>
              <View style={styles.cardChip} />
              <View style={styles.cardLines}>
                <View style={styles.cardLine} />
                <View style={styles.cardLine} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handleSettingsPress}>
          <View style={styles.settingsIcon}>
            <View style={styles.settingsSlider}>
              <View style={styles.sliderTrack} />
              <View style={styles.sliderKnob} />
            </View>
            <View style={[styles.settingsSlider, { marginTop: 4 }]}>
              <View style={styles.sliderTrack} />
              <View style={[styles.sliderKnob, { left: 10 }]} />
            </View>
            <View style={[styles.settingsSlider, { marginTop: 4 }]}>
              <View style={styles.sliderTrack} />
              <View style={styles.sliderKnob} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Password Prompt Modal */}
      <Modal
        visible={showPasswordPrompt}
        transparent={true}
        animationType="fade"
        onRequestClose={handlePasswordCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.passwordModal}>
            {/* Card Preview */}
            <View style={styles.modalCardPreview}>
              <View style={styles.miniCard}>
                <Text style={styles.miniCardText}>
                  {selectedCard?.name} •••• {selectedCard?.lastFour}
                </Text>
              </View>
            </View>

            {/* Authentication Text */}
            <Text style={styles.authTitle}>Enter Passcode</Text>
            <Text style={styles.authSubtitle}>
              Enter your passcode to view card details
            </Text>

            {/* Password Input */}
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter passcode"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              secureTextEntry={true}
              keyboardType="numeric"
              maxLength={4}
              autoFocus={true}
              onSubmitEditing={handlePasswordSubmit}
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handlePasswordCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.submitButton, password.length !== 4 && styles.submitButtonDisabled]} 
                onPress={handlePasswordSubmit}
                disabled={password.length !== 4}
              >
                <Text style={styles.submitButtonText}>Unlock</Text>
              </TouchableOpacity>
            </View>
                     </View>
         </View>
       </Modal>

      {/* Payment Ready Modal */}
      <Modal
        visible={showPaymentReady}
        transparent={true}
        animationType="slide"
        onRequestClose={handlePaymentComplete}
      >
        <View style={styles.paymentModalOverlay}>
          <View style={styles.paymentModal}>
            {/* Selected Card Display - Exact same design as main cards */}
            {selectedCard && (
              <View style={styles.paymentCard}>
                <View style={styles.cardGradient}>
                  {/* Mastercard Logo */}
                  <View style={styles.mastercardContainer}>
                    <View style={[styles.mastercardCircle, styles.mastercardRed]} />
                    <View style={[styles.mastercardCircle, styles.mastercardOrange]} />
                  </View>

                  {/* Card Info */}
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>{selectedCard.name}</Text>
                    <Text style={styles.cardNumber}>** {selectedCard.lastFour}</Text>
                  </View>

                  {/* Balance */}
                  <View style={styles.balanceContainer}>
                    <Text style={styles.balance}>{selectedCard.balance}</Text>
                  </View>
                </View>
              </View>
            )}

            {/* NFC Icon */}
            <View style={styles.nfcIcon}>
              <View style={styles.phoneIcon} />
            </View>

            {/* Hold Near Reader Text */}
            <Text style={styles.holdNearText}>Hold Near Reader</Text>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  addIcon: {
    fontSize: 20,
    color: "white",
    fontWeight: "300",
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cardsContent: {
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(160, 160, 170, 0.2)",
  },
  cardGradient: {
    height: 180,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "rgba(130, 130, 140, 0.12)",
  },
  mastercardContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  mastercardCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  mastercardRed: {
    backgroundColor: "rgba(200, 200, 210, 0.85)",
    marginRight: -6,
    zIndex: 1,
  },
  mastercardOrange: {
    backgroundColor: "rgba(150, 150, 160, 0.75)",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardName: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(190, 190, 200, 0.9)",
    marginBottom: 6,
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(160, 160, 170, 0.75)",
  },
  balanceContainer: {
    alignSelf: "flex-end",
  },
  balance: {
    fontSize: 24,
    fontWeight: "600",
    color: "rgba(210, 210, 220, 0.9)",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 60,
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  navItem: {
    padding: 8,
  },
  navItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  cardIconContainer: {
    padding: 2,
  },
  cardIcon: {
    width: 24,
    height: 16,
    backgroundColor: "white",
    borderRadius: 3,
    padding: 2,
    position: "relative",
  },
  cardChip: {
    width: 4,
    height: 3,
    backgroundColor: "black",
    borderRadius: 1,
    position: "absolute",
    top: 2,
    left: 2,
  },
  cardLines: {
    position: "absolute",
    bottom: 2,
    right: 2,
    gap: 1,
  },
  cardLine: {
    width: 8,
    height: 1,
    backgroundColor: "black",
    borderRadius: 0.5,
  },
  settingsIcon: {
    padding: 2,
    width: 20,
    height: 20,
  },
  settingsSlider: {
    position: "relative",
    width: 16,
    height: 2,
  },
  sliderTrack: {
    width: 16,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1,
  },
  sliderKnob: {
    position: "absolute",
    width: 4,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 2,
    top: -1,
    left: 2,
  },
  chartIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
  },
  trendIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    transform: [{ rotate: "45deg" }],
  },
  messageIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 5,
  },
  dotsIcon: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 20,
    height: 20,
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  // Password Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordModal: {
    backgroundColor: "rgba(20, 20, 20, 0.95)",
    borderRadius: 20,
    padding: 24,
    width: "85%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalCardPreview: {
    marginBottom: 20,
  },
  miniCard: {
    backgroundColor: "rgba(130, 130, 140, 0.15)",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(160, 160, 170, 0.2)",
  },
  miniCardText: {
    fontSize: 14,
    color: "rgba(190, 190, 200, 0.9)",
    fontWeight: "500",
  },
  authTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  authSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 24,
    textAlign: "center",
  },
  passwordInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "white",
    width: "100%",
    textAlign: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  submitButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },
  // Payment Ready Modal Styles
  paymentModalOverlay: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentModal: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  paymentCard: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(160, 160, 170, 0.2)",
    marginBottom: 80,
  },
  nfcIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 122, 255, 0.15)",
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  phoneIcon: {
    width: 16,
    height: 24,
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
  holdNearText: {
    fontSize: 18,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
}); 