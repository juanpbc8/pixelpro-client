import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProductDetail } from '../hooks/useProductDetail';
import { getFullImageUrl } from '../config/api';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Fetch product from API
    const { product, loading, error } = useProductDetail(Number(id));

    // Loading state
    if (loading) {
        return (
            <div className="container my-5">
                <div className="text-center py-5">
                    <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando producto...</span>
                    </div>
                    <p className="mt-3 text-muted">Cargando detalles del producto...</p>
                </div>
            </div>
        );
    }

    // Error or Product not found
    if (error || !product) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-3 fs-3"></i>
                    <div>
                        <h4 className="alert-heading">Producto no encontrado</h4>
                        <p className="mb-3">
                            {error || 'Lo sentimos, el producto que buscas no existe o ha sido eliminado.'}
                        </p>
                        <Link to="/shop" className="btn btn-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Volver a la tienda
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity);

        // Visual feedback
        setTimeout(() => {
            setIsAdding(false);
        }, 1500);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const getCategoryBadgeClass = (categoryName: string): string => {
        const badgeMap: Record<string, string> = {
            monitores: 'bg-primary',
            teclados: 'bg-success',
            ratones: 'bg-info',
            audifonos: 'bg-warning',
            graficas: 'bg-danger'
        };
        return badgeMap[categoryName.toLowerCase()] || 'bg-secondary';
    };

    return (
        <div className="container my-5">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/shop">Productos</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {product.name}
                    </li>
                </ol>
            </nav>

            {/* Product Detail */}
            <div className="row g-5">
                {/* Left Column: Image */}
                <div className="col-md-6">
                    <img
                        src={getFullImageUrl(product.imageUrl)}
                        alt={product.name}
                        className="img-fluid rounded shadow-lg"
                        style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
                    />
                </div>

                {/* Right Column: Product Info */}
                <div className="col-md-6">
                    {/* Category Badge */}
                    <span className={`badge ${getCategoryBadgeClass(product.category.name)} mb-3`}>
                        {product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)}
                    </span>

                    {/* Title */}
                    <h1 className="fw-bold mb-3">{product.name}</h1>

                    {/* Price */}
                    <h2 className="text-primary fw-bold mb-4">
                        S/.{product.price.toFixed(2)}
                    </h2>

                    {/* Description */}
                    <p className="lead mb-4">{product.description}</p>

                    {/* Divider */}
                    <hr className="my-4" />

                    {/* Quantity Selector */}
                    <div className="mb-4">
                        <label htmlFor="quantity" className="form-label fw-semibold">
                            Cantidad
                        </label>
                        <div className="input-group" style={{ maxWidth: '150px' }}>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <i className="bi bi-dash"></i>
                            </button>
                            <input
                                type="number"
                                className="form-control text-center"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-3">
                        <button
                            className={`btn btn-lg ${isAdding ? 'btn-success' : 'btn-primary'}`}
                            onClick={handleAddToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? (
                                <>
                                    <i className="bi bi-check-circle me-2"></i>
                                    ¡Agregado al carrito!
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-cart-plus me-2"></i>
                                    Agregar al carrito
                                </>
                            )}
                        </button>

                        <button
                            className="btn btn-lg btn-success"
                            onClick={handleBuyNow}
                        >
                            <i className="bi bi-lightning-fill me-2"></i>
                            Comprar ahora
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-5">
                        <h5 className="fw-bold mb-3">Información adicional</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <i className="bi bi-truck text-primary me-2"></i>
                                Envío gratis en pedidos mayores a S/.200
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-shield-check text-success me-2"></i>
                                Garantía de 12 meses
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-arrow-return-left text-info me-2"></i>
                                30 días para devoluciones
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Back to Shop Button */}
            <div className="text-center mt-5">
                <Link to="/shop" className="btn btn-outline-secondary btn-lg">
                    <i className="bi bi-arrow-left me-2"></i>
                    Seguir comprando
                </Link>
            </div>
        </div>
    );
}
