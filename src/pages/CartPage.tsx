import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import CartItem from '../components/cart/CartItem';

export default function CartPage() {
    const navigate = useNavigate();
    const { items, total, itemCount } = useCart();
    const { isAuthenticated } = useAuth();
    const [showAuthAlert, setShowAuthAlert] = useState(false);

    const handleCheckout = () => {
        if (isAuthenticated) {
            navigate('/checkout');
        } else {
            setShowAuthAlert(true);
            // Auto-hide alert and navigate to login after 2 seconds
            setTimeout(() => {
                setShowAuthAlert(false);
                navigate('/auth/login', { state: { from: { pathname: '/checkout' } } });
            }, 2000);
        }
    };

    return (
        <main className="container my-5">
            <h2 className="mb-4 text-center fw-bold">Tu carrito de compras</h2>

            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Empty State */}
                    {items.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-cart-x display-1 text-muted"></i>
                            <p className="mt-3 text-muted">Tu carrito está vacío</p>
                            <Link to="/shop" className="btn btn-primary mt-3">
                                <i className="bi bi-shop me-2"></i>
                                Ir a la tienda
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Cart Items List */}
                            <div className="mb-4">
                                {items.map((item) => (
                                    <CartItem key={item.product.id} item={item} />
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="text-end mt-4 pt-3 border-top">
                                {/* Auth Alert */}
                                {showAuthAlert && (
                                    <div className="alert alert-warning alert-dismissible fade show mb-3" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        Debes iniciar sesión para continuar con la compra. Redirigiendo...
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowAuthAlert(false)}
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                )}

                                <div className="mb-2">
                                    <span className="text-muted">
                                        Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'}):
                                    </span>
                                    <strong className="ms-2">S/.{total.toFixed(2)}</strong>
                                </div>
                                <h4 className="fw-bold mb-3">
                                    Total: <span className="text-primary">S/.{total.toFixed(2)}</span>
                                </h4>
                                <button
                                    onClick={handleCheckout}
                                    className="btn btn-success btn-lg"
                                >
                                    <i className="bi bi-credit-card me-2"></i>
                                    Proceder al pago
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Continue Shopping Button */}
            {items.length > 0 && (
                <div className="text-center mt-4">
                    <Link to="/shop" className="btn btn-outline-primary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Seguir comprando
                    </Link>
                </div>
            )}
        </main>
    );
}
