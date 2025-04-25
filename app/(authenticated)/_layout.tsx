import { Slot, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthenticatedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  console.log("ASDASD")
  if (isAuthenticated === null) return null; // Puedes agregar un loading aquí
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Slot />;
}
