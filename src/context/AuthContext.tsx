import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    // Se ejecuta una sola vez al iniciar la app
    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) setUser(token);
        };
        loadUser();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('userToken', token);
        setUser(token);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
