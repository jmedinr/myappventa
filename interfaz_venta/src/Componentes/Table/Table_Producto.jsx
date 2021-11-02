/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import './Table.css'
import "../Filtro_Venta/Filtro_Venta"
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl"
import Modal_Modificar from "../Modal/Modal_Modificar"


function Table_Producto() {
    let idProducto = [], productoP = [], precioP = [], stockP = [];
    let listaVentas2 = [];
    const [productos, setProductos] = useState([]);
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
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
            if (userData.rol == "administrador") {
                localStorage.setItem("state", userData.rol);
                setValidUser("administrador");
            } else if (userData.rol == "vendedor") {
                localStorage.setItem("state", userData.rol);
                setValidUser("vendedor");
            } else {
                setValidUser("");
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

    const getProductos = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/productos`);
            const jsonResponse = await response.json();
            const responseProductos = jsonResponse.data;
            responseProductos.map((vent) => {
                idProducto.push(vent.idproducto);
                productoP.push(vent.producto);
                precioP.push(vent.precio);
                stockP.push(vent.stock);
            }
            );
            for (let i = 0; i < idProducto.length; i++) {
                listaVentas2.push(
                    <>
                        <tr data-bs-toggle="collapse" href={"#hola" + String(idProducto[i])} aria-expanded="false" aria-controls="collapseExample">
                            <td>{idProducto[i]}</td>
                            <td>{productoP[i]}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="collapse" id={"hola" + String(idProducto[i])}>
                                    <div className="container">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Precio: </strong><a>{precioP[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Stock: </strong><a>{stockP[i]}</a></div>
                                            </div>
                                        </div>
                                        {(validUser == "administrador") ?
                                            <div className="container-fluid">
                                                <Modal_Modificar idProductos={idProducto[i]} pproducto={productoP[i]} pprecio={precioP[i]} pstock={stockP[i]}></Modal_Modificar>
                                            </div> : null}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </>
                )
            }
            setProductos(listaVentas2);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            validateUserRole();
            grantAccess();
            getProductos();
        }, 500);
    }, [isAuthenticated, validUser])

    return (
        <div className="containter-fluid p-2">
            <input type="search" class="light-table-filter" data-table="order-table" placeholder="Buscar En La Tabla" />
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <table className="order-table table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Producto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table_Producto