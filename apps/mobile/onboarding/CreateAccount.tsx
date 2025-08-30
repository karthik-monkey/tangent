import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

interface CreateAccountProps {
  onSignUp: () => void;
  onLogIn: () => void;
}

export default function CreateAccount({ onSignUp, onLogIn }: CreateAccountProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration placeholder - you can add the card illustration here */}
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

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create your{'\n'}Tangent account</Text>
          <Text style={styles.description}>
            Tangent is a powerful tool that allows you to easily{'\n'}send, receive, and track all your transactions.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logInButton} onPress={onLogIn}>
            <Text style={styles.logInButtonText}>Log in</Text>
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
    backgroundColor: "#1A1A1A",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingTop: 60,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.5,
    marginBottom: 16,
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
  signUpButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 12,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  logInButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 20,
  },
  logInButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  termsText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    lineHeight: 16,
  },
  linkText: {
    color: "rgba(255, 255, 255, 0.8)",
    textDecorationLine: "underline",
  },
}); 