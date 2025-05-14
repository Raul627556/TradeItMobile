import { API_BASE_URL } from '@/src/config';

export const Endpoints = {
    auth: {
        login: `${API_BASE_URL}/authentication/login`,
        register: `${API_BASE_URL}/authentication/register`,
        refresh: `${API_BASE_URL}/authentication/refresh-token`,
        logout: `${API_BASE_URL}/authentication/logout`,
    },
    // Otros módulos:
    // user: { profile: ..., update: ... },
    // products: { list: ..., detail: ... },
};