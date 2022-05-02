import React from 'react';
import MainNavigator from './NavigationContainer';
import 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
