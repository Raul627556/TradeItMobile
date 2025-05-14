import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ajusta según los campos reales de tu backend
interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch('http://api.tradeit.es/api/authentication/me', {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                } else {
                    await AsyncStorage.removeItem('userToken');
                    setUser(null);
                }
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('userToken', token);

        try {
            const res = await fetch('http://api.tradeit.es/api/authentication/me', {
                headers: { Authorization: `Bearer ${token}` },
                credentials: 'include',
            });

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error al hacer login:', error);
            setUser(null);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
