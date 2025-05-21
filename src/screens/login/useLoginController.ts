import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Endpoints } from '@/src/constants/endpoints';

export function useLoginController() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useAuth();

    const handleLogin = async () => {
        try {
            if (!identifier || !password) {
                return Alert.alert('Error', 'Por favor completa todos los campos');
            }

            const payload = { identifier, password };

            const res = await fetch(Endpoints.auth.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.accessToken) {
                await login(data.accessToken);
            } else {
                Alert.alert('Error', data.error || 'Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error en login:', error);
            Alert.alert(
                'Error de conexión',
                error instanceof Error ? error.message : 'Error desconocido'
            );
        }
    };

    return {
        identifier,
        password,
        setIdentifier,
        setPassword,
        handleLogin,
        user,
    };
}
