import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

/**
 * API Base URL for Authentication
 */
const AUTH_API_URL = import.meta.env.VITE_API_URL?.replace('/public', '') || 'http://localhost:8080/api';

const AUTH_ENDPOINTS = {
    LOGIN: `${AUTH_API_URL}/auth/login`,
    REGISTER: `${AUTH_API_URL}/auth/register`,
    ME: `${AUTH_API_URL}/auth/me`,
} as const;

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthService {
    private readonly TOKEN_KEY = 'pixelpro_auth_token';
    private readonly USER_KEY = 'pixelpro_user';

    /**
     * Login user
     * @param credentials - Login credentials
     * @returns Promise with auth response
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Credenciales inválidas. Por favor verifica tu email y contraseña.');
            }
            throw new Error('Error al iniciar sesión. Por favor intenta de nuevo.');
        }

        const data: AuthResponse = await response.json();

        // Save token and user info
        this.saveAuthData(data);

        return data;
    }

    /**
     * Register new user (Customer)
     * @param userData - Registration data
     * @returns Promise with auth response (auto-login)
     */
    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Este email ya está registrado. Por favor intenta con otro email.');
            }
            if (response.status === 400) {
                throw new Error('Datos inválidos. Verifica que el email sea válido y la contraseña tenga al menos 8 caracteres.');
            }
            throw new Error('Error al crear la cuenta. Por favor intenta de nuevo.');
        }

        const data: AuthResponse = await response.json();

        // Auto-login: Save token and user info
        this.saveAuthData(data);

        return data;
    }

    /**
     * Get current user info from token
     * @returns Promise with auth response
     */
    async getCurrentUser(): Promise<AuthResponse | null> {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        try {
            const response = await fetch(AUTH_ENDPOINTS.ME, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                this.logout();
                return null;
            }

            return response.json();
        } catch (error) {
            console.error('Error fetching current user:', error);
            this.logout();
            return null;
        }
    }

    /**
     * Logout user
     */
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    /**
     * Get stored token
     */
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    /**
     * Get stored user info
     */
    getUser(): AuthResponse | null {
        const userStr = localStorage.getItem(this.USER_KEY);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    /**
     * Save authentication data to localStorage
     * @param data - Auth response data
     */
    private saveAuthData(data: AuthResponse): void {
        localStorage.setItem(this.TOKEN_KEY, data.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(data));
    }
}

export default new AuthService();
