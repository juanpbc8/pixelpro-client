import { useState, useEffect } from 'react';
import CategoryService from '../services/category.service';
import type { Category } from '../types/category';

interface UseCategoriesReturn {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook to fetch categories from API
 * @returns categories array, loading state, and error state
 */
export function useCategories(): UseCategoriesReturn {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await CategoryService.getAllCategories({ size: 100 });
                setCategories(response.content);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar categorías');
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}
