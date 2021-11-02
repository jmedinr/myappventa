/* eslint-disable no-fallthrough */
import React, { useState, useEffect } from "react";
import Logo from '../Logo/Logo.jsx'
import "./Header_Admin.css"
import apiBaseUrl from "../../Componentes/utils/Appiurl"
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

function Header_Admin() {
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
    const [validUser, setValidUser] = useState("");


    const validateUserRole = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/get-vendedores/'${user.email}'`);
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(error);
        }
    }

    const grantAccess = async () => {

        let userData;
        if (isAuthenticated) {
            userData = await validateUserRole();
        }
        else {
            if (!verifySesion()) {
                loginWithRedirect();
            }

            setValidUser("");
            return;
        }

        if (userData) {
            console.log("userData",userData)
            console.log("userData.rol",userData.rol)
            if (userData.rol == "administrador") {
                localStorage.setItem("state", userData.rol);
                setValidUser("administrador");
            }else if (userData.rol == "vendedor"){
                localStorage.setItem("state", userData.rol);
                setValidUser("vendedor");
            }else{
                setValidUser("vendedor");
            }
        }
        else {
            setValidUser("");
        }
    }

    const verifySesion = () => {
        const cookies = document.cookie;
        let state = false;
        if (cookies.includes('auth0')) {
            state = true;
        }
        return state;
    }

    useEffect(() => {
        setTimeout(() => {
            grantAccess();
            validateUserRole();
        }, 500);
    }, [isAuthenticated, validUser])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Logo></Logo>
                {(validUser=="administrador" || validUser=="vendedor") ?
                    <Link to="/" className="navbar-brand">
                        atomium
                    </Link> : <div className="text-white">atomium</div>}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {(validUser=="administrador" || validUser=="vendedor") ?
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" href="#">Gestion De Ventas</Link>
                            </li> : null}
                        {(validUser=="administrador") ?
                            <li className="nav-item">
                                <Link to="/agregar_productos" className="nav-link active" aria-current="page" href="#">Agregar Productos</Link>
                            </li> : null}
                        {(validUser=="administrador") ?
                            <li className="nav-item">
                                <Link to="/gestion_vendedores" className="nav-link active" aria-current="page" href="#">Gestion De Vendedores</Link>
                            </li> : null}
                        <li className="nav-item dropdown">
                            {(validUser=="administrador" || validUser=="vendedor") ? null : <a className="nav-link" onClick={() => loginWithRedirect()}>Login</a>}
                            {(validUser=="administrador" || validUser=="vendedor") ?
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