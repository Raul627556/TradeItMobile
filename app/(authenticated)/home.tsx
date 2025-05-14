import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from "@/src/context/AuthContext"; // usa tu propio hook

export default function HomeScreen() {
  const { logout } = useAuth(); // ✅ así accedes correctamente a logout

  const handleLogout = async () => {
    await logout(); // limpia AsyncStorage y contexto
    router.replace('/login'); // redirige
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido 👋</Text>
      <Text style={styles.subtitle}>Estás en la pantalla principal</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
