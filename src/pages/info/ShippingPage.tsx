export default function ShippingPage() {
    return (
        <main className="container py-5">
            <h2 className="text-center mb-5">Envíos y Devoluciones</h2>

            <div className="accordion" id="accordionEnviosDevo">
                {/* Envíos */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#envios"
                        >
                            📦 Política de Envío
                        </button>
                    </h2>
                    <div id="envios" className="accordion-collapse collapse" data-bs-parent="#accordionEnviosDevo">
                        <div className="accordion-body">
                            <p>
                                Realizamos envíos a todo el Perú. El tiempo estimado de entrega varía entre 2 a 5 días hábiles dependiendo
                                del destino. Todos nuestros productos son cuidadosamente embalados y enviados con un código de
                                seguimiento.
                            </p>
                            <p>
                                <strong>Costos:</strong> El envío es gratuito para compras mayores a S/200. Para pedidos menores, se
                                aplicará una tarifa de S/15.
                            </p>
                            <p>
                                Trabajamos con couriers confiables como Olva Courier, Urbano y Shalom. Te mantendremos informado(a) de
                                cada paso por correo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Devoluciones */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#devoluciones"
                        >
                            🔁 Política de Devoluciones
                        </button>
                    </h2>
                    <div id="devoluciones" className="accordion-collapse collapse" data-bs-parent="#accordionEnviosDevo">
                        <div className="accordion-body">
                            <p>
                                Puedes devolver un producto dentro de los 7 días hábiles siguientes a la entrega, siempre que el producto
                                esté en perfectas condiciones, sin señales de uso y en su empaque original.
                            </p>
                            <p><strong>Pasos para solicitar una devolución:</strong></p>
                            <ol>
                                <li>Escríbenos a <strong>info@pixelpro.com</strong> con tu número de pedido y motivo de la devolución.</li>
                                <li>Te enviaremos las instrucciones y dirección de retorno.</li>
                                <li>Una vez recibido el producto, te reembolsaremos o enviaremos un nuevo producto según tu elección.</li>
                            </ol>
                            <p>
                                <strong>Importante:</strong> Los gastos de envío en devoluciones corren por cuenta del cliente salvo que
                                se trate de un error nuestro o producto defectuoso.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
