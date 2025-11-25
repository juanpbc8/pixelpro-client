import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await login(formData.email, formData.password);

            // Redirect to the page user came from, or home
            const from = (location.state)?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4 p-4">
                        {/* Titulo */}
                        <div className="text-center mb-4 pt-2">
                            <h2 className="fw-bold mb-2">Iniciar Sesión</h2>
                            <p className="text-muted">Ingresa tus credenciales para continuar</p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                <div>{error}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">
                                    Correo Electrónico
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Contraseña
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Tu contraseña"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Recordarme
                                    </label>
                                </div>
                                <a href="#" className="text-decoration-none small">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 mb-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Iniciar Sesión
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="position-relative my-4">
                                <hr />
                                <span
                                    className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted"
                                    style={{ fontSize: '0.875rem' }}
                                >
                                    ¿No tienes cuenta?
                                </span>
                            </div>

                            {/* Register Link */}
                            <Link to="/auth/register" className="btn btn-outline-secondary w-100">
                                <i className="bi bi-person-plus me-2"></i>
                                Crear Cuenta
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
