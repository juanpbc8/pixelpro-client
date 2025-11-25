/**
 * Generic Page interface for paginated API responses
 * Matches Spring Boot Page structure
 */
export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}

/**
 * Pageable request parameters
 */
export interface PageableParams {
    page?: number;
    size?: number;
    sort?: string;
}
