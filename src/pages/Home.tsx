export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section d-flex align-items-center text-start">
                <div className="container">
                    <span className="badge bg-danger mb-2">¡Bienvenido a PixelPro!</span>
                    <h1 className="display-5 fw-bold">
                        Encuentra los mejores productos
                        <br />
                        para tu computadora y accesorios a precios increíbles
                    </h1>
                    <p className="mt-3">Obtén más por tu dinero</p>
                    <a href="/shop" className="btn btn-primary btn-lg">
                        Explorar productos
                    </a>
                </div>
            </section>

            {/* Sección Beneficios */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row text-center g-4">
                        {/* Opción 1 */}
                        <div className="col-12 col-md-3">
                            <i className="bi bi-scooter fs-1 text-primary"></i>
                            <h6 className="mt-3 fw-bold">Recogida en tienda disponible</h6>
                        </div>

                        {/* Opción 2 */}
                        <div className="col-12 col-md-3">
                            <i className="bi bi-box-seam fs-1 text-primary"></i>
                            <h6 className="mt-3 fw-bold">Envío gratuito en compras superiores a $100</h6>
                        </div>

                        {/* Opción 3 */}
                        <div className="col-12 col-md-3">
                            <i className="bi bi-percent fs-1 text-primary"></i>
                            <h6 className="mt-3 fw-bold">Precios garantizados</h6>
                        </div>

                        {/* Opción 4 */}
                        <div className="col-12 col-md-3">
                            <i className="bi bi-clock-history fs-1 text-primary"></i>
                            <h6 className="mt-3 fw-bold">Disponible las 24 horas, los 7 días de la semana</h6>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección Más Populares */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Más populares</h2>

                    <div className="row g-4 justify-content-center" id="productosContainer">
                        {/* Producto 1 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 producto">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Monitor_ASUS_TUF_GAMING_24.webp"
                                        className="card-img-top"
                                        alt="Monitor Ultra HD"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Monitor Ultra HD</h6>
                                    <p className="text-primary fw-bold">S/.1199.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 2 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 producto">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Monitor_ASUS_TUF_GAMING_CURVADO_27.webp"
                                        className="card-img-top"
                                        alt="Monitor Curvo 144Hz"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Monitor Curvo 144Hz</h6>
                                    <p className="text-primary fw-bold">S/.1599.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 3 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 producto">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/HyperX_Cloud_Stinger_Bluetooth.webp"
                                        className="card-img-top"
                                        alt="Mouse Inalámbrico"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Audifono Inalámbrico</h6>
                                    <p className="text-primary fw-bold">S/.399.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 4  */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 producto">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Monitor_Samsung_Odyssey_G3_27.webp"
                                        className="card-img-top"
                                        alt="Monitor LED 1080p"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Monitor LED 1080p</h6>
                                    <p className="text-primary fw-bold">S/.1399.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="text-center mt-5">
                        <a href="/shop" className="btn btn-outline-primary">
                            Ver todo
                        </a>
                    </div>
                </div>
            </section>

            {/* Sección Explorar por Categoría */}
            <section className="py-5 bg-white">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Explorar por categoría</h2>
                    <div className="row text-center g-4 justify-content-center">
                        {/* Monitores */}
                        <div className="col-6 col-md-2">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                                    style={{ width: '120px', height: '120px', overflow: 'hidden' }}
                                >
                                    <img src="/assets/imgs/Monitor_LG_24GN65R_24.webp" alt="Monitores" className="img-fluid" />
                                </div>
                                <p className="mt-2">Monitores</p>
                            </div>
                        </div>

                        {/* Teclados */}
                        <div className="col-6 col-md-2">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                                    style={{ width: '120px', height: '120px', overflow: 'hidden' }}
                                >
                                    <img
                                        src="/assets/imgs/Teclado_logitech_G_Pro_TKL_USB.webp"
                                        alt="Teclados"
                                        className="img-fluid"
                                    />
                                </div>
                                <p className="mt-2">Teclados</p>
                            </div>
                        </div>

                        {/* Ratones */}
                        <div className="col-6 col-md-2">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                                    style={{ width: '120px', height: '120px', overflow: 'hidden' }}
                                >
                                    <img src="/assets/imgs/HyperX_Pulsefire_Raid_USB.webp" alt="Ratones" className="img-fluid" />
                                </div>
                                <p className="mt-2">Mouses</p>
                            </div>
                        </div>

                        {/* Audífonos */}
                        <div className="col-6 col-md-2">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                                    style={{ width: '120px', height: '120px', overflow: 'hidden' }}
                                >
                                    <img src="/assets/imgs/JBL_Quantum_350_USB.webp" alt="Audífonos" className="img-fluid" />
                                </div>
                                <p className="mt-2">Audífonos</p>
                            </div>
                        </div>

                        {/* Tarjetas Gráficas */}
                        <div className="col-6 col-md-2">
                            <div className="d-flex flex-column align-items-center">
                                <div
                                    className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                                    style={{ width: '120px', height: '120px', overflow: 'hidden' }}
                                >
                                    <img src="/assets/imgs/RTX_4060.webp" alt="Tarjetas Gráficas" className="img-fluid" />
                                </div>
                                <p className="mt-2">Tarjetas Gráficas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner Promocional */}
            <section className="banner-promocional">
                <div className="banner-promocional-container">
                    <div className="banner-promocional-img">
                        <img src="/assets/imgs/tecladosyratonesgamer.webp" alt="Promoción Teclados y Ratones" />
                    </div>
                    <div className="banner-promocional-text">
                        <h2>Ahorra hasta s/150 en teclados y ratones</h2>
                        <p>Se aplican condiciones.</p>
                        <a href="/shop" className="btn-promo">
                            Ver más
                        </a>
                    </div>
                </div>
            </section>

            {/* Ofertas especiales */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Ofertas Especiales</h2>

                    <div className="row g-4 justify-content-center">
                        {/* Producto 1 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Monitor_Samsung_Odyssey_G3_24.webp"
                                        className="card-img-top"
                                        alt="Monitor Ultra HD"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Monitor Ultra HD</h6>
                                    <p className="text-primary fw-bold">S/.999.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 2 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Monitor_ASUS_TUF_GAMING_27.webp"
                                        className="card-img-top"
                                        alt="Monitor Curvo 144Hz"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Monitor Curvo 144Hz</h6>
                                    <p className="text-primary fw-bold">S/.1299.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 3 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/HyperX_Pulsefire_Raid_Bluetooth.webp"
                                        className="card-img-top"
                                        alt="Mouse Inalámbrico"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Mouse Inalámbrico</h6>
                                    <p className="text-primary fw-bold">S/.40.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 4 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Teclado_Razer_BlackWidow_V4_Pro_USB.webp"
                                        className="card-img-top"
                                        alt="Teclado Mecánico"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Teclado Mecánico</h6>
                                    <p className="text-primary fw-bold">S/.1499.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 5 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Razer_Basilisk_V3_Bluetooth.webp"
                                        className="card-img-top"
                                        alt="Mouse Ergonómico"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Mouse Inalámbrico</h6>
                                    <p className="text-primary fw-bold">S/.699.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Producto 6 */}
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="ratio ratio-1x1">
                                    <img
                                        src="/assets/imgs/Logitech_G335_Bluetooth.webp"
                                        className="card-img-top"
                                        alt="Monitor LED 1080p"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h6 className="card-title">Audifono Inalámbrico</h6>
                                    <p className="text-primary fw-bold">S/.250.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="text-center mt-5">
                        <a href="/shop" className="btn btn-outline-primary">
                            Ver todo
                        </a>
                    </div>
                </div>
            </section>

            <section className="especial-dia">
                <div className="especial-dia-contenido">
                    <h2 className="titulo">¡Especial del día!</h2>
                    <p className="descuento">30% de descuento</p>
                    <div className="promo-text">
                        <h2>Mas FPS en monitores gamer</h2>
                        <p>Stock limitado</p>
                        <a href="#" className="btn-promo">
                            Ver más
                        </a>
                    </div>
                </div>
                <div className="especial-dia-imagen">
                    <img src="/assets/imgs/Monitor_Samsung_Odyssey_G3_27.webp" alt="Monitor en oferta" />
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-5" style={{ backgroundColor: '#6a0dad', color: 'white' }}>
                <div className="container text-center">
                    <h5 className="fw-bold">Recibe nuestro boletín</h5>
                    <p className="mb-4">Regístrate para recibir noticias sobre nuevos productos y ofertas exclusivas</p>
                    <form className="d-flex justify-content-center">
                        <input
                            type="email"
                            className="form-control w-50 rounded-start-pill"
                            placeholder="Ingresa tu email aquí"
                        />
                        <button className="btn btn-dark rounded-end-pill">Suscribirse</button>
                    </form>
                    <small className="d-block mt-2">¡Gracias por tu suscripción!</small>
                </div>
            </section>

            {/* Ayuda */}
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Texto */}
                        <div className="col-md-6 text-white p-5" style={{ backgroundColor: '#000' }}>
                            <h4 className="fw-bold">¿Buscas ayuda? Ve a la página de Ayuda</h4>
                            <p>Lee las preguntas frecuentes o contáctanos para obtener asistencia personalizada.</p>
                            <a href="/preguntas-frecuentes" className="btn btn-primary rounded-pill">
                                Ir al Centro de ayuda
                            </a>
                        </div>
                        {/* Imagen */}
                        <div className="col-md-6 p-0">
                            <img src="/assets/imgs/centrodeayuda.webp" className="img-fluid w-100 h-100" alt="Centro de Ayuda" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
