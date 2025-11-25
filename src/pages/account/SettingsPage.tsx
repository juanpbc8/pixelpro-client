import { useState } from 'react';
import AccountService from '../../services/account.service';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        promos: true,
        orders: true,
    });

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
        // TODO: Save notification preferences to backend
        alert(`Preferencia de notificaciones actualizada (${key})`);
    };

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Validar que las contraseñas coincidan
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar longitud mínima
        if (passwordData.newPassword.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        try {
            setSaving(true);
            await AccountService.changePassword({ password: passwordData.newPassword });
            setSuccessMessage('✓ Contraseña actualizada correctamente');
            setShowPasswordForm(false);
            setPasswordData({ newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al cambiar la contraseña';
            setError(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = () => {
        if (
            confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')
        ) {
            alert('Función de eliminar cuenta en desarrollo (requiere confirmación adicional)');
        }
    };

    return (
        <section id="configuracion">
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)}></button>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header">
                    <h3 className="h5 mb-0">
                        <i className="bi bi-gear me-2"></i>
                        Configuración de Cuenta
                    </h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        {/* Notificaciones */}
                        <div className="col-12 mb-4">
                            <h6 className="fw-semibold">Notificaciones</h6>
                            <div className="form-check form-switch mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="notifEmail"
                                    checked={notifications.email}
                                    onChange={() => handleNotificationChange('email')}
                                />
                                <label className="form-check-label" htmlFor="notifEmail">
                                    Recibir notificaciones por correo
                                </label>
                            </div>
                            <div className="form-check form-switch mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="notifPromos"
                                    checked={notifications.promos}
                                    onChange={() => handleNotificationChange('promos')}
                                />
                                <label className="form-check-label" htmlFor="notifPromos">
                                    Recibir promociones y ofertas
                                </label>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="notifPedidos"
                                    checked={notifications.orders}
                                    onChange={() => handleNotificationChange('orders')}
                                />
                                <label className="form-check-label" htmlFor="notifPedidos">
                                    Notificaciones de estado de pedidos
                                </label>
                            </div>
                        </div>

                        {/* Seguridad */}
                        <div className="col-12 mb-4">
                            <h6 className="fw-semibold">Seguridad</h6>

                            {!showPasswordForm ? (
                                <button
                                    className="btn btn-outline-warning mb-2 w-100"
                                    onClick={() => setShowPasswordForm(true)}
                                >
                                    <i className="bi bi-key me-2"></i>
                                    Cambiar Contraseña
                                </button>
                            ) : (
                                <form onSubmit={handleChangePassword} className="border rounded p-3 bg-light">
                                    <h6 className="mb-3">Cambiar Contraseña</h6>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">
                                            Nueva Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordInputChange}
                                            required
                                            minLength={8}
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirmar Nueva Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordInputChange}
                                            required
                                            minLength={8}
                                            placeholder="Repite la contraseña"
                                        />
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setShowPasswordForm(false);
                                                setPasswordData({ newPassword: '', confirmPassword: '' });
                                                setError(null);
                                            }}
                                            disabled={saving}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-warning"
                                            disabled={saving}
                                        >
                                            {saving ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-lg me-1"></i>
                                                    Actualizar Contraseña
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Zona de Peligro */}
                        <div className="col-12">
                            <h6 className="fw-semibold text-danger">Zona de Peligro</h6>
                            <button
                                className="btn btn-outline-danger w-100"
                                onClick={handleDeleteAccount}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Eliminar Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
