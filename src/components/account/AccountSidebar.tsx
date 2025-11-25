import { NavLink } from 'react-router-dom';

export default function AccountSidebar() {
    return (
        <div className="card">
            <div className="card-body p-0">
                <div className="list-group list-group-flush">
                    <NavLink
                        to="/account/profile"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-person me-2"></i>
                        Información Personal
                    </NavLink>
                    <NavLink
                        to="/account/addresses"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-geo-alt me-2"></i>
                        Direcciones
                    </NavLink>
                    <NavLink
                        to="/account/orders"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-bag-check me-2"></i>
                        Mis Pedidos
                    </NavLink>
                    <NavLink
                        to="/account/settings"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className="bi bi-gear me-2"></i>
                        Configuración
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
