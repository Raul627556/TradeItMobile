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
        country: '',
        age: '',
        photo: '',
        location: '',
        zipcode: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => setForm({ ...form, [key]: value });

    const handleRegister = async () => {
        const {
            name, email, country, age, photo,
            location, zipcode, username, password, confirmPassword
        } = form;

        const newErrors = {};
        if (!name) newErrors.name = true;
        if (!email) newErrors.email = true;
        if (!username) newErrors.username = true;
        if (!password) newErrors.password = true;
        if (!confirmPassword) newErrors.confirmPassword = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            showAlert('Error', 'Por favor completa los campos obligatorios marcados con *');
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('country', country);
            formData.append('age', age);
            formData.append('location', location);
            formData.append('zipcode', zipcode);
            formData.append('username', username);
            formData.append('password', password);
            if (photo) {
                const filename = photo.split('/').pop() ?? 'avatar.jpg';
                const match = /\.(\w+)$/.exec(filename);
                const ext = match?.[1]?.toLowerCase() || 'jpg';
                const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

                if (Platform.OS === 'web') {
                    const response = await fetch(photo);
                    const blob = await response.blob();
                    formData.append('photo', new File([blob], filename, { type: mimeType }));
                } else {
                    formData.append('photo', {
                        uri: photo,
                        name: filename,
                        type: mimeType,
                    });
                }
            }

            const res = await fetch(Endpoints.auth.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                        {[
                            { label: 'Nombre completo*', key: 'name' },
                            { label: 'Correo electrónico*', key: 'email' },
                            { label: 'Edad', key: 'age', keyboardType: 'numeric' },
                            { label: 'Localización', key: 'location' },
                            { label: 'Contraseña*', key: 'password', secure: true },
                        ].map(({ label, key, secure, keyboardType }) => (
                            <View key={key}>
                                <Text style={styles.label}>{label}</Text>
                                <TextInput
                                    style={[styles.input, errors[key] && styles.inputError]}
                                    placeholder={label}
                                    secureTextEntry={secure}
                                    keyboardType={keyboardType || 'default'}
                                    value={form[key]}
                                    onChangeText={(value) => handleChange(key, value)}
                                />
                            </View>
                        ))}
                    </View>

                    <View style={styles.formColumn}>
                        {[
                            { label: 'Nombre de usuario*', key: 'username' },
                            { label: 'País', key: 'country' },
                            { label: 'Código postal', key: 'zipcode' },
                            { label: 'Repetir contraseña*', key: 'confirmPassword', secure: true },
                        ].map(({ label, key, secure, keyboardType }) => (
                            <View key={key}>
                                <Text style={styles.label}>{label}</Text>
                                <TextInput
                                    style={[styles.input, errors[key] && styles.inputError]}
                                    placeholder={label}
                                    secureTextEntry={secure}
                                    keyboardType={keyboardType || 'default'}
                                    value={form[key]}
                                    onChangeText={(value) => handleChange(key, value)}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <Text style={styles.label}>Foto de perfil (opcional)</Text>
                {Platform.OS === 'web' ? (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            let file = event.target.files[0];
                            if (typeof file !== "undefined") {
                                handleChange('photo', file);
                            }
                        }}
                        style={{ marginBottom: 10 }}
                    />
                ) : (
                    <TouchableOpacity style={styles.imagePicker} onPress={async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            quality: 0.7,
                        });
                        if (!result.canceled) {
                            const uri = result.assets[0].uri;
                            handleChange('photo', uri);
                        }
                    }}>
                        <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
                    </TouchableOpacity>
                )}

                {form.photo ? (
                    <Image
                        source={{ uri: form.photo }}
                        style={styles.previewImage}
                    />
                ) : null}

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
