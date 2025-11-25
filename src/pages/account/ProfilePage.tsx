import { useState, useEffect } from 'react';
import AccountService from '../../services/account.service';
import type { CustomerProfile, CustomerProfileUpdate, DocumentType } from '../../types/account';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [profile, setProfile] = useState<CustomerProfile | null>(null);

    // Estado del formulario
    const [formData, setFormData] = useState<CustomerProfileUpdate>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        documentType: 'DNI' as DocumentType,
        documentNumber: '',
    });

    // Cargar perfil del usuario al montar el componente
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await AccountService.getProfile();
            setProfile(data);
            setFormData({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                documentType: data.documentType,
                documentNumber: data.documentNumber,
            });
        } catch (err: any) {
            // Si es 404, significa que el usuario no tiene CustomerEntity creado
            if (err?.response?.status === 404 || err?.message?.includes('404')) {
                // Usuario nuevo sin perfil - mostrar formulario automáticamente
                setProfile(null);
                setIsEditing(true);
                console.log('Usuario nuevo detectado - mostrando formulario de perfil');
            } else {
                // Otro tipo de error
                setError('Error al cargar el perfil. Por favor intenta nuevamente.');
                console.error('Error loading profile:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            // Determinar si es creación o actualización
            const isNewUser = !profile || !profile.id;

            let resultProfile: CustomerProfile;
            if (isNewUser) {
                // Crear nuevo perfil
                resultProfile = await AccountService.createProfile(formData);
                setSuccessMessage('✓ Perfil creado correctamente');
            } else {
                // Actualizar perfil existente
                resultProfile = await AccountService.updateProfile(formData);
                setSuccessMessage('✓ Perfil actualizado correctamente');
            }

            setProfile(resultProfile);
            setIsEditing(false);

            // Ocultar mensaje después de 3 segundos
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al guardar el perfil';
            setError(errorMessage);
            console.error('Error saving profile:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                firstName: profile.firstName,
                lastName: profile.lastName,
                phoneNumber: profile.phoneNumber,
                documentType: profile.documentType,
                documentNumber: profile.documentNumber,
            });
        }
        setIsEditing(false);
        setError(null);
    };

    if (loading) {
        return (
            <section id="informacion-personal">
                <div className="card mb-4">
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3 text-muted">Cargando perfil...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="informacion-personal">
            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSuccessMessage(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            {/* Error Message - Solo mostrar si NO es un usuario nuevo sin perfil */}
            {error && profile !== null && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="h5 mb-0">
                        <i className="bi bi-person me-2"></i>
                        Información Personal
                    </h3>
                    {!isEditing && (
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setIsEditing(true)}
                        >
                            <i className="bi bi-pencil me-1"></i>
                            Editar
                        </button>
                    )}
                </div>
                <div className="card-body">
                    {/* Mensaje para usuarios nuevos sin perfil */}
                    {!profile && !isEditing && (
                        <div className="alert alert-info" role="alert">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>Completa tu perfil para realizar compras</strong>
                            <p className="mb-0 mt-2">Por favor completa tu información personal para poder gestionar tus pedidos y direcciones.</p>
                        </div>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label fw-semibold">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={60}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label fw-semibold">
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={60}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={profile?.email || ''}
                                        disabled
                                    />
                                    <small className="text-muted">
                                        El correo no se puede modificar
                                    </small>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="phoneNumber" className="form-label fw-semibold">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="999888777"
                                        required
                                        maxLength={9}
                                        minLength={9}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="documentType" className="form-label fw-semibold">
                                        Tipo de Documento
                                    </label>
                                    <select
                                        className="form-select"
                                        id="documentType"
                                        name="documentType"
                                        value={formData.documentType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                        <option value="PASAPORTE">Pasaporte</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="documentNumber" className="form-label fw-semibold">
                                        Número de Documento
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="documentNumber"
                                        name="documentNumber"
                                        value={formData.documentNumber}
                                        onChange={handleInputChange}
                                        placeholder="12345678"
                                        required
                                        maxLength={15}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-lg me-1"></i>
                                            Guardar Cambios
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-muted">Nombre Completo</label>
                                <p className="form-control-plaintext">
                                    {profile ? `${profile.firstName} ${profile.lastName}` : 'No especificado'}
                                </p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-muted">
                                    Correo Electrónico
                                </label>
                                <p className="form-control-plaintext">{profile?.email || 'No especificado'}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-muted">Teléfono</label>
                                <p className="form-control-plaintext">
                                    {profile?.phoneNumber || 'No especificado'}
                                </p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-muted">
                                    Tipo de Documento
                                </label>
                                <p className="form-control-plaintext">
                                    {profile?.documentType || 'No especificado'}
                                </p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-muted">Número de Documento</label>
                                <p className="form-control-plaintext">
                                    {profile?.documentNumber || 'No especificado'}
                                </p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-semibold text-muted">Tipo de Cliente</label>
                                <p className="form-control-plaintext">
                                    {profile?.customerType || 'No especificado'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
