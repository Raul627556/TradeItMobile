import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Images } from '@/src/images';
import styles from '../../src/screens/login/LoginScreenStyles';


import { useLoginController } from '@/src/screens/login/useLoginController';

export default function LoginScreen() {
    const {
        identifier,
        password,
        setIdentifier,
        setPassword,
        handleLogin,
        user
    } = useLoginController();

    // Redirige si ya hay usuario
    if (user) {
        router.replace('/(authenticated)/home');
        return null;
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.formContainer}>
                <Image source={Images.logo} style={styles.logo} />

                <Text style={styles.label}>PERFIIIIL o Email</Text>
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
                    Al continuar aceptas nuestros Términos y Condiciones y Política de Privacidad.
                </Text>
            </View>
        </View>
    );
}
