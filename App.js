import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}