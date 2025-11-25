import { API_ENDPOINTS } from '../config/api';
import type { Category } from '../types/category';
import type { Page, PageableParams } from '../types/page';

/**
 * Category Service
 * Handles all category-related API calls
 */
class CategoryService {
    /**
     * Get all categories with pagination
     * @param params - Pagination parameters (page, size)
     * @returns Promise with paginated categories
     */
    async getAllCategories(params?: PageableParams): Promise<Page<Category>> {
        const queryParams = new URLSearchParams();

        if (params?.page !== undefined) {
            queryParams.append('page', params.page.toString());
        }

        if (params?.size !== undefined) {
            queryParams.append('size', params.size.toString());
        } else {
            // Default to large size to get all categories
            queryParams.append('size', '100');
        }

        const url = `${API_ENDPOINTS.CATEGORIES}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get category by ID
     * @param id - Category ID
     * @returns Promise with category details
     */
    async getCategoryById(id: number): Promise<Category> {
        const response = await fetch(`${API_ENDPOINTS.CATEGORIES}/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch category: ${response.statusText}`);
        }

        return response.json();
    }
}

export default new CategoryService();
