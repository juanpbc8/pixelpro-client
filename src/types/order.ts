/**
 * Order Types
 * Types for customer orders and order management
 * Based on Spring Boot API DTOs
 */

import type { CustomerProfile, Address } from './account';

export type OrderStatus =
    | 'PENDIENTE'
    | 'CONFIRMADO'
    | 'PREPARANDO'
    | 'ENVIADO'
    | 'ENTREGADO'
    | 'CANCELADO';

export type DeliveryType = 'A_DOMICILIO' | 'RECOJO_EN_TIENDA';

export type InvoiceType = 'BOLETA' | 'FACTURA';
export type InvoiceStatus = 'EMITIDO' | 'ANULADO';

export type PaymentMethod =
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'PAYPAL'
    | 'BANK_TRANSFER'
    | 'CASH';

export type PaymentStatus =
    | 'PENDING'
    | 'COMPLETED'
    | 'FAILED'
    | 'REFUNDED';

/**
 * Order Item (product in order)
 */
export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    productSku: string;
    productImageUrl: string;
    quantity: number;
    unitPrice: number;
}

/**
 * Invoice
 */
export interface Invoice {
    id: number;
    type: InvoiceType;
    serie: string;
    number: string;
    issuedAt: string;
    totalAmount: number;
    currency: string;
    status: InvoiceStatus;
    documentUrl?: string;
}

/**
 * Payment
 */
export interface Payment {
    id: number;
    amount: number;
    currency: string;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    paidAt?: string;
}

/**
 * Order (from GET /api/store/account/orders)
 */
export interface Order {
    id: number;
    code: string;
    status: OrderStatus;
    deliveryType: DeliveryType;
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    createdAt: string;
    updatedAt: string;
    customer: CustomerProfile;
    address?: Address;
    items: OrderItem[];
    invoice?: Invoice;
    payments: Payment[];
}
