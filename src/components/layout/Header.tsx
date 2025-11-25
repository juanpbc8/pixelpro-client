import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import ProductService from '../../services/product.service';
import { getFullImageUrl } from '../../config/api';
import type { Product } from '../../types/product';

export default function Header() {
    const navigate = useNavigate();
    const { categories, loading } = useCategories();
    const { itemCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [showCategories, setShowCategories] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Instant Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const searchMobileRef = useRef<HTMLDivElement>(null);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node) &&
                searchMobileRef.current &&
                !searchMobileRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search effect
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setSearchLoading(true);
        const debounceTimer = setTimeout(async () => {
            try {
                const response = await ProductService.getProducts({
                    search: searchTerm,
                    size: 5,
                    page: 0,
                });
                setSearchResults(response.content);
                setShowResults(true);
            } catch (error) {
                console.error('Error searching products:', error);
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            setShowResults(false);
        }
    };

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
        setSearchTerm('');
        setShowResults(false);
    };

    const handleViewAllResults = () => {
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            setShowResults(false);
        }
    };

    return (
        <header>
            {/* Barra superior */}
            <div className="bg-dark text-white py-2">
                <div className="container d-flex justify-content-center">
                    <i className="bi bi-truck me-2"></i> Envío gratis en pedidos superiores a S/200
                </div>
            </div>

            {/* Navbar principal */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
                <div className="container">
                    {/* Botón hamburguesa (solo visible en móvil) */}
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuCategorias"
                        aria-controls="menuCategorias"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-list fs-4"></i>
                    </button>

                    {/* Logo centrado en móvil, izquierda en desktop */}
                    <Link className="navbar-brand fw-bold fs-4 mx-auto mx-lg-0" to="/">
                        <img
                            src="/assets/icons/logo-pixelpro.webp"
                            alt="Logo PixelPro"
                            width="40"
                            height="40"
                            className="me-2"
                        />
                        PixelPro
                    </Link>

                    {/* Buscador (oculto en móvil, visible en desktop) */}
                    <div className="d-none d-lg-flex flex-grow-1 mx-4 position-relative" ref={searchRef}>
                        <form className="w-100" role="search" onSubmit={handleSearchSubmit}>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Buscar productos..."
                                    aria-label="Buscar"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => searchTerm && setShowResults(true)}
                                />
                                <button className="btn btn-outline-secondary" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>

                        {/* Search Results Dropdown */}
                        {showResults && (
                            <div
                                className="position-absolute w-100 bg-white shadow-lg rounded-bottom border"
                                style={{ top: '100%', zIndex: 1050, maxHeight: '400px', overflowY: 'auto' }}
                            >
                                {searchLoading ? (
                                    <div className="text-center py-3">
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Buscando...</span>
                                        </div>
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <>
                                        <ul className="list-group list-group-flush">
                                            {searchResults.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="list-group-item list-group-item-action"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleProductClick(product.id)}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={getFullImageUrl(product.imageUrl)}
                                                            alt={product.name}
                                                            className="rounded me-3"
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-0">{product.name}</h6>
                                                            <small className="text-muted">{product.category.name}</small>
                                                        </div>
                                                        <div className="text-end">
                                                            <strong className="text-primary">S/.{product.price.toFixed(2)}</strong>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="p-2 border-top bg-light text-center">
                                            <button
                                                className="btn btn-sm btn-link text-decoration-none"
                                                onClick={handleViewAllResults}
                                            >
                                                Ver todos los resultados <i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-3 text-muted">
                                        <i className="bi bi-search me-2"></i>
                                        No se encontraron productos
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Íconos usuario y carrito */}
                    <div className="d-flex align-items-center gap-4">
                        {/* User Menu / Login */}
                        <div className="dropdown">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        className="btn btn-link nav-link dropdown-toggle d-flex align-items-center gap-2"
                                        type="button"
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                                    >
                                        <i className="bi bi-person-circle fs-5"></i>
                                        <span className="d-none d-md-inline">{user?.email}</span>
                                    </button>
                                    <ul
                                        className={`dropdown-menu dropdown-menu-end ${showUserMenu ? 'show' : ''}`}
                                        style={{ zIndex: 2000 }}
                                    >
                                        <li>
                                            <span className="dropdown-item-text">
                                                <small className="text-muted">Bienvenido,</small>
                                                <br />
                                                <strong>{user?.email}</strong>
                                            </span>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link className="dropdown-item" to="/account/profile">
                                                <i className="bi bi-person me-2"></i>
                                                Mi Perfil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/account/orders">
                                                <i className="bi bi-bag me-2"></i>
                                                Mis Pedidos
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={() => {
                                                    logout();
                                                    navigate('/');
                                                }}
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <Link to="/auth/login" className="nav-link">
                                    <i className="bi bi-person fs-5"></i>
                                </Link>
                            )}
                        </div>

                        <Link to="/cart" className="nav-link position-relative">
                            <i className="bi bi-cart fs-5"></i>
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                            >
                                {itemCount}
                                <span className="visually-hidden">productos en carrito</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Buscador móvil (visible solo en móvil) */}
            <div className="d-lg-none bg-light py-3">
                <div
                    className="container d-flex justify-content-center align-items-center position-relative"
                    ref={searchMobileRef}
                >
                    <form className="w-100" role="search" style={{ maxWidth: '400px' }} onSubmit={handleSearchSubmit}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Buscar productos..."
                                aria-label="Buscar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => searchTerm && setShowResults(true)}
                            />
                            <button className="btn btn-outline-secondary" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>

                    {/* Mobile Search Results Dropdown */}
                    {showResults && (
                        <div
                            className="position-absolute bg-white shadow-lg rounded-bottom border"
                            style={{
                                top: '100%',
                                zIndex: 1050,
                                maxHeight: '400px',
                                overflowY: 'auto',
                                maxWidth: '400px',
                                width: '100%',
                            }}
                        >
                            {searchLoading ? (
                                <div className="text-center py-3">
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Buscando...</span>
                                    </div>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <>
                                    <ul className="list-group list-group-flush">
                                        {searchResults.map((product) => (
                                            <li
                                                key={product.id}
                                                className="list-group-item list-group-item-action"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleProductClick(product.id)}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={getFullImageUrl(product.imageUrl)}
                                                        alt={product.name}
                                                        className="rounded me-3"
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-0 small">{product.name}</h6>
                                                        <small className="text-muted">{product.category.name}</small>
                                                    </div>
                                                    <div className="text-end">
                                                        <strong className="text-primary small">S/.{product.price.toFixed(2)}</strong>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="p-2 border-top bg-light text-center">
                                        <button
                                            className="btn btn-sm btn-link text-decoration-none"
                                            onClick={handleViewAllResults}
                                        >
                                            Ver todos los resultados <i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-3 text-muted small">
                                    <i className="bi bi-search me-2"></i>
                                    No se encontraron productos
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Menú de categorías colapsable */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-0">
                <div className="container">
                    <div className="collapse navbar-collapse" id="menuCategorias">
                        <ul className="navbar-nav mx-auto">
                            {/* Inicio */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Inicio
                                </Link>
                            </li>

                            {/* Productos con dropdown dinámico */}
                            <li
                                className="nav-item dropdown position-relative"
                                onMouseEnter={() => setShowCategories(true)}
                                onMouseLeave={() => setShowCategories(false)}
                            >
                                <Link className="nav-link category-link dropdown-toggle" to="/shop">
                                    Productos
                                </Link>
                                <ul className={`dropdown-menu ${showCategories ? 'show' : ''}`}>
                                    <li>
                                        <Link className="dropdown-item" to="/shop">
                                            Todos los productos
                                        </Link>
                                    </li>
                                    {!loading && categories.map((category) => (
                                        <li key={category.id}>
                                            <Link className="dropdown-item" to={`/shop?category=${category.id}`}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Preguntas frecuentes */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/faq">
                                    Preguntas frecuentes
                                </Link>
                            </li>

                            {/* Términos y condiciones */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/terms">
                                    Términos y condiciones
                                </Link>
                            </li>

                            {/* Política de privacidad */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/privacy">
                                    Política de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
