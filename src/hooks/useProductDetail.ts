import { useState, useEffect } from 'react';
import ProductService from '../services/product.service';
import type { Product } from '../types/product';

interface UseProductDetailReturn {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook to fetch a single product by ID
 * @param id - Product ID
 * @returns product data, loading state, and error state
 */
export function useProductDetail(id: number | undefined): UseProductDetailReturn {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await ProductService.getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar el producto');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
}
