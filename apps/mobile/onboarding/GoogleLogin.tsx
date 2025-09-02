import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";

interface GoogleLoginProps {
  onSuccess: () => void;
  onBack?: () => void;
}

export default function GoogleLogin({ onSuccess, onBack }: GoogleLoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.forwardButton} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.cardStack}>
              <View style={[styles.card, styles.card1]} />
              <View style={[styles.card, styles.card2]} />
              <View style={[styles.card, styles.card3]} />
              <View style={[styles.card, styles.card4]} />
            </View>
            <View style={styles.coins}>
              <View style={[styles.coin, styles.coin1]} />
              <View style={[styles.coin, styles.coin2]} />
              <View style={[styles.coin, styles.coin3]} />
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome back to{'\n'}Tangent</Text>
            <Text style={styles.description}>
              Sign in with your Google account to access your wallet and transactions.
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.googleButton} 
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Image 
                  source={require('../assets/google-logo.png')} 
                  style={styles.googleLogo}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By continuing you accept our{'\n'}
            <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backArrow: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  forwardButton: {
    width: 44,
    height: 44,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    position: "relative",
    marginBottom: 60,
  },
  cardStack: {
    position: "relative",
    width: 200,
    height: 140,
  },
  card: {
    position: "absolute",
    width: 180,
    height: 110,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  card1: {
    top: 0,
    left: 0,
    transform: [{ rotate: '-5deg' }],
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  card2: {
    top: 5,
    left: 5,
    transform: [{ rotate: '2deg' }],
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  card3: {
    top: 10,
    left: 10,
    transform: [{ rotate: '-1deg' }],
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  card4: {
    top: 15,
    left: 15,
    backgroundColor: "rgba(100, 100, 255, 0.1)",
    borderColor: "rgba(100, 100, 255, 0.3)",
  },
  coins: {
    position: "absolute",
    left: -40,
    top: 20,
  },
  coin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 10,
  },
  coin1: {
    marginLeft: 0,
  },
  coin2: {
    marginLeft: 15,
  },
  coin3: {
    marginLeft: 30,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  termsText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    lineHeight: 20,
  },
  linkText: {
    color: "rgba(255, 255, 255, 0.8)",
    textDecorationLine: "underline",
  },
});