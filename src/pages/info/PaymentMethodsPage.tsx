export default function PaymentMethodsPage() {
    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">Métodos de Pago</h2>
            <p className="text-center lead mb-5">
                En PixelPro ofrecemos múltiples opciones de pago para tu comodidad y seguridad.
            </p>

            <div className="row g-4">
                {/* Tarjetas de Crédito/Débito */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-credit-card text-primary me-3" style={{ fontSize: '2rem' }}></i>
                                <h5 className="card-title mb-0">Tarjetas de Crédito/Débito</h5>
                            </div>
                            <p className="card-text">
                                Aceptamos las principales tarjetas de crédito y débito: Visa, Mastercard y American Express.
                                Todas las transacciones están protegidas con encriptación SSL de última generación.
                            </p>
                            <div className="d-flex gap-3 mt-3">
                                <img
                                    src="/assets/icons/icon-visa.webp"
                                    alt="Visa"
                                    className="img-fluid"
                                    style={{ maxHeight: '30px' }}
                                />
                                <img
                                    src="/assets/icons/icon-mastercard.webp"
                                    alt="Mastercard"
                                    className="img-fluid"
                                    style={{ maxHeight: '30px' }}
                                />
                                <img
                                    src="/assets/icons/icon-american-express.webp"
                                    alt="American Express"
                                    className="img-fluid"
                                    style={{ maxHeight: '30px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Yape */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-phone text-success me-3" style={{ fontSize: '2rem' }}></i>
                                <h5 className="card-title mb-0">Yape</h5>
                            </div>
                            <p className="card-text">
                                Paga de forma rápida y segura con Yape. Solo necesitas tu celular para completar la transacción
                                escaneando el código QR o ingresando el número de operación.
                            </p>
                            <div className="mt-3">
                                <img
                                    src="/assets/icons/icon-yape.webp"
                                    alt="Yape"
                                    className="img-fluid"
                                    style={{ maxHeight: '30px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plin */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-wallet2 text-info me-3" style={{ fontSize: '2rem' }}></i>
                                <h5 className="card-title mb-0">Plin</h5>
                            </div>
                            <p className="card-text">
                                Realiza pagos instantáneos con Plin desde cualquier banco participante. Rápido, seguro y sin
                                complicaciones. Escanea el QR o ingresa tu código de operación.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pago en Efectivo */}
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-cash-coin text-warning me-3" style={{ fontSize: '2rem' }}></i>
                                <h5 className="card-title mb-0">Pago en Efectivo</h5>
                            </div>
                            <p className="card-text">
                                Si prefieres pagar al recoger tu pedido en tienda, selecciona la opción "Pago en Efectivo".
                                Debes presentar tu número de pedido al momento de la entrega.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Info */}
            <div className="alert alert-info mt-5">
                <div className="d-flex align-items-start">
                    <i className="bi bi-shield-check me-3" style={{ fontSize: '2rem' }}></i>
                    <div>
                        <h5 className="alert-heading">Seguridad Garantizada</h5>
                        <p className="mb-0">
                            Todos nuestros métodos de pago cuentan con protocolos de seguridad certificados. Tu información
                            financiera está encriptada y nunca es almacenada en nuestros servidores. Puedes comprar con total
                            tranquilidad.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
