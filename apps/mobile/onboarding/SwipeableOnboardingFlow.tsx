import React, { useState, useRef } from "react";
import { 
  View, 
  StyleSheet, 
  Dimensions, 
  ScrollView
} from "react-native";
import CreateAccount from './CreateAccount';
import ConnectWallet from './ConnectWallet';
import PhoneNumber from './Phone';
import VerificationCode from './VerificationCode';
import PhoneVerification from './PhoneVerification';
import EmailAddress from './Phone';
import PersonalInfo from './PersonalInfo';

const { width } = Dimensions.get('window');

interface SwipeableOnboardingFlowProps {
  onFinish: () => void;
}

export default function SwipeableOnboardingFlow({ onFinish }: SwipeableOnboardingFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Store form data as we navigate
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    personalInfo: null,
  });

  const screens = [
    'createAccount',
    'phoneNumber', 
    'phoneVerification',
    'emailAddress',
    'personalInfo',
    'connectWallet'
  ];

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== currentIndex) {
      console.log("SwipeableOnboardingFlow: handleScroll - changing from index", currentIndex, "to", index, "screen:", screens[index]);
      setCurrentIndex(index);
    }
  };

  const scrollToScreen = (index: number) => {
    if (index >= 0 && index < screens.length) {
      console.log("SwipeableOnboardingFlow: scrollToScreen called with index:", index, "screen:", screens[index]);
      scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleNext = (screenName: string, data?: any) => {
    const currentScreenIndex = screens.indexOf(screenName);
    if (currentScreenIndex < screens.length - 1) {
      // Store data if provided
      if (data) {
        setFormData(prev => ({ ...prev, [screenName]: data }));
      }
      
      // Navigate to next screen
      const nextIndex = currentScreenIndex + 1;
      scrollToScreen(nextIndex);
    } else {
      onFinish();
    }
  };

  const handleBack = (screenName: string) => {
    const currentScreenIndex = screens.indexOf(screenName);
    if (currentScreenIndex > 0) {
      const prevIndex = currentScreenIndex - 1;
      scrollToScreen(prevIndex);
    }
  };

  const handlePhoneNext = (phoneNumber: string) => {
    setUserPhoneNumber(phoneNumber);
    setFormData(prev => ({ ...prev, phoneNumber }));
    handleNext('phoneNumber', phoneNumber);
  };

  const handlePhoneVerificationNext = (code: string) => {
    handleNext('phoneVerification', code);
  };

  const handleEmailNext = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    handleNext('emailAddress', email);
  };



  const handlePersonalInfoNext = (personalInfo: any) => {
    setFormData(prev => ({ ...prev, personalInfo }));
    handleNext('personalInfo', personalInfo);
  };

  const handleProceed = () => {
    console.log('Proceed with wallet');
    onFinish();
  };

  const handleSkip = () => {
    console.log('Skip wallet connection');
    onFinish();
  };

  const renderScreen = (screenName: string, index: number) => {
    switch (screenName) {
      case 'createAccount':
        return (
          <View key={screenName} style={styles.screen}>
            <CreateAccount 
              onSignUp={() => handleNext('createAccount')} 
              onLogIn={() => handleNext('createAccount')} 
            />
          </View>
        );
      
      case 'phoneNumber':
        return (
          <View key={screenName} style={styles.screen}>
            <PhoneNumber 
              onNext={handlePhoneNext} 
              onBack={() => handleBack(screenName)} 
            />
          </View>
        );
      
      case 'phoneVerification':
        return (
          <View key={screenName} style={styles.screen}>
            <PhoneVerification 
              onNext={handlePhoneVerificationNext} 
              onBack={() => handleBack(screenName)} 
              phoneNumber={userPhoneNumber} 
            />
          </View>
        );
      
      case 'emailAddress':
        return (
          <View key={screenName} style={styles.screen}>
            <EmailAddress 
              onNext={handleEmailNext} 
              onBack={() => handleBack(screenName)} 
            />
          </View>
        );
      
      case 'personalInfo':
        return (
          <View key={screenName} style={styles.screen}>
            <PersonalInfo 
              onNext={handlePersonalInfoNext} 
              onBack={() => handleBack(screenName)} 
            />
          </View>
        );
      
      case 'connectWallet':
        return (
          <View key={screenName} style={styles.screen}>
            <ConnectWallet 
              onProceed={handleProceed} 
              onSkip={handleSkip} 
              onBack={() => handleBack(screenName)} 
            />
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="center"
        bounces={false}
        overScrollMode="never"
      >
        {screens.map((screenName, index) => renderScreen(screenName, index))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
  },
  screen: {
    width: width,
    flex: 1,
  },
});
