import {router, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {AuthProvider, useAuth} from "@/src/context/AuthContext";

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { user } = useAuth();



    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>

            <Tabs.Screen
                name="home"
                options={{
                    title: 'home',
                    tabBarIcon: ({color}) => (
                        <IconSymbol size={28} name="person.3.fill" color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({color}) => (
                        <IconSymbol size={28} name="star.fill" color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="uploadProduct"
                options={{
                    title: 'product +',
                    tabBarIcon: ({color}) => (
                        <IconSymbol size={28} name="person.fill" color={color}/>
                    ),
                }}
            />

            <Tabs.Screen
                name="comunities"
                options={{
                    title: 'Comunities',
                    tabBarIcon: ({color}) => (
                        <IconSymbol size={28} name="person.3.fill" color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Login',
                    href: user ? null : undefined, // 👈 ocultar si está logueado
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="person.fill" color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    href: user ? undefined : null, // 👈 mostrar solo si está logueado
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="person.fill" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
