import React, { createContext, ReactNode, useContext, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

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
  googleSignIn: () => void;
  facebookSignIn: () => void;
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

  async function googleSignIn() {
    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }

  async function facebookSignIn() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);
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
        googleSignIn,
        facebookSignIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthentication() {
  const context = useContext(AuthContext);

  return context;
}
