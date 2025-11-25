import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { getFullImageUrl } from '../config/api';
import type { OrderSummary } from '../types/checkout';
import type { Order } from '../types/order';

export default function ThankYouPage() {
    const { clearCart } = useCart();

    // Support both new Order format and legacy OrderSummary format
    const orderData = useMemo<Order | OrderSummary | null>(() => {
        const lastOrderJSON = localStorage.getItem('lastOrder');
        if (lastOrderJSON) {
            const parsed = JSON.parse(lastOrderJSON);
            // Check if it's the new Order format (has 'code' field) or legacy (has 'orderId')
            return parsed;
        }
        return null;
    }, []);

    // Helper to check if it's a new Order or legacy OrderSummary
    const isNewOrderFormat = (data: Order | OrderSummary): data is Order => {
        return 'code' in data;
    };

    // Calculate IGV (18%) from total
    const calculateIGV = (total: number) => {
        const subtotal = total / 1.18;
        const igv = total - subtotal;
        return { subtotal, igv };
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString?: string) => {
        const date = dateString ? new Date(dateString) : new Date();
        return new Intl.DateTimeFormat('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Generate mock serie
    const generateSerie = (orderId: string | number) => {
        const numericId = typeof orderId === 'string' ? orderId.split('-').pop() : orderId;
        return `B001-${String(numericId).padStart(8, '0')}`;
    };

    // Clear cart after successful checkout (prevents race condition)
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    // Don't render if no order data
    if (!orderData) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    No se encontraron datos del pedido.
                    <br />
                    <Link to="/shop" className="btn btn-primary mt-3">
                        Ir a la Tienda
                    </Link>
                </div>
            </div>
        );
    }

    const isNew = isNewOrderFormat(orderData);
    const total = orderData.total;
    const { subtotal: opGravada, igv } = calculateIGV(total);

    return (
        <div className="container my-5">
            {/* Success Banner */}
            <div className="alert alert-success text-center mb-4" role="alert">
                <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '32px' }}></i>
                <h4 className="alert-heading mb-2">¡Pedido Confirmado!</h4>
                <p className="mb-0">Tu compra ha sido procesada exitosamente. A continuación tu boleta de venta.</p>
            </div>

            {/* Boleta de Venta Card */}
            <div className="card border border-2" style={{ maxWidth: '900px', margin: '0 auto' }} id="boleta-container">
                <div className="card-body p-4 p-md-5">
                    {/* Header: Logo + Company Info */}
                    <div className="row mb-4 pb-4 border-bottom">
                        <div className="col-md-6">
                            <h2 className="text-primary fw-bold mb-2">PIXELPRO</h2>
                            <p className="mb-1 small"><strong>RUC:</strong> 20123456789</p>
                            <p className="mb-1 small">Av. Javier Prado Este 4200</p>
                            <p className="mb-1 small">San Borja - Lima - Perú</p>
                            <p className="mb-0 small">Tel: (01) 555-1234</p>
                        </div>
                        <div className="col-md-6 text-md-end mt-3 mt-md-0">
                            <div className="border border-dark border-2 d-inline-block p-3">
                                <h5 className="mb-1 fw-bold">BOLETA DE VENTA</h5>
                                <h5 className="mb-0 fw-bold">ELECTRÓNICA</h5>
                                <p className="mb-0 mt-2 fw-semibold">{generateSerie(isNew ? orderData.id : orderData.orderId)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Receipt Info */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <p className="mb-1 small"><strong>Fecha de Emisión:</strong></p>
                            <p className="mb-0">{formatDate(isNew ? orderData.createdAt : orderData.timestamp)}</p>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-1 small"><strong>Código de Pedido:</strong></p>
                            <p className="mb-0 text-primary fw-semibold">{isNew ? orderData.code : orderData.orderId}</p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-4 pb-3 border-bottom">
                        <h6 className="text-uppercase mb-3 fw-bold">Datos del Cliente</h6>
                        <div className="row">
                            <div className="col-md-8">
                                <p className="mb-1 small"><strong>Cliente:</strong></p>
                                <p className="mb-2">{isNew ? `${orderData.customer.firstName} ${orderData.customer.lastName}` : orderData.customerName}</p>

                                {isNew && (
                                    <>
                                        <p className="mb-1 small"><strong>{orderData.customer.documentType}:</strong></p>
                                        <p className="mb-2">{orderData.customer.documentNumber}</p>
                                    </>
                                )}
                            </div>
                            <div className="col-md-4">
                                {isNew && orderData.address && (
                                    <>
                                        <p className="mb-1 small"><strong>Dirección:</strong></p>
                                        <p className="mb-0 small">{orderData.address.addressLine}</p>
                                        <p className="mb-0 small text-muted">
                                            {orderData.address.district}, {orderData.address.province}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-4">
                        <h6 className="text-uppercase mb-3 fw-bold">Detalle de Productos</h6>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center" style={{ width: '10%' }}>Cant.</th>
                                        <th style={{ width: '50%' }}>Descripción</th>
                                        <th className="text-end" style={{ width: '20%' }}>P. Unit</th>
                                        <th className="text-end" style={{ width: '20%' }}>Importe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isNew ? (
                                        orderData.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.quantity}</td>
                                                <td>
                                                    <strong>{item.productName}</strong>
                                                    <br />
                                                    <small className="text-muted">SKU: {item.productSku}</small>
                                                </td>
                                                <td className="text-end">{formatCurrency(item.unitPrice)}</td>
                                                <td className="text-end fw-semibold">{formatCurrency(item.unitPrice * item.quantity)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        orderData.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.quantity}</td>
                                                <td><strong>{item.nombre}</strong></td>
                                                <td className="text-end">{formatCurrency(item.precio)}</td>
                                                <td className="text-end fw-semibold">{formatCurrency(item.precio * item.quantity)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals Section */}
                    <div className="row">
                        <div className="col-md-7">
                            {/* Delivery Info */}
                            {isNew && (
                                <div className="alert alert-info mb-0" role="alert">
                                    <i className={`me-2 ${orderData.deliveryType === 'RECOJO_EN_TIENDA' ? 'bi bi-shop' : 'bi bi-truck'}`}></i>
                                    <strong>
                                        {orderData.deliveryType === 'RECOJO_EN_TIENDA'
                                            ? 'Recojo en Tienda'
                                            : 'Envío a Domicilio'}
                                    </strong>
                                    <br />
                                    <small>
                                        {orderData.deliveryType === 'RECOJO_EN_TIENDA'
                                            ? 'Disponible en 24-48 horas'
                                            : 'Entrega en 3-5 días hábiles'}
                                    </small>
                                </div>
                            )}
                        </div>
                        <div className="col-md-5">
                            <table className="table table-sm mb-0">
                                <tbody>
                                    <tr>
                                        <td className="text-end border-0"><strong>Op. Gravada:</strong></td>
                                        <td className="text-end border-0">{formatCurrency(opGravada)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-end border-0"><strong>I.G.V. (18%):</strong></td>
                                        <td className="text-end border-0">{formatCurrency(igv)}</td>
                                    </tr>
                                    <tr className="table-light">
                                        <td className="text-end border-0"><h5 className="mb-0">IMPORTE TOTAL:</h5></td>
                                        <td className="text-end border-0"><h5 className="mb-0 text-success fw-bold">{formatCurrency(total)}</h5></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-top text-center">
                        <p className="mb-2 fw-semibold text-primary">¡Gracias por su compra!</p>
                        <p className="mb-0 small text-muted">
                            Boleta de Venta Electrónica - Representa una autorización de impresión. Consulte su comprobante en{' '}
                            <a href="mailto:soporte@pixelpro.com">soporte@pixelpro.com</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-4 d-print-none">
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => window.print()}
                    >
                        <i className="bi bi-printer me-2"></i>
                        Imprimir Boleta
                    </button>
                    <Link to="/" className="btn btn-primary btn-lg">
                        <i className="bi bi-house me-2"></i>
                        Volver al Inicio
                    </Link>
                    <Link to="/shop" className="btn btn-secondary btn-lg">
                        <i className="bi bi-bag me-2"></i>
                        Seguir Comprando
                    </Link>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #boleta-container,
                    #boleta-container * {
                        visibility: visible;
                    }
                    #boleta-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .d-print-none {
                        display: none !important;
                    }
                    .alert-success {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
