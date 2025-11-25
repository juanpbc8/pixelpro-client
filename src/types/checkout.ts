/**
 * Checkout Types
 * Types for checkout process and order creation
 */

import type { DeliveryType } from './order';

/**
 * Payment methods supported by the backend
 * Based on Spring Boot API enums
 */
export type PaymentMethod = 'TARJETA' | 'YAPE' | 'PLIN' | 'PAGO_EFECTIVO';

/**
 * Checkout Request DTO
 * Data sent to POST /api/store/orders
 */
export interface CheckoutRequest {
    addressId: number | null;
    deliveryType: DeliveryType;
    paymentMethod: PaymentMethod;
    items: Array<{
        productId: number;
        quantity: number;
    }>;
}

/**
 * Legacy form interface (kept for backward compatibility)
 * @deprecated Use CheckoutRequest for API calls
 */
export interface CheckoutForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    documentNumber: string;
    address: string;
    department: string;
    province: string;
    district: string;
    paymentMethod: string;
}

/**
 * Order Summary for localStorage and ThankYouPage display
 */
export interface OrderSummary {
    orderId: string;
    customerName: string;
    items: Array<{
        id: number;
        nombre: string;
        precio: number;
        quantity: number;
    }>;
    subtotal: number;
    shipping: number;
    total: number;
    timestamp: string;
}
