import { useState } from 'react';

export default function FaqPage() {
    const [activeTab, setActiveTab] = useState('envios');

    return (
        <main className="container py-5">
            <h2 className="text-center mb-5">Preguntas Frecuentes</h2>

            {/* Tabs */}
            <ul className="nav nav-tabs justify-content-center mb-4" role="tablist">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'envios' ? 'active' : ''}`}
                        onClick={() => setActiveTab('envios')}
                        type="button"
                    >
                        Envíos
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'pagos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pagos')}
                        type="button"
                    >
                        Pagos
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('productos')}
                        type="button"
                    >
                        Productos
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'cuenta' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cuenta')}
                        type="button"
                    >
                        Cuenta
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
                {/* Envíos */}
                {activeTab === 'envios' && (
                    <div className="tab-pane fade show active">
                        <div className="accordion" id="accordionEnvios">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#envio1"
                                    >
                                        ¿Realizan envíos a todo el Perú?
                                    </button>
                                </h2>
                                <div id="envio1" className="accordion-collapse collapse" data-bs-parent="#accordionEnvios">
                                    <div className="accordion-body">
                                        Sí, realizamos envíos a todo el país mediante Olva, Shalom y servicios propios en Lima Metropolitana.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#envio2"
                                    >
                                        ¿Cuánto demora el envío?
                                    </button>
                                </h2>
                                <div id="envio2" className="accordion-collapse collapse" data-bs-parent="#accordionEnvios">
                                    <div className="accordion-body">
                                        En Lima de 1 a 2 días hábiles. Para provincias, entre 2 a 5 días hábiles dependiendo del destino.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagos */}
                {activeTab === 'pagos' && (
                    <div className="tab-pane fade show active">
                        <div className="accordion" id="accordionPagos">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#pago1"
                                    >
                                        ¿Qué métodos de pago aceptan?
                                    </button>
                                </h2>
                                <div id="pago1" className="accordion-collapse collapse" data-bs-parent="#accordionPagos">
                                    <div className="accordion-body">
                                        Aceptamos tarjetas de crédito/débito, Yape, Plin y transferencias bancarias.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#pago2"
                                    >
                                        ¿Puedo pagar contra entrega?
                                    </button>
                                </h2>
                                <div id="pago2" className="accordion-collapse collapse" data-bs-parent="#accordionPagos">
                                    <div className="accordion-body">
                                        Por ahora no ofrecemos pago contra entrega, pero puedes usar pagos digitales seguros.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Productos */}
                {activeTab === 'productos' && (
                    <div className="tab-pane fade show active">
                        <div className="accordion" id="accordionProductos">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#prod1"
                                    >
                                        ¿Los accesorios son originales?
                                    </button>
                                </h2>
                                <div id="prod1" className="accordion-collapse collapse" data-bs-parent="#accordionProductos">
                                    <div className="accordion-body">
                                        Sí, trabajamos con marcas originales y seleccionadas por su calidad y durabilidad.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#prod2"
                                    >
                                        ¿Tienen productos con luces RGB?
                                    </button>
                                </h2>
                                <div id="prod2" className="accordion-collapse collapse" data-bs-parent="#accordionProductos">
                                    <div className="accordion-body">
                                        ¡Claro! Muchos de nuestros teclados, mouse y ventiladores incluyen iluminación RGB.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cuenta */}
                {activeTab === 'cuenta' && (
                    <div className="tab-pane fade show active">
                        <div className="accordion" id="accordionCuenta">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#cuenta1"
                                    >
                                        ¿Necesito una cuenta para comprar?
                                    </button>
                                </h2>
                                <div id="cuenta1" className="accordion-collapse collapse" data-bs-parent="#accordionCuenta">
                                    <div className="accordion-body">
                                        No es obligatorio, pero registrarte te permite hacer seguimiento a tus pedidos y recibir descuentos.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#cuenta2"
                                    >
                                        ¿Cómo recupero mi contraseña?
                                    </button>
                                </h2>
                                <div id="cuenta2" className="accordion-collapse collapse" data-bs-parent="#accordionCuenta">
                                    <div className="accordion-body">
                                        Desde la sección de login, haz clic en "¿Olvidaste tu contraseña?" y sigue las instrucciones.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
