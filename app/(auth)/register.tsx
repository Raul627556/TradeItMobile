import { useState } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Images } from '@/src/images';
import { Endpoints } from '@constants/endpoints';
import { Routes } from '@constants/routes';
import { showAlert } from '@/src/utils/alert';

export default function RegisterScreen() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => setForm({ ...form, [key]: value });

    const handleRegister = async () => {
        const { name, email, password } = form;

        const newErrors = {};
        if (!name) newErrors.name = true;
        if (!email) newErrors.email = true;
        if (!password) newErrors.password = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showAlert('Error', 'Por favor completa los campos obligatorios marcados con *');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('email', email.trim());
            formData.append('password', password);


            const res = await fetch('http://api.tradeit.es/api/authentication/register', {
                method: 'POST',
                headers: {
                    cors: 'no-cors',
                    // No pongas manualmente 'Content-Type' con FormData,
                    // fetch lo gestiona automáticamente incluyendo el boundary
                    // 'Content-Type': 'multipart/form-data' // <- ¡Quitar esto!
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert('Registro exitoso', 'Ya puedes iniciar sesión');
                router.replace(Routes.login);
            } else {
                Alert.alert('Error', data.message || 'No se pudo registrar');
            }
        } catch (err) {
            Alert.alert('Error de conexión', err instanceof Error ? err.message : 'Error desconocido');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.outerContainer}>
            <View style={styles.formContainer}>
                    <Image source={Images.logo} style={styles.logo} />
                    <Text style={styles.title}>Crear cuenta</Text>
                    <View style={Platform.OS === 'web' ? styles.formRow : {}}>
                        <View style={styles.formColumn}>
                            <View>
                                <Text style={styles.label}>Nombre completo*</Text>
                                <TextInput
                                    style={[styles.input, errors.name && styles.inputError]}
                                    placeholder="Nombre completo*"
                                    value={form.name}
                                    onChangeText={(value) => handleChange('name', value)}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>Correo electrónico*</Text>
                                <TextInput
                                    style={[styles.input, errors.email && styles.inputError]}
                                    placeholder="Correo electrónico*"
                                    value={form.email}
                                    onChangeText={(value) => handleChange('email', value)}
                                />
                            </View>

                            <View>
                                <Text style={styles.label}>Contraseña*</Text>
                                <TextInput
                                    style={[styles.input, errors.password && styles.inputError]}
                                    placeholder="Contraseña*"
                                    secureTextEntry={true}
                                    value={form.password}
                                    onChangeText={(value) => handleChange('password', value)}
                                />
                            </View>
                        </View>
                    </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                    <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(Routes.login)}>
                    <Text style={styles.createAccount}>¿Ya tienes cuenta? Inicia sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

import { styles } from '../../src/screens/Register.styles';
