import { useState } from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, Platform,} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images } from '@/src/images';

export default function LoginScreen() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            if (!identifier || !password) {
                return Alert.alert('Error', 'Por favor completa todos los campos');
            }

            const payload = { identifier, password };

            const res = await fetch(
                'http://api.tradeit.es/api/authentication/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',               // <-- para que el navegador/app guarde la cookie HttpOnly
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();

            if (res.ok) {
                // El servidor devuelve { message, accessToken }
                await AsyncStorage.setItem('userToken', data.accessToken);
                Alert.alert('¡Éxito!', data.message || 'Inicio de sesión correcto');
                router.replace('/(authenticated)/home');
            } else {
                // El servidor devuelve { error: '...' }
                Alert.alert('Error', data.error || 'Credenciales inválidas');
            }
        } catch (error) {
            Alert.alert(
                'Error de conexión',
                error instanceof Error ? error.message : 'Error desconocido'
            );
        }
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.formContainer}>
                <Image source={Images.logo} style={styles.logo} />

                <Text style={styles.label}>Usuario o Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa usuario o correo electrónico"
                    keyboardType={identifier.includes('@') ? 'email-address' : 'default'}
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                />

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.createAccount}>Crear cuenta</Text>
                </TouchableOpacity>

                <Text style={styles.terms}>
                    Al continuar aceptas nuestros Términos y Condiciones y Política de
                    Privacidad.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    formContainer: {
        width: Platform.OS === 'web' ? '50%' : '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
        alignSelf: 'center',
    },
    label: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#FF4B00',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    createAccount: {
        color: '#FF4B00',
        fontWeight: '600',
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
    },
    terms: {
        color: '#555',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
    },
});
