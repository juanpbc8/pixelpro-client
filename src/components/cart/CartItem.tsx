import { useCart } from '../../hooks/useCart';
import type { CartItem as CartItemType } from '../../types/cart';
import { getFullImageUrl } from '../../config/api';

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const subtotal = item.product.price * item.quantity;

    const handleIncrease = () => {
        updateQuantity(item.product.id, item.quantity + 1);
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.product.id, item.quantity - 1);
        } else {
            removeFromCart(item.product.id);
        }
    };

    const handleRemove = () => {
        removeFromCart(item.product.id);
    };

    return (
        <div className="d-flex align-items-center justify-content-between border-bottom py-3">
            {/* Imagen y detalles del producto */}
            <div className="d-flex align-items-center">
                <img
                    src={getFullImageUrl(item.product.imageUrl)}
                    width="80"
                    className="me-3 rounded"
                    style={{ objectFit: 'cover', height: '80px' }}
                    alt={item.product.name}
                />
                <div className="flex-grow-1">
                    <strong>{item.product.name}</strong>
                    <br />

                    {/* Controles de cantidad */}
                    <div className="d-flex align-items-center mt-2">
                        <div className="input-group input-group-sm" style={{ width: '120px' }}>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleDecrease}
                            >
                                <i className="bi bi-dash"></i>
                            </button>
                            <input
                                type="text"
                                className="form-control text-center"
                                value={item.quantity}
                                readOnly
                                aria-label="Cantidad"
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleIncrease}
                            >
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                        <small className="text-muted ms-3">
                            Precio: S/.{item.product.price.toFixed(2)}
                        </small>
                    </div>
                </div>
            </div>

            {/* Subtotal y botón eliminar */}
            <div className="text-end">
                <strong className="d-block mb-2">S/.{subtotal.toFixed(2)}</strong>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={handleRemove}
                    title="Eliminar del carrito"
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}
