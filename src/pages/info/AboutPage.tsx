export default function AboutPage() {
    return (
        <div>
            {/* Hero Banner with Background Image */}
            <section
                className="position-relative d-flex align-items-center justify-content-center text-white"
                style={{
                    height: '400px',
                    backgroundImage: 'url(/assets/imgs/img-quienesSomos.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                ></div>

                {/* Hero Content */}
                <div className="position-relative text-center px-3">
                    <h1 className="display-4 fw-bold mb-3">Sobre PixelPro</h1>
                    <p className="lead">Tu socio experto en tecnología desde 2020</p>
                </div>
            </section>

            {/* Section 1: Our Story */}
            <section className="container my-5 py-5">
                <div className="row align-items-center g-4">
                    {/* Left - Text */}
                    <div className="col-lg-6">
                        <h2 className="mb-4">Nuestra Historia</h2>
                        <p className="text-muted mb-3">
                            PixelPro nació en 2020 con una visión clara: democratizar el acceso a componentes y accesorios
                            de computación de alta calidad en el mercado peruano. Empezamos como un pequeño emprendimiento
                            con pasión por la tecnología y un compromiso inquebrantable con nuestros clientes.
                        </p>
                        <p className="text-muted mb-3">
                            Hoy, nos hemos convertido en un referente para gamers, profesionales y entusiastas de la
                            tecnología que buscan productos confiables, asesoramiento experto y un servicio al cliente
                            excepcional. Cada producto que vendemos lleva nuestro sello de calidad y garantía.
                        </p>
                        <p className="text-muted">
                            Nuestro equipo está formado por expertos apasionados que entienden tus necesidades tecnológicas
                            y están comprometidos en ayudarte a encontrar la solución perfecta para tu setup.
                        </p>
                    </div>

                    {/* Right - Image */}
                    <div className="col-lg-6">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
                            alt="Equipo PixelPro"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </section>

            {/* Section 2: Mission & Vision Cards */}
            <section className="bg-light py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* Misión Card */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-bullseye text-primary me-3" style={{ fontSize: '3rem' }}></i>
                                        <h3 className="mb-0">Misión</h3>
                                    </div>
                                    <p className="text-muted mb-0">
                                        Ofrecer a entusiastas de la tecnología, gamers y profesionales los mejores accesorios y
                                        componentes de computación, garantizando productos de alta calidad, un rendimiento superior
                                        y un servicio al cliente excepcional para optimizar y personalizar su experiencia digital.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visión Card */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-eye text-success me-3" style={{ fontSize: '3rem' }}></i>
                                        <h3 className="mb-0">Visión</h3>
                                    </div>
                                    <p className="text-muted mb-0">
                                        Ser el destino líder y de confianza a nivel nacional para todo lo relacionado con el hardware
                                        de computación, impulsando la innovación en la industria y empoderando a nuestra comunidad
                                        para construir y mejorar sus equipos soñados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Why Choose Us (Values Grid) */}
            <section className="container my-5 py-5">
                <div className="text-center mb-5">
                    <h2 className="mb-3">¿Por qué elegir PixelPro?</h2>
                    <p className="text-muted lead">Compromiso con la excelencia en cada aspecto</p>
                </div>

                <div className="row g-4 text-center">
                    {/* Value 1 */}
                    <div className="col-md-4">
                        <div className="p-4">
                            <i className="bi bi-shield-check text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mb-3">Garantía Real</h4>
                            <p className="text-muted">
                                Todos nuestros productos cuentan con garantía oficial. Tu inversión está protegida.
                            </p>
                        </div>
                    </div>

                    {/* Value 2 */}
                    <div className="col-md-4">
                        <div className="p-4">
                            <i className="bi bi-headset text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mb-3">Soporte Experto</h4>
                            <p className="text-muted">
                                Nuestro equipo técnico te asesora antes, durante y después de tu compra.
                            </p>
                        </div>
                    </div>

                    {/* Value 3 */}
                    <div className="col-md-4">
                        <div className="p-4">
                            <i className="bi bi-truck text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mb-3">Envíos Rápidos</h4>
                            <p className="text-muted">
                                Entrega a todo el Perú en 2-5 días. Envío gratis en compras mayores a S/200.
                            </p>
                        </div>
                    </div>

                    {/* Value 4 */}
                    <div className="col-md-4">
                        <div className="p-4">
                            <i className="bi bi-award text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mb-3">Productos Originales</h4>
                            <p className="text-muted">
                                Trabajamos directamente con marcas reconocidas. 100% productos auténticos.
                            </p>
                        </div>
                    </div>

                    {/* Value 5 */}
                    <div className="col-md-4">
                        <div className="p-4">
                            <i className="bi bi-cash-coin text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mb-3">Precios Competitivos</h4>
                            <p className="text-muted">
                                Ofrecemos los mejores precios del mercado sin comprometer la calidad.
                            </p>
                        </div>
                    </div>

                    {/* Value 6 */}
                    <div className="col-md-4">
                        <div className="p-4">
                            <i className="bi bi-people text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mb-3">Comunidad Activa</h4>
                            <p className="text-muted">
                                Únete a nuestra comunidad de más de 10,000 clientes satisfechos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="bg-light py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="mb-3">Marcas Destacadas</h2>
                        <p className="text-muted">Trabajamos con las mejores marcas del mercado</p>
                    </div>

                    <div className="row align-items-center g-4">
                        <div className="col-md-4">
                            <div className="text-center">
                                <img src="/assets/imgs/logo-marcaAsus.webp" className="img-fluid rounded shadow-sm" alt="Asus" style={{ maxHeight: '120px' }} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <img src="/assets/imgs/logo-marcaLg.webp" className="img-fluid rounded shadow-sm" alt="LG" style={{ maxHeight: '120px' }} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <img src="/assets/imgs/logo-marcaSamsung.webp" className="img-fluid rounded shadow-sm" alt="Samsung" style={{ maxHeight: '120px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
