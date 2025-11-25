import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';

export default function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories, loading: loadingCategories } = useCategories();

    // Get filters from URL params (URL as source of truth)
    const categoryId = searchParams.get('category') ? Number(searchParams.get('category')) : undefined;
    const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 0;
    const searchQuery = searchParams.get('search') || undefined;

    // Usar el hook useProducts con filtros desde URL
    const { products: apiProducts, page, loading: loadingProducts, error: errorProducts } = useProducts({
        categoryId,
        search: searchQuery,
        page: currentPage,
        size: 12,
    });

    const handleCategoryChange = (newCategoryId: number | undefined) => {
        const newParams = new URLSearchParams(searchParams);

        if (newCategoryId === undefined) {
            newParams.delete('category');
        } else {
            newParams.set('category', newCategoryId.toString());
        }

        // Reset page when changing filters
        newParams.delete('page');

        setSearchParams(newParams);
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);

        if (newPage === 0) {
            newParams.delete('page');
        } else {
            newParams.set('page', newPage.toString());
        }

        setSearchParams(newParams);

        // Scroll to top of products section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate pagination items
    const renderPaginationItems = () => {
        if (!page || page.totalPages <= 1) return null;

        const items = [];
        const totalPages = page.totalPages;
        const current = page.number;

        // Always show first page
        items.push(
            <li key={0} className={`page-item ${current === 0 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(0)}>
                    1
                </button>
            </li>
        );

        // Show ellipsis if needed
        if (current > 2) {
            items.push(
                <li key="ellipsis-start" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
        }

        // Show pages around current page
        for (let i = Math.max(1, current - 1); i <= Math.min(totalPages - 2, current + 1); i++) {
            items.push(
                <li key={i} className={`page-item ${current === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }

        // Show ellipsis if needed
        if (current < totalPages - 3) {
            items.push(
                <li key="ellipsis-end" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            items.push(
                <li key={totalPages - 1} className={`page-item ${current === totalPages - 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>
                        {totalPages}
                    </button>
                </li>
            );
        }

        return items;
    };

    return (
        <>
            {/* Título */}
            <section className="py-5 bg-light text-center">
                <div className="container">
                    <h1 className="fw-bold">Nuestros Accesorios</h1>
                    <p className="lead">Explora nuestra colección de productos disponibles</p>
                </div>
            </section>

            {/* Catálogo con filtros */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        {/* FILTROS (columna izquierda) */}
                        <aside className="col-12 col-md-3 mb-4">
                            <div className="card shadow-sm border-0 p-3">
                                <h5 className="fw-bold">Filtros</h5>
                                <hr />
                                {/* Categorías dinámicas */}
                                <h6 className="fw-semibold">Categoría</h6>
                                {loadingCategories ? (
                                    <div className="text-center py-2">
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="category"
                                                id="filtroTodos"
                                                checked={categoryId === undefined}
                                                onChange={() => handleCategoryChange(undefined)}
                                            />
                                            <label className="form-check-label" htmlFor="filtroTodos">
                                                Todas las categorías
                                            </label>
                                        </div>
                                        {categories.map((category) => (
                                            <div className="form-check" key={category.id}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="category"
                                                    value={category.id}
                                                    id={`filtro${category.id}`}
                                                    checked={categoryId === category.id}
                                                    onChange={() => handleCategoryChange(category.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`filtro${category.id}`}>
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </aside>

                        {/* PRODUCTOS (columna derecha) */}
                        <div className="col-12 col-md-9">
                            {loadingProducts ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando productos...</span>
                                    </div>
                                    <p className="mt-3 text-muted">Cargando productos...</p>
                                </div>
                            ) : errorProducts ? (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Error al cargar productos: {errorProducts}
                                </div>
                            ) : (
                                <>
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="listaProductos">
                                        {apiProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {apiProducts.length === 0 && (
                                        <div className="alert alert-warning text-center mt-4">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            No se encontraron productos con los filtros seleccionados.
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    {page && page.totalPages > 1 && (
                                        <nav aria-label="Product pagination" className="mt-5">
                                            <ul className="pagination justify-content-center">
                                                {/* Previous Button */}
                                                <li className={`page-item ${page.first ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(page.number - 1)}
                                                        disabled={page.first}
                                                        aria-label="Previous"
                                                    >
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </button>
                                                </li>

                                                {/* Page Numbers */}
                                                {renderPaginationItems()}

                                                {/* Next Button */}
                                                <li className={`page-item ${page.last ? 'disabled' : ''}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(page.number + 1)}
                                                        disabled={page.last}
                                                        aria-label="Next"
                                                    >
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
