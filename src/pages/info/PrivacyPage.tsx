export default function PrivacyPage() {
    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">Política de Privacidad</h2>

            <div className="accordion" id="accordionPolitica">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#info"
                        >
                            🔒 Información que recopilamos
                        </button>
                    </h2>
                    <div id="info" className="accordion-collapse collapse" data-bs-parent="#accordionPolitica">
                        <div className="accordion-body">
                            Recopilamos información personal como nombre, correo electrónico, dirección y número telefónico cuando
                            realizas una compra o te registras en nuestra tienda. También almacenamos información sobre tus preferencias
                            de productos, historial de pedidos y navegación.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#uso"
                        >
                            🎯 Uso de la información
                        </button>
                    </h2>
                    <div id="uso" className="accordion-collapse collapse" data-bs-parent="#accordionPolitica">
                        <div className="accordion-body">
                            Utilizamos tu información para procesar tus pedidos, enviarte actualizaciones, ofrecer atención
                            personalizada, y mejorar la experiencia en nuestra tienda. También podemos enviarte promociones o novedades
                            si lo autorizas.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#compartir"
                        >
                            📤 Compartir información
                        </button>
                    </h2>
                    <div id="compartir" className="accordion-collapse collapse" data-bs-parent="#accordionPolitica">
                        <div className="accordion-body">
                            No vendemos ni alquilamos tu información a terceros. Solo compartimos datos con servicios de logística,
                            pasarelas de pago y plataformas necesarias para la operación del negocio, bajo acuerdos de confidencialidad.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#seguridad"
                        >
                            ⚙️ Seguridad de los datos
                        </button>
                    </h2>
                    <div id="seguridad" className="accordion-collapse collapse" data-bs-parent="#accordionPolitica">
                        <div className="accordion-body">
                            Implementamos medidas de seguridad físicas, electrónicas y administrativas para proteger tu información.
                            Nuestro sitio cuenta con certificados SSL para cifrado y servidores seguros.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#derechos"
                        >
                            📬 Tus derechos
                        </button>
                    </h2>
                    <div id="derechos" className="accordion-collapse collapse" data-bs-parent="#accordionPolitica">
                        <div className="accordion-body">
                            Puedes solicitar en cualquier momento la actualización, corrección o eliminación de tus datos personales
                            escribiéndonos a <strong>info@pixelpro.com</strong>. También puedes desuscribirte de nuestras campañas de
                            correo en cualquier momento.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#cambios"
                        >
                            📆 Cambios en esta política
                        </button>
                    </h2>
                    <div id="cambios" className="accordion-collapse collapse" data-bs-parent="#accordionPolitica">
                        <div className="accordion-body">
                            Esta política puede actualizarse ocasionalmente. Notificaremos cualquier cambio importante a través de
                            nuestra web o correo electrónico. Fecha de la última actualización: <strong>25 de junio de 2025</strong>.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
