import { Slot, router } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { useEffect } from 'react';

export default function AuthenticatedLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/(tabs)/login');
    }
  }, [user]);

  return <Slot />;
}
