import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './onboarding/splash';
import SwipeableOnboarding from './onboarding/SwipeableOnboarding';
import CreateAccount from './onboarding/CreateAccount';
import OnboardingScreen from './onboarding/loginpost';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const handleSplashFinish = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingFinish = () => {
    setCurrentScreen('createAccount');
  };

  const handleSignUp = () => {
    // Handle sign up logic
    console.log('Sign up pressed');
  };

  const handleLogIn = () => {
    // Handle log in logic
    console.log('Log in pressed');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'onboarding':
        return <SwipeableOnboarding onFinish={handleOnboardingFinish} />;
      case 'createAccount':
        return <CreateAccount onSignUp={handleSignUp} onLogIn={handleLogIn} />;
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
