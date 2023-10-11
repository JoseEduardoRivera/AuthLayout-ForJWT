import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './App/Pages/Login';
import { RootNavigation } from "./src/navigation"
import { PaperProvider } from "react-native-paper"
import { AuthProvider } from "./src/context"

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </AuthProvider>
  );
}
