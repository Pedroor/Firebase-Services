import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAuthentication } from '../hooks/AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const { user, setUser } = useAuthentication();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      userState !== null ? setUser(userState) : '';
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
