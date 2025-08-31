import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './onboarding/splash';
import SwipeableOnboarding from './onboarding/SwipeableOnboarding';
import CreateAccount from './onboarding/CreateAccount';
import ConnectWallet from './onboarding/ConnectWallet';
import PhoneNumber from './onboarding/Email';
import VerificationCode from './onboarding/VerificationCode';
import EmailAddress from './onboarding/Phone';
import PhoneVerification from './onboarding/PhoneVerification';
import HomeAddress from './onboarding/HomeAddress';
import PersonalInfo from './onboarding/PersonalInfo';
import KYCVerification from './onboarding/KYCVerification';
import OnboardingScreen from './onboarding/loginpost';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

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
    setCurrentScreen('phoneNumber');
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
    setCurrentScreen('homeAddress');
  };

  const handleAddressNext = (address: any) => {
    console.log('Navigating to personalInfo screen');
    setCurrentScreen('personalInfo');
  };

  const handlePersonalInfoNext = (personalInfo: any) => {
    setCurrentScreen('kycVerification');
  };

  const handleKYCNext = () => {
    setCurrentScreen('connectWallet');
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
      case 'connectWallet':
        setCurrentScreen('kycVerification');
        break;
      case 'kycVerification':
        setCurrentScreen('personalInfo');
        break;
      case 'personalInfo':
        setCurrentScreen('homeAddress');
        break;
      case 'homeAddress':
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
      case 'phoneNumber':
        return <PhoneNumber onNext={handlePhoneNext} onBack={handleBack} />;
      case 'verificationCode':
        return <VerificationCode onNext={handleVerificationNext} onBack={handleBack} />;
      case 'emailAddress':
        return <EmailAddress onNext={handleEmailNext} onBack={handleBack} />;
      case 'phoneVerification':
        return <PhoneVerification onNext={handlePhoneVerificationNext} onBack={handleBack} phoneNumber={userPhoneNumber} />;
      case 'homeAddress':
        return <HomeAddress onNext={handleAddressNext} onBack={handleBack} />;
      case 'personalInfo':
        console.log('Rendering PersonalInfo screen');
        return <PersonalInfo onNext={handlePersonalInfoNext} onBack={handleBack} />;
      case 'kycVerification':
        return <KYCVerification onNext={handleKYCNext} onBack={handleBack} />;
      case 'connectWallet':
        return <ConnectWallet onProceed={handleProceed} onSkip={handleSkip} onBack={handleBack} />;
      case 'login':
        return <OnboardingScreen />;
      default:
        return <SplashScreen onFinish={handleSplashFinish} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <StatusBar style="light" />
    </>
  );
}
