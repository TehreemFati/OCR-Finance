import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">OCR Finance</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        to="/invoices"
                                        end
                                    >
                                        Invoices
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        to="/invoices/new"
                                    >
                                        Upload Invoice
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {/* <div className="d-flex">
                        {isAuthenticated ? (
                            <button className="btn btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <NavLink className="btn btn-outline-light" to="/login">
                                Login
                            </NavLink>
                        )}
                    </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Header;