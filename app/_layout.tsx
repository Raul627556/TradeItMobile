import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevenir ocultar el splash automáticamente
SplashScreen.preventAutoHideAsync();

function LayoutWithAuth() {
  const { user, isLoading } = useAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  const hideSplash = useCallback(async () => {
    if (loaded && !isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  useEffect(() => {
    hideSplash();
  }, [hideSplash]);
  if (!loaded || isLoading) {
    return null; // o un <ActivityIndicator />
  }

  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LayoutWithAuth />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
