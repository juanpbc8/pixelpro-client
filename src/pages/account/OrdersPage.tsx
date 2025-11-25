import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountService from '../../services/account.service';
import type { Order, OrderStatus as OrderStatusType } from '../../types/order';
import { getFullImageUrl } from '../../config/api';

type FilterStatus = OrderStatusType | 'TODOS';

const STATUS_BADGE_MAP: Record<OrderStatusType, string> = {
    'PENDIENTE': 'warning',
    'CONFIRMADO': 'info',
    'PREPARANDO': 'primary',
    'ENVIADO': 'primary',
    'ENTREGADO': 'success',
    'CANCELADO': 'danger',
};

const STATUS_LABEL_MAP: Record<OrderStatusType, string> = {
    'PENDIENTE': 'Pendiente',
    'CONFIRMADO': 'Confirmado',
    'PREPARANDO': 'Preparando',
    'ENVIADO': 'Enviado',
    'ENTREGADO': 'Entregado',
    'CANCELADO': 'Cancelado',
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterStatus>('TODOS');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Modal state
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        loadOrders();
    }, [currentPage, filter]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const statusFilter = filter === 'TODOS' ? undefined : filter;
            const response = await AccountService.getMyOrders(currentPage, 10, statusFilter);
            setOrders(response.content);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError('Error al cargar los pedidos');
            console.error('Error loading orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value as FilterStatus);
        setCurrentPage(0); // Reset to first page when filter changes
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleViewDetails = async (orderId: number) => {
        try {
            setLoadingDetail(true);
            const orderDetail = await AccountService.getOrderById(orderId);
            setSelectedOrder(orderDetail);
            setShowModal(true);
        } catch (err) {
            console.error('Error loading order details:', err);
            alert('Error al cargar los detalles del pedido');
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    if (loading) {
        return (
            <section id="mis-pedidos">
                <div className="card mb-4">
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3 text-muted">Cargando pedidos...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="mis-pedidos">
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="h5 mb-0">
                        <i className="bi bi-bag-check me-2"></i>
                        Mis Pedidos
                    </h3>
                    <div>
                        <select
                            className="form-select form-select-sm"
                            id="filtroEstado"
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <option value="TODOS">Todos los pedidos</option>
                            <option value="PENDIENTE">Pendientes</option>
                            <option value="CONFIRMADO">Confirmados</option>
                            <option value="PREPARANDO">Preparando</option>
                            <option value="ENVIADO">Enviados</option>
                            <option value="ENTREGADO">Entregados</option>
                            <option value="CANCELADO">Cancelados</option>
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <div id="listaPedidos">
                        {orders.length === 0 ? (
                            <div className="text-center text-muted py-5">
                                <i className="bi bi-bag-x fs-1 mb-3 d-block"></i>
                                <p className="mb-3">No tienes pedidos {filter !== 'TODOS' ? `con estado ${STATUS_LABEL_MAP[filter as OrderStatusType]}` : ''}</p>
                                <Link to="/shop" className="btn btn-outline-primary">
                                    <i className="bi bi-shop me-1"></i>
                                    Ir a la tienda
                                </Link>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="border rounded mb-3 p-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-2 col-6">
                                            <strong>{order.code}</strong>
                                            <small className="text-muted d-block">
                                                {formatDate(order.createdAt)}
                                            </small>
                                        </div>
                                        <div className="col-md-3 col-6">
                                            <span className={`badge bg-${STATUS_BADGE_MAP[order.status]}`}>
                                                {STATUS_LABEL_MAP[order.status]}
                                            </span>
                                        </div>
                                        <div className="col-md-3 col-6 mt-2 mt-md-0">
                                            <strong>S/ {order.total.toFixed(2)}</strong>
                                            <small className="text-muted d-block">
                                                {order.items.length}{' '}
                                                {order.items.length === 1 ? 'producto' : 'productos'}
                                            </small>
                                        </div>
                                        <div className="col-md-4 col-6 mt-2 mt-md-0 text-md-end">
                                            <button
                                                className="btn btn-outline-primary btn-sm me-2 mb-1"
                                                onClick={() => handleViewDetails(order.id)}
                                                disabled={loadingDetail}
                                            >
                                                {loadingDetail ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                                                        Cargando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-eye me-1"></i>
                                                        Ver detalles
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Items Preview */}
                                    <div className="mt-3 pt-3 border-top">
                                        <div className="row g-2">
                                            {order.items.slice(0, 3).map((item) => (
                                                <div key={item.id} className="col-12">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={getFullImageUrl(item.productImageUrl)}
                                                            alt={item.productName}
                                                            className="rounded me-3"
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                        <div className="flex-grow-1">
                                                            <strong className="d-block">
                                                                {item.productName}
                                                            </strong>
                                                            <small className="text-muted">
                                                                Cantidad: {item.quantity} | S/{' '}
                                                                {item.unitPrice.toFixed(2)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="col-12">
                                                    <small className="text-muted">
                                                        +{order.items.length - 3} producto(s) más...
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <nav aria-label="Paginación de pedidos" className="mt-4">
                                <ul className="pagination pagination-sm justify-content-center">
                                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 0}
                                        >
                                            Anterior
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li
                                            key={i}
                                            className={`page-item ${i === currentPage ? 'active' : ''}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(i)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li
                                        className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={currentPage === totalPages - 1}
                                        >
                                            Siguiente
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal for Order Details */}
            {showModal && selectedOrder && (
                <>
                    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i className="bi bi-receipt me-2"></i>
                                        Pedido {selectedOrder.code}
                                        <span className={`badge bg-${STATUS_BADGE_MAP[selectedOrder.status]} ms-2`}>
                                            {STATUS_LABEL_MAP[selectedOrder.status]}
                                        </span>
                                    </h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* Order Items */}
                                    <h6 className="mb-3">Productos</h6>
                                    <div className="list-group mb-4">
                                        {selectedOrder.items.map((item) => (
                                            <div key={item.id} className="list-group-item">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={getFullImageUrl(item.productImageUrl)}
                                                        alt={item.productName}
                                                        className="rounded me-3"
                                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">{item.productName}</h6>
                                                        <small className="text-muted">
                                                            SKU: {item.productSku}
                                                        </small>
                                                        <div className="mt-1">
                                                            <span className="badge bg-secondary me-2">
                                                                Cantidad: {item.quantity}
                                                            </span>
                                                            <span className="text-muted">
                                                                S/ {item.unitPrice.toFixed(2)} c/u
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <strong className="text-primary">
                                                            S/ {(item.quantity * item.unitPrice).toFixed(2)}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping Address */}
                                    {selectedOrder.address && (
                                        <div className="mb-4">
                                            <h6 className="mb-3">
                                                <i className="bi bi-geo-alt me-2"></i>
                                                Dirección de Envío
                                            </h6>
                                            <div className="card bg-light">
                                                <div className="card-body">
                                                    <p className="mb-1"><strong>{selectedOrder.address.addressLine}</strong></p>
                                                    <p className="mb-1 text-muted">
                                                        {selectedOrder.address.district}, {selectedOrder.address.province}, {selectedOrder.address.department}
                                                    </p>
                                                    {selectedOrder.address.addressReference && (
                                                        <p className="mb-1 text-muted">
                                                            <i className="bi bi-info-circle me-1"></i>
                                                            {selectedOrder.address.addressReference}
                                                        </p>
                                                    )}
                                                    <p className="mb-0 text-muted">
                                                        <i className="bi bi-telephone me-1"></i>
                                                        {selectedOrder.address.addressPhone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Summary */}
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h6 className="mb-3">Resumen del Pedido</h6>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Subtotal:</span>
                                                <span>S/ {selectedOrder.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Envío:</span>
                                                <span>S/ {selectedOrder.shippingCost.toFixed(2)}</span>
                                            </div>
                                            {selectedOrder.discount > 0 && (
                                                <div className="d-flex justify-content-between mb-2 text-success">
                                                    <span>Descuento:</span>
                                                    <span>- S/ {selectedOrder.discount.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <strong>Total:</strong>
                                                <strong className="text-primary fs-5">
                                                    S/ {selectedOrder.total.toFixed(2)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Info */}
                                    <div className="mt-3">
                                        <small className="text-muted">
                                            <i className="bi bi-calendar me-1"></i>
                                            Fecha de pedido: {formatDate(selectedOrder.createdAt)}
                                        </small>
                                        <br />
                                        <small className="text-muted">
                                            <i className="bi bi-truck me-1"></i>
                                            Tipo de entrega: {selectedOrder.deliveryType === 'A_DOMICILIO' ? 'A domicilio' : 'Recojo en tienda'}
                                        </small>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        <i className="bi bi-x-lg me-1"></i>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
