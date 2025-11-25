import { API_ENDPOINTS } from '../config/api';
import type { Product } from '../types/product';
import type { Page, PageableParams } from '../types/page';

/**
 * Product filter parameters
 */
export interface ProductFilterParams extends PageableParams {
    search?: string;
    categoryId?: number;
}

/**
 * Product Service
 * Handles all product-related API calls
 */
class ProductService {
    /**
     * Get products with filters and pagination
     * @param params - Filter and pagination parameters
     * @returns Promise with paginated products
     */
    async getProducts(params?: ProductFilterParams): Promise<Page<Product>> {
        const queryParams = new URLSearchParams();

        if (params?.page !== undefined) {
            queryParams.append('page', params.page.toString());
        }

        if (params?.size !== undefined) {
            queryParams.append('size', params.size.toString());
        }

        if (params?.search) {
            queryParams.append('search', params.search);
        }

        if (params?.categoryId !== undefined) {
            queryParams.append('categoryId', params.categoryId.toString());
        }

        if (params?.sort) {
            queryParams.append('sort', params.sort);
        }

        const url = `${API_ENDPOINTS.PRODUCTS}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get product by ID
     * @param id - Product ID
     * @returns Promise with product details
     */
    async getProductById(id: number): Promise<Product> {
        const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Product not found');
            }
            throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        return response.json();
    }
}

export default new ProductService();
