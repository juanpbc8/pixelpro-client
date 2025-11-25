import { useState, useEffect, useCallback } from 'react';
import ProductService from '../services/product.service';
import type { ProductFilterParams } from '../services/product.service';
import type { Product } from '../types/product';
import type { Page } from '../types/page';

interface UseProductsReturn {
    products: Product[];
    page: Page<Product> | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Custom hook to fetch products from API with filters and pagination
 * @param params - Filter and pagination parameters
 * @returns products array, page metadata, loading state, error state, and refetch function
 */
export function useProducts(params?: ProductFilterParams): UseProductsReturn {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<Page<Product> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await ProductService.getProducts(params);
            setProducts(response.content);
            setPage(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar productos');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }, [params?.page, params?.size, params?.search, params?.categoryId, params?.sort]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, page, loading, error, refetch: fetchProducts };
}
