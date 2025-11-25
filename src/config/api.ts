/**
 * API Configuration
 * Centralized API endpoint configuration using environment variables
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/public';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    // Public Store Endpoints
    PRODUCTS: `${API_URL}/products`,
    CATEGORIES: `${API_URL}/categories`,
} as const;

/**
 * Helper to construct full image URLs
 * Backend returns relative paths (/uploads/...), this prepends the base URL
 * @param imageUrl - Image URL from API (can be relative or absolute)
 * @returns Full image URL
 */
export function getFullImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) {
        return '/placeholder-product.png'; // Fallback placeholder
    }

    // If already an absolute URL, return as-is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    // Prepend base URL for relative paths
    return `${API_BASE_URL}${imageUrl}`;
}
