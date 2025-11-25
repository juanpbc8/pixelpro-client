/**
 * Account Service
 * Handles all API calls related to customer account management
 */

import { API_BASE_URL } from '../config/api';
import type { CustomerProfile, CustomerProfileUpdate, Address, AddressCreate, PasswordChangeRequest } from '../types/account';
import type { Order, OrderStatus } from '../types/order';
import type { Page } from '../types/page';
import AuthService from './auth.service';

class AccountService {
    private readonly baseUrl = `${API_BASE_URL}/api/store/account`;

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
     * Get customer profile
     * GET /api/store/account/profile
     */
    async getProfile(): Promise<CustomerProfile> {
        const response = await fetch(`${this.baseUrl}/profile`, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener el perfil');
        }

        return response.json();
    }

    /**
     * Create customer profile (for new users)
     * POST /api/store/account/profile
     */
    async createProfile(data: CustomerProfileUpdate): Promise<CustomerProfile> {
        const response = await fetch(`${this.baseUrl}/profile`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos inválidos. Por favor verifica la información.');
            }
            if (response.status === 409) {
                throw new Error('El perfil ya existe. Intenta actualizar en su lugar.');
            }
            throw new Error('Error al crear el perfil');
        }

        return response.json();
    }

    /**
     * Update customer profile
     * PUT /api/store/account/profile
     */
    async updateProfile(data: CustomerProfileUpdate): Promise<CustomerProfile> {
        const response = await fetch(`${this.baseUrl}/profile`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos inválidos. Por favor verifica la información.');
            }
            throw new Error('Error al actualizar el perfil');
        }

        return response.json();
    }

    /**
     * Get all addresses for the customer
     * GET /api/store/account/addresses
     */
    async getAddresses(): Promise<Address[]> {
        const response = await fetch(`${this.baseUrl}/addresses`, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener las direcciones');
        }

        return response.json();
    }

    /**
     * Add new address
     * POST /api/store/account/addresses
     */
    async addAddress(data: AddressCreate): Promise<Address> {
        const response = await fetch(`${this.baseUrl}/addresses`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de dirección inválidos');
            }
            throw new Error('Error al agregar la dirección');
        }

        return response.json();
    }

    /**
     * Delete address
     * DELETE /api/store/account/addresses/{id}
     */
    async deleteAddress(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/addresses/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Dirección no encontrada');
            }
            throw new Error('Error al eliminar la dirección');
        }
    }

    /**
     * Change password
     * PATCH /api/store/account/password
     */
    async changePassword(data: PasswordChangeRequest): Promise<void> {
        const response = await fetch(`${this.baseUrl}/password`, {
            method: 'PATCH',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Contraseña inválida. Debe tener al menos 8 caracteres.');
            }
            throw new Error('Error al cambiar la contraseña');
        }
    }

    /**
     * Get customer orders with pagination
     * GET /api/store/account/orders
     */
    async getMyOrders(page: number = 0, size: number = 10, status?: OrderStatus): Promise<Page<Order>> {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });

        if (status) {
            params.append('status', status);
        }

        const response = await fetch(`${this.baseUrl}/orders?${params}`, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
        }

        return response.json();
    }

    /**
     * Get order detail by ID
     * GET /api/store/account/orders/{id}
     */
    async getOrderById(id: number): Promise<Order> {
        const response = await fetch(`${this.baseUrl}/orders/${id}`, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Pedido no encontrado');
            }
            throw new Error('Error al obtener el detalle del pedido');
        }

        return response.json();
    }
}

export default new AccountService();
