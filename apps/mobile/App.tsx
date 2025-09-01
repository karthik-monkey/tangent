import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import SplashScreen from './onboarding/splash';
import SwipeableOnboarding from './onboarding/SwipeableOnboarding';
import CreateAccount from './onboarding/CreateAccount';
import ConnectWallet from './onboarding/ConnectWallet';
import ConnectWalletPost from './onboarding/ConnectWalletPost';
import PhoneNumber from './onboarding/Email';
import Login from './onboarding/Login';
import VerificationCode from './onboarding/VerificationCode';
import EmailAddress from './onboarding/Phone';
import PhoneVerification from './onboarding/PhoneVerification';

import PersonalInfo from './onboarding/PersonalInfo';
import KYCVerification from './onboarding/KYCVerification';
import PinSetup from './onboarding/PinSetup';
import PinConfirm from './onboarding/PinConfirm';
import WelcomeScreen from './onboarding/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './onboarding/loginpost';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userPin, setUserPin] = useState('');


  const handleSplashFinish = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingFinish = () => {
    setCurrentScreen('createAccount');
  };

  const handleSignUp = () => {
    setCurrentScreen('phoneNumber');
  };

  const handleLogIn = () => {
    setCurrentScreen('loginScreen');
  };

  const handleLoginNext = (email: string) => {
    // For login, we can skip straight to the home screen
    // In a real app, this would authenticate the user first
    setCurrentScreen('home');
  };

  const handlePhoneNext = (phoneNumber: string) => {
    setUserPhoneNumber(phoneNumber);
    setCurrentScreen('verificationCode');
  };

  const handleVerificationNext = (code: string) => {
    setCurrentScreen('emailAddress');
  };

  const handleEmailNext = (phoneNumber: string) => {
    setUserPhoneNumber(phoneNumber);
    setCurrentScreen('phoneVerification');
  };

  const handlePhoneVerificationNext = (code: string) => {
    setCurrentScreen('personalInfo');
  };



  const handlePersonalInfoNext = (personalInfo: any) => {
    setCurrentScreen('kycVerification');
  };

  const handleKYCNext = () => {
    setCurrentScreen('pinSetup');
  };

  const handlePinSetupNext = (pin: string) => {
    setUserPin(pin);
    setCurrentScreen('pinConfirm');
  };

  const handlePinConfirmNext = () => {
    console.log('PIN confirmed:', userPin);
    setCurrentScreen('connectWallet');
  };

  const handleWalletProceed = () => {
    setCurrentScreen('welcome');
  };

  const handleWelcomeContinue = () => {
    setCurrentScreen('home');
  };

  // Updated to use the post-onboarding connect wallet screen
  const handleAddWallet = () => {
    setCurrentScreen('connectWalletPost');
  };

  // Handler for post-onboarding wallet connection
  const handlePostWalletProceed = () => {
    // After connecting wallet from home, return to home
    setCurrentScreen('home');
  };

  // Handler for canceling post-onboarding wallet connection
  const handlePostWalletCancel = () => {
    // Return to home screen
    setCurrentScreen('home');
  };

  // Handler for signing out
  const handleSignOut = () => {
    setCurrentScreen('splash');
  };

  const handleProceed = () => {
    // Handle proceed with selected wallet
    console.log('Proceed with wallet');
  };

  const handleSkip = () => {
    // Handle skip wallet connection
    console.log('Skip wallet connection');
  };

  const handleBack = () => {
    // Simple back navigation logic
    switch (currentScreen) {

      case 'welcome':
        setCurrentScreen('connectWallet');
        break;
      case 'connectWallet':
        setCurrentScreen('pinConfirm');
        break;
      case 'pinConfirm':
        setCurrentScreen('pinSetup');
        break;
      case 'pinSetup':
        setCurrentScreen('kycVerification');
        break;
      case 'kycVerification':
        setCurrentScreen('personalInfo');
        break;
      case 'personalInfo':
        setCurrentScreen('phoneVerification');
        break;
      case 'phoneVerification':
        setCurrentScreen('emailAddress');
        break;
      case 'emailAddress':
        setCurrentScreen('verificationCode');
        break;
      case 'verificationCode':
        setCurrentScreen('phoneNumber');
        break;
      case 'phoneNumber':
        setCurrentScreen('createAccount');
        break;
      default:
        setCurrentScreen('createAccount');
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'onboarding':
        return <SwipeableOnboarding onFinish={handleOnboardingFinish} />;
      case 'createAccount':
        return <CreateAccount onSignUp={handleSignUp} onLogIn={handleLogIn} />;
      case 'loginScreen':
        return <Login onNext={handleLoginNext} onBack={handleBack} />;
      case 'phoneNumber':
        return <PhoneNumber onNext={handlePhoneNext} onBack={handleBack} />;
      case 'verificationCode':
        return <VerificationCode onNext={handleVerificationNext} onBack={handleBack} />;
      case 'emailAddress':
        return <EmailAddress onNext={handleEmailNext} onBack={handleBack} />;
      case 'phoneVerification':
        return <PhoneVerification onNext={handlePhoneVerificationNext} onBack={handleBack} phoneNumber={userPhoneNumber} />;
      case 'personalInfo':
        console.log('Rendering PersonalInfo screen');
        return <PersonalInfo onNext={handlePersonalInfoNext} onBack={handleBack} />;
      case 'kycVerification':
        return <KYCVerification onNext={handleKYCNext} onBack={handleBack} />;
      case 'pinSetup':
        return <PinSetup onNext={handlePinSetupNext} onBack={handleBack} />;
      case 'pinConfirm':
        return <PinConfirm onNext={handlePinConfirmNext} onBack={handleBack} originalPin={userPin} />;
      case 'welcome':
        return <WelcomeScreen onContinue={handleWelcomeContinue} />;
      case 'home':
        return <HomeScreen onAddWallet={handleAddWallet} onSignOut={handleSignOut} />;

      case 'connectWallet':
        return <ConnectWallet onProceed={handleWalletProceed} onSkip={handleSkip} onBack={handleBack} />;
      case 'connectWalletPost':
        return <ConnectWalletPost onProceed={handlePostWalletProceed} onCancel={handlePostWalletCancel} />;
      case 'login':
        return <OnboardingScreen />;
      default:
        return <SplashScreen onFinish={handleSplashFinish} />;
    }
  };

  return (
    <ConvexProvider client={convex}>
      {renderCurrentScreen()}
      <StatusBar style="light" />
    </ConvexProvider>
  );
}
