import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from "react-native";

interface SwipeableOnboardingProps {
  onFinish: () => void;
}

const { width } = Dimensions.get("window");

export default function SwipeableOnboarding({ onFinish }: SwipeableOnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onboardingData = [
    {
      title: "Pay with Crypto, Anywhere",
      subtitle: "Tap to pay at millions of stores worldwide.",
    },
    {
      title: "Fast. Simple. Secure.",
      subtitle: "Every purchase is instant and protected.",
    },
    {
      title: "Designed for Everyday Spending",
      subtitle: "Track all your payments in one clean view.",
    },
  ];

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const isLastScreen = currentIndex === onboardingData.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Swipeable content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {onboardingData.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom section with fixed positioning */}
        <View style={styles.bottomSection}>
          {/* Page indicator */}
          <View style={styles.pageIndicator}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>

          {/* Button placeholder/actual button */}
          <View style={styles.buttonContainer}>
            {isLastScreen ? (
              <TouchableOpacity style={styles.button} onPress={onFinish}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonPlaceholder} />
            )}
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
    paddingHorizontal: 24,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 24,
    right: 24,
    paddingBottom: 40,
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  activeDot: {
    backgroundColor: "white",
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
  },
  slide: {
    width: width - 48, // Account for horizontal padding
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  buttonContainer: {
    height: 48,
  },
  buttonPlaceholder: {
    height: 48,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});
