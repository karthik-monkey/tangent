import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

interface Wallet {
  id: string;
  name: string;
  address: string;
  type: string;
}

interface WalletSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (wallet: Wallet) => void;
  currentWalletId?: string;
  wallets: Wallet[];
}

const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 5;
const SELECTOR_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function WalletSelector({
  visible,
  onClose,
  onSelect,
  currentWalletId,
  wallets,
}: WalletSelectorProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (currentWalletId) {
      const index = wallets.findIndex(w => w.id === currentWalletId);
      if (index !== -1) {
        setSelectedIndex(index);
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: index * ITEM_HEIGHT,
            animated: false,
          });
        }, 100);
      }
    }
  }, [currentWalletId, wallets]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(Math.max(0, Math.min(index, wallets.length - 1)));
  };

  const handleScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const targetIndex = Math.max(0, Math.min(index, wallets.length - 1));
    
    scrollViewRef.current?.scrollTo({
      y: targetIndex * ITEM_HEIGHT,
      animated: true,
    });
    
    setSelectedIndex(targetIndex);
  };

  const handleConfirm = () => {
    if (wallets[selectedIndex]) {
      onSelect(wallets[selectedIndex]);
      onClose();
    }
  };

  const formatAddress = (address: string) => {
    if (address.length > 10) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select Wallet</Text>
            <TouchableOpacity onPress={handleConfirm} style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.selectorContainer}>
            <View style={styles.selectionIndicator} />
            
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={handleScroll}
              onMomentumScrollEnd={handleScrollEnd}
              scrollEventThrottle={16}
            >
              <View style={{ height: ITEM_HEIGHT * 2 }} />
              
              {wallets.map((wallet, index) => {
                const isSelected = index === selectedIndex;
                const distance = Math.abs(index - selectedIndex);
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.3;
                const scale = distance === 0 ? 1 : distance === 1 ? 0.9 : 0.8;
                
                return (
                  <TouchableOpacity
                    key={wallet.id}
                    style={[styles.walletItem, { opacity, transform: [{ scale }] }]}
                    onPress={() => {
                      setSelectedIndex(index);
                      scrollViewRef.current?.scrollTo({
                        y: index * ITEM_HEIGHT,
                        animated: true,
                      });
                    }}
                  >
                    <View style={styles.walletInfo}>
                      <Text style={[styles.walletName, isSelected && styles.selectedText]}>
                        {wallet.name}
                      </Text>
                      <Text style={[styles.walletAddress, isSelected && styles.selectedSubtext]}>
                        {wallet.type} • {formatAddress(wallet.address)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              
              <View style={{ height: ITEM_HEIGHT * 2 }} />
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0A0A0A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    fontSize: 16,
    color: "#666666",
  },
  doneButton: {
    padding: 4,
  },
  doneText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  selectorContainer: {
    height: SELECTOR_HEIGHT,
    position: "relative",
    marginTop: 20,
  },
  selectionIndicator: {
    position: "absolute",
    top: SELECTOR_HEIGHT / 2 - ITEM_HEIGHT / 2,
    left: 20,
    right: 20,
    height: ITEM_HEIGHT,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    zIndex: 0,
  },
  scrollView: {
    height: SELECTOR_HEIGHT,
  },
  scrollContent: {
    paddingVertical: 0,
  },
  walletItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  walletInfo: {
    flex: 1,
    justifyContent: "center",
  },
  walletName: {
    fontSize: 17,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 4,
  },
  walletAddress: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.4)",
  },
  selectedText: {
    color: "white",
    fontWeight: "600",
  },
  selectedSubtext: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});