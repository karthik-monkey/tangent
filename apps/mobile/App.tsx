import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './onboarding/splash';
import Onboarding1 from './onboarding/onboarding1';
import Onboarding2 from './onboarding/onboarding2';
import Onboarding3 from './onboarding/onboarding3';
import OnboardingScreen from './onboarding/loginpost';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const handleSplashFinish = () => {
    setCurrentScreen('onboarding1');
  };

  const handleOnboarding1Next = () => {
    setCurrentScreen('onboarding2');
  };

  const handleOnboarding2Next = () => {
    setCurrentScreen('onboarding3');
  };

  const handleOnboarding3Finish = () => {
    setCurrentScreen('login');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'onboarding1':
        return <Onboarding1 onNext={handleOnboarding1Next} />;
      case 'onboarding2':
        return <Onboarding2 onNext={handleOnboarding2Next} />;
      case 'onboarding3':
        return <Onboarding3 onFinish={handleOnboarding3Finish} />;
      case 'login':
        return <OnboardingScreen />;
      default:
        return <SplashScreen onFinish={handleSplashFinish} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <StatusBar style="dark" />
    </>
  );
}
