/**
 * Category interface matching CategoryDto from backend API
 */
export interface Category {
    id: number;
    name: string;
    parentCategoryId: number | null;
    createdAt: string;
    updatedAt: string;
}
