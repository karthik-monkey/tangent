import React from 'react';
import { StatusBar } from 'expo-status-bar';
import OnboardingScreen from './onboarding/loginpost';

export default function App() {
  return (
    <>
      <OnboardingScreen />
      <StatusBar style="light" />
    </>
  );
}
