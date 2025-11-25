/**
 * Authentication Types
 * Type definitions for authentication requests and responses
 */

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
    email: string;
    password: string;
}

/**
 * Authentication response from backend
 */
export interface AuthResponse {
    id: number;
    email: string;
    rol: string;
    authenticated: boolean;
    token: string;
}

/**
 * User information stored in context
 */
export interface User {
    id: number;
    email: string;
    rol: string;
}
