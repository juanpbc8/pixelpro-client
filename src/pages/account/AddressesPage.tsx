import { useState, useEffect } from 'react';
import AccountService from '../../services/account.service';
import type { Address, AddressCreate } from '../../types/account';

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<AddressCreate>({
        addressType: 'Casa',
        department: '',
        province: '',
        district: '',
        addressLine: '',
        addressReference: '',
        addressPhone: '',
    });

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await AccountService.getAddresses();
            setAddresses(data);
        } catch (err: any) {
            // Si es 404, significa que el usuario no tiene CustomerEntity o direcciones
            if (err?.response?.status === 404 || err?.message?.includes('404')) {
                // Usuario nuevo o sin direcciones - no mostrar error
                setAddresses([]);
                console.log('Usuario sin direcciones registradas');
            } else {
                setError('Error al cargar las direcciones');
                console.error('Error loading addresses:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);
            await AccountService.addAddress(formData);
            setSuccessMessage('✓ Dirección agregada correctamente');
            setShowForm(false);
            setFormData({
                addressType: 'Casa',
                department: '',
                province: '',
                district: '',
                addressLine: '',
                addressReference: '',
                addressPhone: '',
            });
            await loadAddresses();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al agregar dirección';
            setError(errorMessage);
        } finally {
            setSaving(false);
        }
    };



    if (loading) {
        return (
            <section id="direcciones">
                <div className="card mb-4">
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3 text-muted">Cargando direcciones...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="direcciones">
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)}></button>
                </div>
            )}

            {/* Solo mostrar error si es un error real, no cuando simplemente no hay direcciones */}
            {error && addresses.length > 0 && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="h5 mb-0">
                        <i className="bi bi-geo-alt me-2"></i>
                        Mis Direcciones
                    </h3>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <i className={`bi bi-${showForm ? 'x' : 'plus-circle'} me-1`}></i>
                        {showForm ? 'Cancelar' : 'Agregar Dirección'}
                    </button>
                </div>
                <div className="card-body">
                    {/* Form to add address */}
                    {showForm && (
                        <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
                            <h6 className="mb-3">Nueva Dirección</h6>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="addressType" className="form-label">Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addressType"
                                        name="addressType"
                                        value={formData.addressType}
                                        onChange={handleInputChange}
                                        placeholder="Casa, Oficina..."
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="department" className="form-label">Departamento</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        placeholder="Lima"
                                        required
                                        maxLength={100}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="province" className="form-label">Provincia</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="province"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        placeholder="Lima"
                                        required
                                        maxLength={100}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="district" className="form-label">Distrito</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        placeholder="Miraflores"
                                        required
                                        maxLength={100}
                                    />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="addressLine" className="form-label">Dirección</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addressLine"
                                        name="addressLine"
                                        value={formData.addressLine}
                                        onChange={handleInputChange}
                                        placeholder="Av. Larco 1234"
                                        required
                                        maxLength={255}
                                    />
                                </div>
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="addressReference" className="form-label">Referencia</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addressReference"
                                        name="addressReference"
                                        value={formData.addressReference}
                                        onChange={handleInputChange}
                                        placeholder="Al frente del parque"
                                        maxLength={255}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="addressPhone" className="form-label">Teléfono</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="addressPhone"
                                        name="addressPhone"
                                        value={formData.addressPhone}
                                        onChange={handleInputChange}
                                        placeholder="999888777"
                                        required
                                        maxLength={9}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving ? 'Guardando...' : 'Guardar Dirección'}
                            </button>
                        </form>
                    )}

                    {/* List of addresses */}
                    <div id="listaDirecciones">
                        {addresses.length === 0 ? (
                            <div className="text-center text-muted py-5">
                                <i className="bi bi-house-add fs-1 mb-3 d-block"></i>
                                <p className="mb-3">No tienes direcciones guardadas</p>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setShowForm(true)}
                                >
                                    <i className="bi bi-plus-circle me-1"></i>
                                    Agregar primera dirección
                                </button>
                            </div>
                        ) : (
                            <div className="row">
                                {addresses.map((address) => (
                                    <div key={address.id} className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="card-title mb-3">
                                                    <i className="bi bi-house-door me-2"></i>
                                                    {address.addressType}
                                                </h6>
                                                <p className="card-text mb-1">
                                                    <strong>{address.addressLine}</strong>
                                                </p>
                                                <p className="card-text text-muted small mb-1">
                                                    {address.district}, {address.province}, {address.department}
                                                </p>
                                                {address.addressReference && (
                                                    <p className="card-text text-muted small mb-1">
                                                        <i className="bi bi-info-circle me-1"></i>
                                                        {address.addressReference}
                                                    </p>
                                                )}
                                                <p className="card-text text-muted small">
                                                    <i className="bi bi-telephone me-1"></i>
                                                    {address.addressPhone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
