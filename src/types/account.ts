/**
 * Account Types
 * Types for customer profile, addresses, and account management
 * Based on Spring Boot API DTOs
 */

export type DocumentType = 'DNI' | 'RUC' | 'PASAPORTE';
export type CustomerType = 'NATURAL' | 'JURIDICA';
export type AddressType = 'DELIVERY' | 'BILLING';

/**
 * Customer Profile (from GET /api/store/account/profile)
 */
export interface CustomerProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    documentType: DocumentType;
    documentNumber: string;
    customerType: CustomerType;
    createdAt: string;
    updatedAt: string;
    addresses: Address[];
}

/**
 * Customer Profile Update (for PUT /api/store/account/profile)
 */
export interface CustomerProfileUpdate {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    documentType: DocumentType;
    documentNumber: string;
}

/**
 * Address (for GET/POST /api/store/account/addresses)
 */
export interface Address {
    id?: number;
    addressType: string;
    department: string;
    province: string;
    district: string;
    addressLine: string;
    addressReference: string;
    addressPhone: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Address Create (for POST /api/store/account/addresses)
 */
export interface AddressCreate {
    addressType: string;
    department: string;
    province: string;
    district: string;
    addressLine: string;
    addressReference: string;
    addressPhone: string;
}

/**
 * Password Change Request (for PATCH /api/store/account/password)
 */
export interface PasswordChangeRequest {
    password: string;
}
