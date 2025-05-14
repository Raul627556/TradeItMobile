import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AuthenticatedLayout() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/(tabs)/login'); // 🔐 Redirige si no hay usuario
    }
  }, [user, isLoading]);

  if (isLoading || (!user && !isLoading)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack />;
}
