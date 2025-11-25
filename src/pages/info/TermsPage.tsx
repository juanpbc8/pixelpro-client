export default function TermsPage() {
    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">Términos y Condiciones</h2>

            {/* Accordion */}
            <div className="accordion" id="accordionTerminos">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#general"
                        >
                            📦 Condiciones generales
                        </button>
                    </h2>
                    <div id="general" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            Al acceder y utilizar nuestro sitio web, aceptas cumplir con estos Términos y Condiciones. PixelPro se
                            reserva el derecho de modificar cualquier parte del sitio sin previo aviso.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#compra"
                        >
                            🛒 Proceso de compra
                        </button>
                    </h2>
                    <div id="compra" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            El cliente debe asegurarse de que los datos proporcionados sean correctos. Una vez realizado el pago, se
                            enviará una confirmación por correo. Nos reservamos el derecho de rechazar pedidos por sospecha de fraude o
                            stock insuficiente.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#pago"
                        >
                            💳 Métodos de pago
                        </button>
                    </h2>
                    <div id="pago" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            Aceptamos pagos con tarjetas de crédito, débito, transferencias bancarias y otros medios autorizados. Todas
                            las transacciones están protegidas por protocolos de seguridad cifrada.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#envio"
                        >
                            🚚 Envío y entrega
                        </button>
                    </h2>
                    <div id="envio" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            Los plazos de entrega varían según la ubicación del cliente. PixelPro no se responsabiliza por retrasos
                            atribuibles a la empresa de mensajería o por datos de envío incorrectos.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#devoluciones"
                        >
                            🔄 Cambios y devoluciones
                        </button>
                    </h2>
                    <div id="devoluciones" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            Tienes hasta 7 días hábiles para solicitar cambios o devoluciones. El producto debe estar en perfectas
                            condiciones, sin uso, con etiquetas y empaque original. Más detalles en nuestra sección de{' '}
                            <a href="/shipping">Envíos y Devoluciones</a>.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#propiedad"
                        >
                            🔐 Propiedad intelectual
                        </button>
                    </h2>
                    <div id="propiedad" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            Todos los contenidos, logotipos, diseños y textos son propiedad de PixelPro y están protegidos por
                            derechos de autor. Está prohibida su reproducción sin autorización escrita.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#vigencia"
                        >
                            📅 Vigencia y modificaciones
                        </button>
                    </h2>
                    <div id="vigencia" className="accordion-collapse collapse" data-bs-parent="#accordionTerminos">
                        <div className="accordion-body">
                            Estos términos están vigentes desde el 25 de junio de 2025. PixelPro puede modificar sus condiciones en
                            cualquier momento. Se recomienda revisar periódicamente esta sección.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
