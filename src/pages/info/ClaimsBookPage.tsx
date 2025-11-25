import { type FormEvent, useState } from 'react';

export default function ClaimsBookPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        alert('✅ Reclamo enviado correctamente.');
        setSubmitted(true);
    };

    const handleDownloadPDF = () => {
        // Simple implementation - in production you'd use a library like html2pdf or jsPDF
        window.print();
    };

    return (
        <main className="container flex-grow-1 py-5" style={{ maxWidth: '900px' }}>
            <h1 className="text-center fs-2 mb-4">Libro de Reclamaciones</h1>

            <div id="reclamoPDF">
                <form id="formReclamo" className="needs-validation" noValidate onSubmit={handleSubmit}>
                    {/* Datos del Consumidor */}
                    <fieldset>
                        <legend className="pt-4 pb-2">Datos del Consumidor</legend>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre completo:</label>
                            <input type="text" id="nombre" name="nombre" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI:</label>
                            <input type="text" id="dni" name="dni" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo electrónico:</label>
                            <input type="email" id="correo" name="correo" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono:</label>
                            <input type="tel" id="telefono" name="telefono" className="form-control" required />
                        </div>
                    </fieldset>

                    {/* Detalles del Reclamo */}
                    <fieldset>
                        <legend className="pt-5 pb-2">Detalles del reclamo</legend>
                        <div className="mb-3">
                            <label htmlFor="producto" className="form-label">Producto o servicio:</label>
                            <input type="text" id="producto" name="producto" className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo de mensaje:</label>
                            <select id="tipo" name="tipo" className="form-select" required>
                                <option value="">Seleccione...</option>
                                <option value="queja">Queja</option>
                                <option value="reclamo">Reclamo</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción del reclamo:</label>
                            <textarea id="descripcion" name="descripcion" rows={4} className="form-control" required></textarea>
                        </div>
                    </fieldset>

                    {/* Pedido del Cliente */}
                    <fieldset>
                        <legend className="pt-5 pb-2">Pedido del Cliente</legend>
                        <div className="mb-3">
                            <label htmlFor="pedido" className="form-label">¿Qué solución espera?</label>
                            <textarea id="pedido" name="pedido" rows={2} className="form-control" required></textarea>
                        </div>
                    </fieldset>

                    <button type="submit" className="btn btn-primary w-100 my-4">
                        Enviar Reclamo
                    </button>
                </form>
            </div>

            {/* Botón PDF */}
            {submitted && (
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleDownloadPDF}
                    >
                        📄 Descargar Reclamo en PDF
                    </button>
                </div>
            )}
        </main>
    );
}
