import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { AuthProvider, useAuthentication } from './src/hooks/AuthProvider';
import auth from '@react-native-firebase/auth';

interface User {
  email: string;
  password: string;
}
const App = () => {
  const { signIn, setUser } = useAuthentication();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: User) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange: (user:User)=>void);
  }, []);

  if (initializing) return null;

  return (
    <AuthProvider>
      <SafeAreaView style={styles.Container}>
        <Text>Olá Mundo</Text>
      </SafeAreaView>
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
