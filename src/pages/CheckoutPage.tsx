import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { getFullImageUrl } from '../config/api';
import type { CheckoutRequest, PaymentMethod } from '../types/checkout';
import type { DeliveryType } from '../types/order';
import type { CustomerProfile, Address } from '../types/account';
import type { Order } from '../types/order';
import AccountService from '../services/account.service';
import OrderService from '../services/order.service';

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { items, total } = useCart();
    const SHIPPING_COST = 15.0;

    // Profile and addresses data
    const [profile, setProfile] = useState<CustomerProfile | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [dataError, setDataError] = useState<string | null>(null);

    // Form state
    const [deliveryType, setDeliveryType] = useState<DeliveryType>('A_DOMICILIO');
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('TARJETA');

    // Payment method specific data (for UI validation only, not sent to backend)
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [yapePhone, setYapePhone] = useState('');
    const [yapeOperationCode, setYapeOperationCode] = useState('');
    const [plinPhone, setPlinPhone] = useState('');
    const [plinOperationCode, setPlinOperationCode] = useState('');

    // Submit state
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart');
        }
    }, [items, navigate]);

    // Load profile and addresses on mount
    useEffect(() => {
        loadCheckoutData();
    }, []);

    const loadCheckoutData = async () => {
        try {
            setLoadingData(true);
            setDataError(null);

            // Load profile and addresses in parallel
            const [profileData, addressesData] = await Promise.all([
                AccountService.getProfile().catch(() => null),
                AccountService.getAddresses().catch(() => [])
            ]);

            setProfile(profileData);
            setAddresses(addressesData);

            // Auto-select first address if available
            if (addressesData.length > 0 && addressesData[0].id) {
                setSelectedAddressId(addressesData[0].id);
            }
        } catch (err) {
            console.error('Error loading checkout data:', err);
            setDataError('Error al cargar la información. Por favor recarga la página.');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation: if delivery type is home delivery, address must be selected
        if (deliveryType === 'A_DOMICILIO' && !selectedAddressId) {
            setSubmitError('Por favor selecciona una dirección de envío.');
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError(null);

            // Build checkout request
            const checkoutRequest: CheckoutRequest = {
                addressId: deliveryType === 'A_DOMICILIO' ? selectedAddressId : null,
                deliveryType,
                paymentMethod,
                items: items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            // Call API to create order
            const order: Order = await OrderService.createOrder(checkoutRequest);

            // Store complete order in localStorage for ThankYouPage
            localStorage.setItem('lastOrder', JSON.stringify(order));

            // Navigate to success page
            navigate('/checkout/success');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al procesar el pedido. Por favor intenta nuevamente.';
            setSubmitError(errorMessage);
            console.error('Error creating order:', err);
        } finally {
            setSubmitting(false);
        }
    };

    // Don't render if cart is empty
    if (items.length === 0) {
        return null;
    }

    // Loading state
    if (loadingData) {
        return (
            <div className="container my-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3 text-muted">Cargando información del checkout...</p>
                </div>
            </div>
        );
    }

    // Data error state
    if (dataError) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {dataError}
                </div>
            </div>
        );
    }

    // Validation: Can't proceed without profile
    if (!profile) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <strong>Completa tu perfil primero</strong>
                    <p className="mb-0 mt-2">
                        Necesitas tener tu perfil completo para realizar compras.{' '}
                        <Link to="/account/profile" className="alert-link">
                            Ir a Mi Perfil
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">Finalizar Compra</h2>

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    {/* LEFT COLUMN: Form */}
                    <div className="col-lg-8">
                        {/* Contact Information - Read-Only */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-4">
                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                    Información de Contacto
                                </h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Nombres</label>
                                        <p className="fw-semibold">{profile.firstName}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Apellidos</label>
                                        <p className="fw-semibold">{profile.lastName}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Correo Electrónico</label>
                                        <p className="fw-semibold">{profile.email}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Teléfono</label>
                                        <p className="fw-semibold">{profile.phoneNumber}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Tipo de Documento</label>
                                        <p className="fw-semibold">{profile.documentType}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Número de Documento</label>
                                        <p className="fw-semibold">{profile.documentNumber}</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Link to="/account/profile" className="btn btn-sm btn-outline-secondary">
                                        <i className="bi bi-pencil me-1"></i>
                                        Editar información
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Type Selection */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-4">
                                    <i className="bi bi-truck me-2 text-primary"></i>
                                    Tipo de Entrega
                                </h5>
                                <div className="btn-group w-100 mb-3" role="group">
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="deliveryType"
                                        id="deliveryHome"
                                        value="A_DOMICILIO"
                                        checked={deliveryType === 'A_DOMICILIO'}
                                        onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="deliveryHome">
                                        <i className="bi bi-house-door me-2"></i>
                                        Envío a Domicilio
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="deliveryType"
                                        id="deliveryPickup"
                                        value="RECOJO_EN_TIENDA"
                                        checked={deliveryType === 'RECOJO_EN_TIENDA'}
                                        onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="deliveryPickup">
                                        <i className="bi bi-shop me-2"></i>
                                        Recojo en Tienda
                                    </label>
                                </div>

                                {/* Address Selection - Only for Home Delivery */}
                                {deliveryType === 'A_DOMICILIO' && (
                                    <>
                                        <h6 className="mb-3">Selecciona una dirección de envío</h6>

                                        {addresses.length === 0 ? (
                                            <div className="alert alert-warning" role="alert">
                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                <strong>No tienes direcciones guardadas</strong>
                                                <p className="mb-0 mt-2">
                                                    Por favor agrega una dirección de envío antes de continuar.{' '}
                                                    <Link to="/account/addresses" className="alert-link">
                                                        Gestionar Direcciones
                                                    </Link>
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="row g-3">
                                                {addresses.map((address) => (
                                                    <div key={address.id} className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="addressSelection"
                                                                id={`address-${address.id}`}
                                                                value={address.id}
                                                                checked={selectedAddressId === address.id}
                                                                onChange={() => address.id && setSelectedAddressId(address.id)}
                                                            />
                                                            <label
                                                                className="form-check-label w-100"
                                                                htmlFor={`address-${address.id}`}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                <div className="card border-2" style={{
                                                                    borderColor: selectedAddressId === address.id ? 'var(--bs-primary)' : 'var(--bs-border-color)'
                                                                }}>
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between align-items-start">
                                                                            <div>
                                                                                <h6 className="card-title mb-2">
                                                                                    <i className="bi bi-house-door me-2"></i>
                                                                                    {address.addressType}
                                                                                </h6>
                                                                                <p className="mb-1">{address.addressLine}</p>
                                                                                <p className="mb-1 text-muted small">
                                                                                    {address.district}, {address.province}, {address.department}
                                                                                </p>
                                                                                {address.addressReference && (
                                                                                    <p className="mb-1 text-muted small">
                                                                                        <i className="bi bi-info-circle me-1"></i>
                                                                                        {address.addressReference}
                                                                                    </p>
                                                                                )}
                                                                                <p className="mb-0 text-muted small">
                                                                                    <i className="bi bi-telephone me-1"></i>
                                                                                    {address.addressPhone}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-3">
                                            <Link to="/account/addresses" className="btn btn-sm btn-outline-secondary">
                                                <i className="bi bi-plus-circle me-1"></i>
                                                Agregar nueva dirección
                                            </Link>
                                        </div>
                                    </>
                                )}

                                {/* Pickup Information */}
                                {deliveryType === 'RECOJO_EN_TIENDA' && (
                                    <div className="alert alert-info" role="alert">
                                        <i className="bi bi-info-circle me-2"></i>
                                        <strong>Dirección de la tienda:</strong>
                                        <p className="mb-0 mt-2">Av. Javier Prado Este 4200, San Borja, Lima</p>
                                        <p className="mb-0">Horario: Lunes a Viernes 9:00 AM - 6:00 PM</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-4">
                                    <i className="bi bi-credit-card-fill me-2 text-primary"></i>
                                    Método de Pago
                                </h5>

                                {/* Payment Method Radio Buttons */}
                                <div className="form-check mb-3 p-3 border rounded" style={{
                                    backgroundColor: paymentMethod === 'TARJETA' ? 'rgba(13, 110, 253, 0.05)' : 'transparent',
                                    borderColor: paymentMethod === 'TARJETA' ? 'var(--bs-primary)' : 'var(--bs-border-color)'
                                }}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="tarjeta"
                                        value="TARJETA"
                                        checked={paymentMethod === 'TARJETA'}
                                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    />
                                    <label className="form-check-label fw-semibold" htmlFor="tarjeta" style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-credit-card me-2"></i>
                                        Tarjeta de Crédito/Débito
                                    </label>

                                    {/* Card Payment Form */}
                                    {paymentMethod === 'TARJETA' && (
                                        <div className="mt-3 pt-3 border-top">
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label htmlFor="cardNumber" className="form-label small">
                                                        Número de Tarjeta <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="bi bi-credit-card-2-front"></i>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="cardNumber"
                                                            placeholder="1234 5678 9012 3456"
                                                            value={cardNumber}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                                                                setCardNumber(formatted);
                                                            }}
                                                            maxLength={19}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="cardholderName" className="form-label small">
                                                        Nombre del Titular <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="cardholderName"
                                                        placeholder="JUAN PEREZ"
                                                        value={cardholderName}
                                                        onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="cardExpiry" className="form-label small">
                                                        Vencimiento <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="cardExpiry"
                                                        placeholder="MM/YY"
                                                        value={cardExpiry}
                                                        onChange={(e) => {
                                                            let value = e.target.value.replace(/\D/g, '');
                                                            if (value.length >= 2) {
                                                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                            }
                                                            setCardExpiry(value);
                                                        }}
                                                        maxLength={5}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="cardCVV" className="form-label small">
                                                        CVV <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="cardCVV"
                                                        placeholder="123"
                                                        value={cardCVV}
                                                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                                                        maxLength={3}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="alert alert-info alert-sm mt-3 mb-0" role="alert">
                                                <i className="bi bi-shield-lock me-2"></i>
                                                <small>Tus datos están protegidos con encriptación SSL</small>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="form-check mb-3 p-3 border rounded" style={{
                                    backgroundColor: paymentMethod === 'YAPE' ? 'rgba(13, 110, 253, 0.05)' : 'transparent',
                                    borderColor: paymentMethod === 'YAPE' ? 'var(--bs-primary)' : 'var(--bs-border-color)'
                                }}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="yape"
                                        value="YAPE"
                                        checked={paymentMethod === 'YAPE'}
                                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    />
                                    <label className="form-check-label fw-semibold" htmlFor="yape" style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-phone me-2"></i>
                                        Yape
                                    </label>

                                    {/* Yape Payment Form */}
                                    {paymentMethod === 'YAPE' && (
                                        <div className="mt-3 pt-3 border-top">
                                            <div className="text-center mb-3">
                                                <div className="bg-light p-4 rounded d-inline-block">
                                                    <i className="bi bi-qr-code display-1 text-muted"></i>
                                                    <p className="mb-0 mt-2 small text-muted">Código QR Yape</p>
                                                </div>
                                                <p className="mt-3 mb-1 fw-semibold">Yapear a:</p>
                                                <p className="h5 text-primary">987 654 321</p>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label htmlFor="yapePhone" className="form-label small">
                                                        Tu número de celular <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">+51</span>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="yapePhone"
                                                            placeholder="987654321"
                                                            value={yapePhone}
                                                            onChange={(e) => setYapePhone(e.target.value.replace(/\D/g, ''))}
                                                            maxLength={9}
                                                            pattern="9\d{8}"
                                                            required
                                                        />
                                                    </div>
                                                    <small className="text-muted">Desde donde realizaste el Yape</small>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="yapeOperationCode" className="form-label small">
                                                        Código de Operación <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="yapeOperationCode"
                                                        placeholder="Ej: 123456"
                                                        value={yapeOperationCode}
                                                        onChange={(e) => setYapeOperationCode(e.target.value)}
                                                        required
                                                    />
                                                    <small className="text-muted">Aparece en tu comprobante de Yape</small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="form-check mb-3 p-3 border rounded" style={{
                                    backgroundColor: paymentMethod === 'PLIN' ? 'rgba(13, 110, 253, 0.05)' : 'transparent',
                                    borderColor: paymentMethod === 'PLIN' ? 'var(--bs-primary)' : 'var(--bs-border-color)'
                                }}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="plin"
                                        value="PLIN"
                                        checked={paymentMethod === 'PLIN'}
                                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    />
                                    <label className="form-check-label fw-semibold" htmlFor="plin" style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-phone me-2"></i>
                                        Plin
                                    </label>

                                    {/* Plin Payment Form */}
                                    {paymentMethod === 'PLIN' && (
                                        <div className="mt-3 pt-3 border-top">
                                            <div className="text-center mb-3">
                                                <div className="bg-light p-4 rounded d-inline-block">
                                                    <i className="bi bi-qr-code display-1 text-muted"></i>
                                                    <p className="mb-0 mt-2 small text-muted">Código QR Plin</p>
                                                </div>
                                                <p className="mt-3 mb-1 fw-semibold">Transferir a:</p>
                                                <p className="h5 text-primary">987 654 321</p>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label htmlFor="plinPhone" className="form-label small">
                                                        Tu número de celular <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">+51</span>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="plinPhone"
                                                            placeholder="987654321"
                                                            value={plinPhone}
                                                            onChange={(e) => setPlinPhone(e.target.value.replace(/\D/g, ''))}
                                                            maxLength={9}
                                                            pattern="9\d{8}"
                                                            required
                                                        />
                                                    </div>
                                                    <small className="text-muted">Desde donde realizaste el Plin</small>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="plinOperationCode" className="form-label small">
                                                        Código de Operación <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="plinOperationCode"
                                                        placeholder="Ej: 123456"
                                                        value={plinOperationCode}
                                                        onChange={(e) => setPlinOperationCode(e.target.value)}
                                                        required
                                                    />
                                                    <small className="text-muted">Aparece en tu comprobante de Plin</small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="form-check p-3 border rounded" style={{
                                    backgroundColor: paymentMethod === 'PAGO_EFECTIVO' ? 'rgba(13, 110, 253, 0.05)' : 'transparent',
                                    borderColor: paymentMethod === 'PAGO_EFECTIVO' ? 'var(--bs-primary)' : 'var(--bs-border-color)'
                                }}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="efectivo"
                                        value="PAGO_EFECTIVO"
                                        checked={paymentMethod === 'PAGO_EFECTIVO'}
                                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    />
                                    <label className="form-check-label fw-semibold" htmlFor="efectivo" style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-cash me-2"></i>
                                        Efectivo (Contra entrega)
                                    </label>

                                    {/* Cash Payment Info */}
                                    {paymentMethod === 'PAGO_EFECTIVO' && (
                                        <div className="mt-3 pt-3 border-top">
                                            <div className="alert alert-success mb-0" role="alert">
                                                <div className="d-flex align-items-start">
                                                    <i className="bi bi-info-circle-fill me-2 mt-1"></i>
                                                    <div>
                                                        <strong>Pago en Efectivo:</strong>
                                                        <p className="mb-2 mt-2">El pago se realizará al momento de la entrega de tu pedido.</p>
                                                        <ul className="mb-0 ps-3">
                                                            <li>Por favor ten el monto exacto</li>
                                                            <li>Recibirás tu boleta al momento de la entrega</li>
                                                            <li>Total a pagar: <strong>S/.{(total + (deliveryType === 'A_DOMICILIO' ? SHIPPING_COST : 0)).toFixed(2)}</strong></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                            <div className="card-body">
                                <h5 className="card-title mb-4">Resumen del Pedido</h5>

                                {/* Items List */}
                                <div className="mb-3">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                            <img
                                                src={getFullImageUrl(item.product.imageUrl)}
                                                alt={item.product.name}
                                                className="rounded"
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            />
                                            <div className="ms-3 flex-grow-1">
                                                <h6 className="mb-1 small">{item.product.name}</h6>
                                                <p className="mb-0 text-muted small">
                                                    Cant: {item.quantity} × S/.{item.product.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="text-end">
                                                <p className="mb-0 fw-bold">
                                                    S/.{(item.quantity * item.product.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="border-top pt-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <span className="fw-semibold">S/.{total.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Envío:</span>
                                        <span className="fw-semibold">
                                            {deliveryType === 'A_DOMICILIO'
                                                ? `S/.${SHIPPING_COST.toFixed(2)}`
                                                : 'S/.0.00'}
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="h5 mb-0">Total:</span>
                                        <span className="h5 mb-0 text-success fw-bold">
                                            S/.{(total + (deliveryType === 'A_DOMICILIO' ? SHIPPING_COST : 0)).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Error Message */}
                                    {submitError && (
                                        <div className="alert alert-danger alert-sm mb-3" role="alert">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            {submitError}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg w-100"
                                        disabled={
                                            submitting ||
                                            (deliveryType === 'A_DOMICILIO' && (!selectedAddressId || addresses.length === 0))
                                        }
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                Confirmar Pedido
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-3 text-center">
                                        <small className="text-muted">
                                            <i className="bi bi-shield-check me-1"></i>
                                            Pago 100% seguro
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
