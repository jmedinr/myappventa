import React from 'react'
import Logo from '../Logo/Logo.jsx'
import "./Header_Admin.css"
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

function Header_Admin() {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Logo></Logo>
                {isAuthenticated ?
                <Link to="/" className="navbar-brand">
                    atomium
                </Link> : <div className="text-white">atomium</div>}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {isAuthenticated ?
                        <li className="nav-item">
                            <Link to="/agregar_productos" className="nav-link active" aria-current="page" href="#">Agregar Productos</Link>
                        </li>: null}
                        {isAuthenticated ?
                        <li className="nav-item">
                            <a className="nav-link" href="#">Gestion De Vendedores</a>
                        </li> : null}
                        <li className="nav-item dropdown">
                            {isAuthenticated ? null : <a className="nav-link" onClick={() => loginWithRedirect()}>Login</a>}
                            {isAuthenticated ?
                                <div>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={user.picture} />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <div>{user.name}</div>
                                            <p>{user.email}</p>
                                        </li>
                                        <li><Link to="/agregar_productos" className="dropdown-item">Agregar Producto</Link></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-link" onClick={() => logout({ returnTo: window.location.origin })}><button>Logout</button></li>
                                    </ul>
                                </div> : null}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header_Admin