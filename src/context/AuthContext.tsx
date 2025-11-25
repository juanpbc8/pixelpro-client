import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContextDefinition';
import type { AuthContextType } from './AuthContextDefinition';
import AuthService from '../services/auth.service';
import type { User } from '../types/auth';

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = AuthService.getUser();
                if (storedUser && storedUser.authenticated) {
                    setUser({
                        id: storedUser.id,
                        email: storedUser.email,
                        rol: storedUser.rol,
                    });
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await AuthService.login({ email, password });

            setUser({
                id: response.id,
                email: response.email,
                rol: response.rol,
            });
        } catch (error) {
            setLoading(false);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await AuthService.register({ email, password });

            // Auto-login after registration
            setUser({
                id: response.id,
                email: response.email,
                rol: response.rol,
            });
        } catch (error) {
            setLoading(false);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        AuthService.logout();
        setUser(null);
    }, []);

    const value = useMemo<AuthContextType>(
        () => ({
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout,
            loading,
        }),
        [user, login, register, logout, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
