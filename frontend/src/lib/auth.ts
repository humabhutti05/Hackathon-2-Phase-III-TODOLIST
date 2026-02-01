import apiClient from './api-client';
import { AuthResponse } from '@/types';

export const auth = {
    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('access_token');
    },

    // Get current token
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('access_token');
    },

    // Login user
    login: async (email: string, password: string): Promise<void> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        localStorage.setItem('access_token', response.data.access_token);
    },

    // Signup user
    signup: async (email: string, password: string, name?: string): Promise<void> => {
        const response = await apiClient.post<AuthResponse>('/auth/signup', {
            email,
            password,
            name,
        });

        localStorage.setItem('access_token', response.data.access_token);
    },

    // Logout user
    logout: (): void => {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    },
};
