import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const errors = {
            email: '',
            password: '',
            confirmPassword: '',
        };

        let isValid = true;

        // Email validation
        if (!formData.email) {
            errors.email = 'El correo electrónico es requerido';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Por favor ingresa un correo electrónico válido';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
            isValid = false;
        } else if (formData.password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
            isValid = false;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Por favor confirma tu contraseña';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear validation error when user starts typing
        if (validationErrors[name as keyof typeof validationErrors]) {
            setValidationErrors((prev) => ({ ...prev, [name]: '' }));
        }

        // Clear general error
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            // Register user (auto-login)
            await register(formData.email, formData.password);

            // Redirect to home after successful registration
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la cuenta');
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4 p-4">
                        {/* Titulo */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold mb-2 pt-3">Crear Cuenta</h2>
                            <p className="text-muted">Completa tus datos para registrarte</p>
                        </div>

                        {/* General Error Alert */}
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
                                        className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                {validationErrors.email && (
                                    <div className="text-danger small mt-1">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {validationErrors.email}
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">
                                    Contraseña
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        placeholder="Mínimo 8 caracteres"
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
                                {validationErrors.password && (
                                    <div className="text-danger small mt-1">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {validationErrors.password}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                    Confirmar Contraseña
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className={`form-control ${validationErrors.confirmPassword ? 'is-invalid' : ''}`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Repite tu contraseña"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading}
                                    >
                                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                    </button>
                                </div>
                                {validationErrors.confirmPassword && (
                                    <div className="text-danger small mt-1">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {validationErrors.confirmPassword}
                                    </div>
                                )}
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
                                        Creando cuenta...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-plus me-2"></i>
                                        Crear Cuenta
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
                                    ¿Ya tienes cuenta?
                                </span>
                            </div>

                            {/* Login Link */}
                            <Link to="/auth/login" className="btn btn-outline-secondary w-100">
                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                Iniciar Sesión
                            </Link>
                        </form>

                        {/* Terms & Privacy */}
                        <p className="text-muted text-center mt-4 small">
                            Al crear una cuenta, aceptas nuestros{' '}
                            <a href="#" className="text-decoration-none">
                                Términos y Condiciones
                            </a>{' '}
                            y{' '}
                            <a href="#" className="text-decoration-none">
                                Políticas de Privacidad
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
