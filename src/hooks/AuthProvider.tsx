import React, { createContext, ReactNode, useContext, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}
interface UserProps {
  email: string;
  password: string;
}
interface AuthProviderContextData {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  signIn: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthProviderContextData>(
  {} as AuthProviderContextData,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  async function signIn(email: string, password: string) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function register(email: string, password: string) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        register,
        signIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthentication() {
  const context = useContext(AuthContext);

  return context;
}
