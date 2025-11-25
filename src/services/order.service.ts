/**
 * Order Service
 * Handles all API calls related to order creation and management
 */

import { API_BASE_URL } from '../config/api';
import type { Order } from '../types/order';
import type { CheckoutRequest } from '../types/checkout';
import AuthService from './auth.service';

class OrderService {
    private readonly baseUrl = `${API_BASE_URL}/api/store`;

    /**
     * Get authorization headers with JWT token
     */
    private getAuthHeaders(): HeadersInit {
        const token = AuthService.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
    }

    /**
     * Create a new order
     * POST /api/store/orders
     */
    async createOrder(data: CheckoutRequest): Promise<Order> {
        const response = await fetch(`${this.baseUrl}/orders`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json().catch(() => null);
                const message = errorData?.message || 'Datos de pedido inválidos. Por favor verifica la información.';
                throw new Error(message);
            }
            if (response.status === 404) {
                throw new Error('Producto no disponible o dirección no encontrada.');
            }
            if (response.status === 409) {
                throw new Error('Stock insuficiente para completar el pedido.');
            }
            throw new Error('Error al crear el pedido. Por favor intenta nuevamente.');
        }

        return response.json();
    }
}

export default new OrderService();
