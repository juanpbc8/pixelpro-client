import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextDefinition';
import type { AuthContextType } from '../context/AuthContextDefinition';

/**
 * Custom hook to access Auth Context
 * @throws Error if used outside AuthProvider
 * @returns AuthContextType
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
