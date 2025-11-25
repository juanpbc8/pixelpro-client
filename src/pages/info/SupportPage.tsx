export default function SupportPage() {
    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">Centro de Asistencia</h2>
            <p className="text-center lead mb-5">
                ¿Necesitas ayuda? Estamos aquí para ti. Contáctanos por cualquiera de nuestros canales.
            </p>

            <div className="row g-4">
                {/* Contact Info */}
                <div className="col-lg-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">
                                <i className="bi bi-telephone text-primary me-2"></i>
                                Información de Contacto
                            </h5>

                            <div className="mb-3">
                                <h6 className="fw-bold">Teléfono</h6>
                                <p className="mb-1">
                                    <i className="bi bi-phone me-2"></i>
                                    <a href="tel:+51999999999" className="text-decoration-none">
                                        +51 999 999 999
                                    </a>
                                </p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">Correo Electrónico</h6>
                                <p className="mb-1">
                                    <i className="bi bi-envelope me-2"></i>
                                    <a href="mailto:info@pixelpro.com" className="text-decoration-none">
                                        info@pixelpro.com
                                    </a>
                                </p>
                                <p className="mb-0 text-muted small">
                                    Respuesta en menos de 24 horas hábiles
                                </p>
                            </div>

                            <div className="mb-3">
                                <h6 className="fw-bold">WhatsApp</h6>
                                <p className="mb-1">
                                    <i className="bi bi-whatsapp me-2"></i>
                                    <a
                                        href="https://wa.me/51999999999"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        +51 999 999 999
                                    </a>
                                </p>
                                <p className="mb-0 text-muted small">
                                    Disponible de Lunes a Viernes
                                </p>
                            </div>

                            <div>
                                <h6 className="fw-bold">Ubicación</h6>
                                <p className="mb-1">
                                    <i className="bi bi-geo-alt me-2"></i>
                                    Av. Tecnología 123, Lima, Perú
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="col-lg-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-4">
                                <i className="bi bi-clock text-success me-2"></i>
                                Horario de Atención
                            </h5>

                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold">Lunes - Viernes</td>
                                        <td className="text-end">9:00 AM - 6:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Sábado</td>
                                        <td className="text-end">10:00 AM - 2:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Domingo</td>
                                        <td className="text-end">Cerrado</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Feriados</td>
                                        <td className="text-end">Cerrado</td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr />

                            <h6 className="fw-bold mt-4">Atención Online</h6>
                            <p className="mb-0 text-muted small">
                                Nuestro equipo de soporte está disponible por correo electrónico 24/7.
                                Responderemos tu consulta lo antes posible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Link */}
            <div className="alert alert-light border mt-5">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h5 className="mb-2">
                            <i className="bi bi-question-circle me-2"></i>
                            ¿Tienes una pregunta frecuente?
                        </h5>
                        <p className="mb-0 text-muted">
                            Consulta nuestra sección de Preguntas Frecuentes antes de contactarnos.
                        </p>
                    </div>
                    <a href="/faq" className="btn btn-primary">
                        Ver FAQ
                    </a>
                </div>
            </div>

            {/* Social Media */}
            <div className="card shadow-sm mt-4">
                <div className="card-body text-center">
                    <h5 className="card-title mb-3">Síguenos en Redes Sociales</h5>
                    <div className="d-flex justify-content-center gap-3">
                        <a href="#" className="btn btn-outline-primary btn-lg">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="btn btn-outline-info btn-lg">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#" className="btn btn-outline-danger btn-lg">
                            <i className="bi bi-youtube"></i>
                        </a>
                        <a href="#" className="btn btn-outline-danger btn-lg">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
