import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AppLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 container py-4" style={{ marginTop: '70px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout