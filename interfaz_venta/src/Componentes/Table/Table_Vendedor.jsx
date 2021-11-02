/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import './Table.css'
import "../Filtro_Venta/Filtro_VentaV"
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl"
import Modal_Mod_Ven from "../Modal/Modal_Mod_Ven"


function Table_Vendedor() {
    let idVendedor = [], nombreV = [], rolV = [], correoV = [];
    let listaVentas2 = [];
    const [vendedores, setVendedores] = useState([]);
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

    const getVendedores = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/vendedores`);
            const jsonResponse = await response.json();
            const responseVendedores = jsonResponse.data;
            responseVendedores.map((vent) => {
                idVendedor.push(vent.idvendedor);
                nombreV.push(vent.nombreVendedor);
                rolV.push(vent.rol);
                correoV.push(vent.correo);
            }
            );
            for (let i = 0; i < idVendedor.length; i++) {
                listaVentas2.push(
                    <>
                        <tr data-bs-toggle="collapse" href={"#hola" + String(idVendedor[i])} aria-expanded="false" aria-controls="collapseExample">
                            <td>{idVendedor[i]}</td>
                            <td>{nombreV[i]}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="collapse" id={"hola" + String(idVendedor[i])}>
                                    <div className="container">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Rol: </strong><a>{rolV[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Correo: </strong><a>{correoV[i]}</a></div>
                                            </div>
                                        </div>
                                        {(validUser == "administrador") ?
                                            <div className="container-fluid">
                                                <Modal_Mod_Ven idVendedores={idVendedor[i]} vnombre={nombreV[i]} vrol={rolV[i]} vcorreo={correoV[i]}></Modal_Mod_Ven>
                                            </div> : null}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </>
                )
            }
            setVendedores(listaVentas2);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            validateUserRole();
            grantAccess();
            getVendedores();
        }, 500);
    }, [isAuthenticated, validUser])

    return (
        <div className="containter-fluid p-2">
            <div className="container-fluid">
                <input type="search" class="light-table-filter" data-table="order-table" placeholder="Buscar En La Tabla" />
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <table className="order-table table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Vendedor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendedores}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table_Vendedor