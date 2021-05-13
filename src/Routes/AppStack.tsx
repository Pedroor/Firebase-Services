import React from 'react';
import { Text, View } from 'react-native';
import { useAuthentication } from '../hooks/AuthProvider';
import FormButton from '../components/FormButton';

function AppStack() {
  const { user, logout } = useAuthentication();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logado com o usuário</Text>
      <Text>{user?.email}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
}

export default AppStack;
