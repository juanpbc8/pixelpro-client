import { createContext } from 'react';
import type { User } from '../types/auth';

/**
 * Auth Context Type Definition
 */
export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

/**
 * Auth Context
 * Provides authentication state and methods
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
