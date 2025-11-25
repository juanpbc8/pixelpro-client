import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { getFullImageUrl } from '../../config/api';
import type { Product } from '../../types/product';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, 1);

        // Reset button state after animation
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    return (
        <div className="producto" data-categoria={product.category.name.toLowerCase()}>
            <div className="card h-100 shadow-sm border-0">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <img
                        src={getFullImageUrl(product.imageUrl)}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                </Link>
                <div className="card-body text-center d-flex flex-column">
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                        <h6 className="card-title">{product.name}</h6>
                    </Link>
                    <p className="text-primary fw-bold mb-2">S/.{product.price.toFixed(2)}</p>
                    <div className="mt-auto d-flex gap-2">
                        <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-secondary flex-grow-1">
                            <i className="bi bi-eye me-1"></i>
                            Ver
                        </Link>
                        <button
                            className={`btn btn-sm flex-grow-1 ${isAdding ? 'btn-success' : 'btn-primary'}`}
                            onClick={handleAddToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? (
                                <>
                                    <i className="bi bi-check-circle me-1"></i>
                                    ✓
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-cart-plus me-1"></i>
                                    +
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
