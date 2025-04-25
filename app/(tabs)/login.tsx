import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    
    const handleLogin = async () => {
        try {
            if (!username || !password) {
                return alert('Campos vacíos');
            }
            const res = await fetch('http://tradeit.com/api/authentication/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log('Response:', data);
            console.log(res.ok)
            if (res.ok) {
                alert('Inicio de sesión exitoso');
                await AsyncStorage.setItem('userToken', data.token);    // Guarda el token en AsyncStorage
                router.replace('/(authenticated)/home'); // Redirige a la pantalla de inicio después de iniciar sesión
            } else {
                Alert.alert('Error', data.message || 'Credenciales inválidas');
            }
        } catch (error) {
            Alert.alert('Error de conexión', error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});