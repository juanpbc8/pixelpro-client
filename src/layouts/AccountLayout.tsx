import { Outlet, Link } from 'react-router-dom';
import AccountSidebar from '../components/account/AccountSidebar';

export default function AccountLayout() {
    return (
        <div className="container my-5">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none">
                            Inicio
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Mi Perfil
                    </li>
                </ol>
            </nav>

            {/* Título Principal */}
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="h2 fw-bold d-flex align-items-center">
                        <i className="bi bi-person-circle me-3 text-primary fs-1"></i>
                        Mi Perfil
                    </h1>
                    <p className="text-muted">
                        Administra tu información personal y configuraciones de cuenta
                    </p>
                </div>
            </div>

            {/* Layout: Sidebar + Content */}
            <div className="row">
                {/* Sidebar de navegación */}
                <div className="col-lg-3 col-md-4 mb-4">
                    <AccountSidebar />
                </div>

                {/* Contenido principal */}
                <div className="col-lg-9 col-md-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
