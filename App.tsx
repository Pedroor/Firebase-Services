import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { AuthProvider, useAuthentication } from './src/hooks/AuthProvider';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Routes from './src/Routes/routes';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
