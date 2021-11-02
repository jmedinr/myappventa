/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import './Table.css'
import "../Filtro_Venta/Filtro_Venta"
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl"
import Modal_Modificar_Admin from "../Modal/Modal_Mod_Adm"
import * as moment from 'moment'


function Table_Admin() {
    let idVenta = [], productoventa = [], fechainicial = [], fechafinal = [], tipomercado = [], estadoventa = [], cantidadventa = [], totalventa = [], vendedorventa = [], documentoventa = [], clienteventa = [];
    let listaVentas2 = [];
    const [ventas, setVentas] = useState([]);
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

    const getVentas = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/ventas`);
            const jsonResponse = await response.json();
            const responseVentas = jsonResponse.data;
            responseVentas.map((vent) => {
                idVenta.push(vent.idventa);
                productoventa.push(vent.producto);
                fechainicial.push(moment(vent.fechaInicial).format('YYYY-MM-DD'));
                fechafinal.push(moment(vent.fechaFinal).format('YYYY-MM-DD'));
                tipomercado.push(vent.tipoMercado);
                estadoventa.push(vent.estado);
                cantidadventa.push(vent.cantidad);
                totalventa.push(vent.total_venta);
                vendedorventa.push(vent.vendedor);
                documentoventa.push(vent.documentocliente);
                clienteventa.push(vent.cliente);
            }
            );
            for (let i = 0; i < idVenta.length; i++) {
                listaVentas2.push(
                    <>
                        <tr data-bs-toggle="collapse" href={"#hola" + String(idVenta[i])} aria-expanded="false" aria-controls="collapseExample">
                            <td>{idVenta[i]}</td>
                            <td>{documentoventa[i]}</td>
                            <td>{clienteventa[i]}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="collapse" id={"hola" + String(idVenta[i])}>
                                    <div className="container">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Creada por: </strong><a>{vendedorventa[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Fecha de Inicio: </strong><a>{fechainicial[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Producto: </strong><a>{productoventa[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Fecha de Pago: </strong><a>{fechafinal[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Mercado: </strong><a>{tipomercado[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Estado: </strong><a>{estadoventa[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Cantidad: </strong><a>{cantidadventa[i]}</a></div>
                                            </div>
                                            <div className="col-6">
                                                <div className="p-3 border bg-light"><strong>Total Venta: </strong><a>{totalventa[i]}</a></div>
                                            </div>
                                        </div>
                                        {(validUser == "administrador" || validUser == "vendedor") ?
                                            <div className="container-fluid">
                                                <Modal_Modificar_Admin idVentas={idVenta[i]} Pventa={productoventa[i]} finicial={fechainicial[i]} ffinal={fechafinal[i]} tmercado={tipomercado[i]} eventa={estadoventa[i]} caventa={cantidadventa[i]} tventa={totalventa[i]} vventa={vendedorventa[i]} dventa={documentoventa[i]} cventa={clienteventa[i]}></Modal_Modificar_Admin>
                                            </div> : null}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </>
                )
            }
            setVentas(listaVentas2);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            validateUserRole();
            grantAccess();
            getVentas();
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
                                        <th>Documento Del Cliente</th>
                                        <th>Nombre Del Cliente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventas}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table_Admin