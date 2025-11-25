import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

export default function Footer() {
    const { categories, loading } = useCategories();

    return (
        <footer className="bg-light pt-5">
            <div className="container">
                <div className="row">
                    {/* Ubicación */}
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold">Ubicación de tienda</h6>
                        <p className="mb-1">
                            Av. Tecnología 123, Lima
                            <br />
                            Perú
                        </p>
                        <p className="mb-1">info@PixelPro.com</p>
                        <p className="mb-1">+51 999 999 999</p>
                        <div className="mt-2">
                            <a href="#" className="text-dark me-2">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="text-dark me-2">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" className="text-dark me-2">
                                <i className="bi bi-youtube"></i>
                            </a>
                            <a href="#" className="text-dark">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>
                    </div>

                    {/* Tienda */}
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold">Tienda</h6>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/shop" className="text-dark text-decoration-none">
                                    Comprar todo
                                </Link>
                            </li>
                            {!loading && categories.slice(0, 6).map((category) => (
                                <li key={category.id}>
                                    <Link
                                        to={`/shop?category=${category.id}`}
                                        className="text-dark text-decoration-none"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Atención al cliente */}
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold">Atención al cliente</h6>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/faq" className="text-dark text-decoration-none">
                                    Preguntas frecuentes
                                </Link>
                            </li>
                            <li>
                                <Link to="/support" className="text-dark text-decoration-none">
                                    Asistencia
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-dark text-decoration-none">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link to="/claims" className="text-dark text-decoration-none">
                                    Libro de reclamaciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Política */}
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold">Política</h6>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/shipping" className="text-dark text-decoration-none">
                                    Envío y devoluciones
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-dark text-decoration-none">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li>
                                <Link to="/payment-methods" className="text-dark text-decoration-none">
                                    Métodos de pago
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-dark text-decoration-none">
                                    Política de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />

                {/* Métodos de pago */}
                <div className="text-center mb-3">
                    <p className="small">Aceptamos los siguientes métodos de pago</p>
                    <div className="d-flex justify-content-center gap-3">
                        <img
                            src="/assets/icons/icon-visa.webp"
                            alt="Visa"
                            className="img-fluid"
                            style={{ maxHeight: '40px' }}
                        />
                        <img
                            src="/assets/icons/icon-mastercard.webp"
                            alt="MasterCard"
                            className="img-fluid"
                            style={{ maxHeight: '40px' }}
                        />
                        <img
                            src="/assets/icons/icon-american-express.webp"
                            alt="American Express"
                            className="img-fluid"
                            style={{ maxHeight: '40px' }}
                        />
                        <img
                            src="/assets/icons/icon-yape.webp"
                            alt="Yape"
                            className="img-fluid"
                            style={{ maxHeight: '40px' }}
                        />
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pb-3">
                    <small>© 2025 Creado por PixelPro</small>
                </div>
            </div>
        </footer>
    );
}
