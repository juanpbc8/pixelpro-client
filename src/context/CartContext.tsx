import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import type { CartItem, CartState } from '../types/cart';
import { CartContext } from './CartContextDefinition';
import type { CartContextType } from './CartContextDefinition';

const STORAGE_KEY = 'pixelpro_cart';

// Helper to calculate derived state
const calculateCartState = (items: CartItem[]): CartState => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        items,
        total: Math.round(total * 100) / 100, // Avoid floating point issues
        itemCount
    };
};

// Helper to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed.items || [];
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
    }
    return [];
};

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());

    // Sync to localStorage whenever items change
    useEffect(() => {
        try {
            const state = calculateCartState(items);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [items]);

    // Memoized action functions to prevent infinite loops
    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setItems(currentItems => {
            const existingItemIndex = currentItems.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex > -1) {
                // Item exists, increase quantity
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                return updatedItems;
            } else {
                // New item, add to cart
                return [...currentItems, { product, quantity }];
            }
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems(currentItems =>
            currentItems.filter(item => item.product.id !== productId)
        );
    }, []);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity < 1) {
            setItems(currentItems =>
                currentItems.filter(item => item.product.id !== productId)
            );
            return;
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    // Calculate derived state
    const state = useMemo(() => calculateCartState(items), [items]);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo<CartContextType>(() => ({
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }), [state, addToCart, removeFromCart, updateQuantity, clearCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
