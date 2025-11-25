import type { Category } from './category';

/**
 * Product Status enum matching backend
 */
export type ProductStatus = 'ACTIVO' | 'INACTIVO';

/**
 * Product interface matching ProductDto from backend API
 */
export interface Product {
    id: number;
    sku: string;
    name: string;
    model: string;
    description: string;
    price: number;
    imageUrl: string;
    status: ProductStatus;
    qtyStock: number;
    category: Category;
    createdAt: string;
    updatedAt: string;
}
