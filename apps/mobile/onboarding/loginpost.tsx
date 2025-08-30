import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function OnboardingScreen() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const baseText = "Pay instantly with ";
  const cryptos = ["Bitcoin", "Ethereum", "Litecoin", "Dogecoin", "Cardano", "Solana"];
  
  useEffect(() => {
    let currentIndex = 0;
    let cryptoIndex = 0;
    let isErasing = false;
    let currentCrypto = "";
    let isTypingBase = true;
    let waitCounter = 0;
    let isWaiting = false;
    
    const typewriterInterval = setInterval(() => {
      if (isTypingBase) {
        // First, type the base text
        if (currentIndex <= baseText.length) {
          setDisplayedText(baseText.slice(0, currentIndex));
          currentIndex++;
        } else {
          isTypingBase = false;
          currentIndex = 0;
          currentCrypto = cryptos[cryptoIndex];
        }
      } else {
        if (!isErasing && !isWaiting) {
          // Type the current crypto
          if (currentIndex <= currentCrypto.length) {
            setDisplayedText(baseText + currentCrypto.slice(0, currentIndex));
            currentIndex++;
          } else {
            // Start waiting period
            isWaiting = true;
            waitCounter = 0;
          }
        } else if (isWaiting) {
          // Wait for 1.5 seconds (1500ms / 80ms = ~19 cycles)
          waitCounter++;
          if (waitCounter >= 19) {
            isWaiting = false;
            isErasing = true;
            waitCounter = 0;
          }
        } else if (isErasing) {
          // Erase the current crypto
          if (currentIndex > 0) {
            setDisplayedText(baseText + currentCrypto.slice(0, currentIndex - 1));
            currentIndex--;
          } else {
            // Move to next crypto
            isErasing = false;
            cryptoIndex = (cryptoIndex + 1) % cryptos.length;
            currentCrypto = cryptos[cryptoIndex];
            currentIndex = 0;
          }
        }
      }
    }, 80);

    return () => clearInterval(typewriterInterval);
  }, []);

  return (
    <LinearGradient
             colors={["#000000", "#000000", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
              <SafeAreaView style={styles.inner}>
                    {/* Center Content */}
          <View style={styles.centerContent}>
            <Text style={styles.logo}>Tangent</Text>
            <View style={styles.typewriterContainer}>
              <Text style={styles.subtitle}>{displayedText}</Text>
              {showCursor && <Text style={styles.cursor}>|</Text>}
            </View>
          </View>

        {/* Bottom Button */}
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.buttonGoogle}>
            <View style={styles.googleButtonContent}>
              <Image source={require("../assets/google logo.jpg")} style={styles.googleLogo} />
              <Text style={styles.buttonTextGoogle}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          
          {/* Sign Up and Login buttons */}
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.buttonSignUp}>
              <Text style={styles.buttonTextSignUp}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogin}>
              <Text style={styles.buttonTextLogin}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: "space-between" },

  

  // Center content
     centerContent: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     paddingHorizontal: 32,
   },
   typewriterContainer: {
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "center",
     minHeight: 26,
   },
     logo: {
     fontSize: 42,
     fontWeight: "500",
     fontFamily: "System",
     color: "white",
     marginBottom: 12,
     textAlign: "center",
     letterSpacing: 0,
     textShadowColor: "rgba(0, 0, 0, 0.25)",
     textShadowOffset: { width: 0, height: 2 },
     textShadowRadius: 6,
   },
     subtitle: {
     fontSize: 17,
     color: "rgba(255, 255, 255, 0.92)",
     textAlign: "center",
     lineHeight: 26,
     fontWeight: "400",
     letterSpacing: 0.3,
   },
   cursor: {
     fontSize: 17,
     color: "rgba(255, 255, 255, 0.92)",
     marginLeft: 2,
     fontWeight: "400",
   },

  // Button
  bottom: { padding: 24, paddingBottom: 40 },
     buttonGoogle: {
     backgroundColor: "black",
     paddingVertical: 18,
     borderRadius: 12,
     alignItems: "center",
     shadowColor: "rgba(0, 0, 0, 0.12)",
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 1,
     shadowRadius: 12,
     elevation: 8,
     borderWidth: 1,
     borderColor: "rgba(255, 255, 255, 0.18)",
   },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleLogo: { width: 20, height: 20, marginRight: 12 },
     buttonTextGoogle: {
     fontSize: 16,
     fontWeight: "500",
     color: "white",
     letterSpacing: 0.25,
   },
   
   // Auth buttons container and styles
   authButtonsContainer: {
     flexDirection: "column",
     marginTop: 12,
     gap: 8,
   },
   buttonSignUp: {
     backgroundColor: "white",
     paddingVertical: 14,
     borderRadius: 12,
     alignItems: "center",
     borderWidth: 1,
     borderColor: "rgba(255, 255, 255, 0.2)",
   },
   buttonTextSignUp: {
     fontSize: 15,
     fontWeight: "500",
     color: "black",
     letterSpacing: 0.25,
   },
   buttonLogin: {
     backgroundColor: "transparent",
     paddingVertical: 14,
     borderRadius: 12,
     alignItems: "center",
     borderWidth: 1,
     borderColor: "rgba(255, 255, 255, 0.3)",
   },
   buttonTextLogin: {
     fontSize: 15,
     fontWeight: "500",
     color: "white",
     letterSpacing: 0.25,
   },
});
