import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="flex-grow-1 w-100">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
