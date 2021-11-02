/* eslint-disable no-fallthrough */
import React, { useEffect, useState, Fragment } from 'react';
import './Body.css'
import { Modal, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl";
import * as moment from 'moment'

const Body = () => {
    let precios = []
    let cantidades = []
    let productos = [];
    let vendedores = [];
    const [total, setTotal] = useState(0);
    const [inputCantidad, setinputCantidad] = useState(0);
    const [counter, setCounter] = useState(0);
    const [listProducto, setListProducto] = useState([]);
    const [listPrecios, setListPrecios] = useState(0);
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [postVendedor, setPostVendedor] = useState(null);
    const [postTmercado, setPostTmercado] = useState("Tienda Virtual");
    const [postTDCliente, setPostDCliente] = useState(null);
    const [postTNCliente, setPostNCliente] = useState(null);
    const [postTEstado, setPostEstado] = useState("En Progreso");
    const [value, setValue] = useState("");
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [listVendedores, setListVendedores] = useState([]);
    const [validUser, setValidUser] = useState("");
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleShow = async () => {
        let stockventa = []
        const response = await fetch(`${apiBaseUrl}/productosstock/'${value}'`);
        const jsonResponse = await response.json();
        const liststockventa = jsonResponse.data;
        liststockventa.map((st) => {
            return stockventa.push(st.stock)
        })
        const stocknuevo = stockventa[0] - total;
        const postData = {
            producto: value,
            fechaInicial: checkInDate,
            fechaFinal: checkOutDate,
            tipoMercado: postTmercado,
            estado: postTEstado,
            cantidad: total,
            total_venta: counter,
            vendedor: postVendedor,
            documentocliente: postTDCliente,
            cliente: postTNCliente
        };
        if (stocknuevo > 0) {
            try {
                const res = await fetch(`${apiBaseUrl}/addventas`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": "token-value",
                    },
                    body: JSON.stringify(postData),
                });
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    console.log(message);
                } else {
                    setShow(true);
                    const putData = { stock: stocknuevo };
                    try {
                        const res2 = await fetch(`${apiBaseUrl}/update-stock/'${value}'`, {
                            method: "put",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": "token-value",
                            },
                            body: JSON.stringify(putData),
                        });

                        if (!res2.ok) {
                            const message = `An error has occured: ${res2.status} - ${res2.statusText}`;
                            console.log(message);
                        } else {
                            console.log("Stock Actualizado");
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    setValue("")
                    setCheckInDate(null)
                    setCheckOutDate(null)
                    setPostTmercado("Tienda Virtual")
                    setPostEstado("En Progreso")
                    setTotal(0)
                    setCounter(0)
                    setPostVendedor(null)
                    setPostDCliente(null)
                    setPostNCliente(null)
                    document.getElementById("FormControlIn1").value = "Elige Un Producto";
                    document.getElementById("FormControlIn3").value = "dd/mm/aaaa";
                    document.getElementById("FormControlIn4").value = "dd/mm/aaaa";
                    document.getElementById("FormControlIn5").value = "Elige un Vendedor";
                    document.getElementById("FormControlIn6").value = "Elige un Mercado";
                    document.getElementById("FormControlIn7").value = "";
                    document.getElementById("FormControlIn8").value = "";
                    document.getElementById("FormControlIn9").value = "Elige un Estado";
                    console.log("Venta Registrada")
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            <div className="alert alert-secondary" role="alert">
                La venta no puede ser registrada no hay stock disponible
            </div>
            console.log("La venta no puede ser registrada no hay stock disponible")
            setValue("")
            setCheckInDate(null)
            setCheckOutDate(null)
            setPostTmercado("Tienda Virtual")
            setPostEstado("En Progreso")
            setTotal(0)
            setCounter(0)
            setPostVendedor(null)
            setPostDCliente(null)
            setPostNCliente(null)
            document.getElementById("FormControlIn1").value = "Elige Un Producto";
            document.getElementById("FormControlIn3").value = "dd/mm/aaaa";
            document.getElementById("FormControlIn4").value = "dd/mm/aaaa";
            document.getElementById("FormControlIn5").value = "Elige un Vendedor";
            document.getElementById("FormControlIn6").value = "Elige un Mercado";
            document.getElementById("FormControlIn7").value = "";
            document.getElementById("FormControlIn8").value = "";
            document.getElementById("FormControlIn9").value = "Elige un Estado";
            setShow(false);
        }
    }

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
            }else if (userData.rol == "vendedor"){
                localStorage.setItem("state", userData.rol);
                setValidUser("vendedor");
            }else{
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

    const getProducts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/productos`);
            const jsonResponse = await response.json();
            const productoid = jsonResponse.data;
            productoid.map((product) => {
                return productos.push(product.producto);
            });
            setListProducto(productos)
        } catch (error) {
            console.log(error);
        }
    }

    const getVendedores = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/vendedores`);
            const jsonResponse = await response.json();
            const vendedoresJson = jsonResponse.data;
            vendedoresJson.map((vend) => {
                return vendedores.push(vend.nombreVendedor);
            });
            setListVendedores(vendedores)
        } catch (error) {
            console.log(error);
        }
    }

    const getPrecio = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/productosprecio/'${value}'`);
            const jsonResponse = await response.json();
            const preciopro = jsonResponse.data;
            preciopro.map((pre) => {
                return precios.push(pre.precio);
            })
            setListPrecios(precios)
        } catch (error) {
            console.log(error);
        }
    }

    function handleClick() {
        getPrecio();
        let totalVenta = 0
        let cant = parseInt(inputCantidad);
        cantidades.push(cant)

        if (cant > 0) {
            totalVenta = listPrecios * cantidades[0];
            setTotal(cant)
            setCounter(totalVenta)
        } else {
            setTotal(0)
            setCounter(0)
        }
    }

    function handleRemove() {
        setinputCantidad(0)
        document.getElementById("llave").value = 0;
        setTotal(0)
        setCounter(0)
    }

    useEffect(() => {
        setTimeout(() => {
            grantAccess();
            validateUserRole();
            getProducts();
            getVendedores();
        }, 500);
    }, [isAuthenticated, validUser])

    return (
        (validUser=="administrador"||validUser=="vendedor") && (
            <div className="container-fluid bg-secondary text-white">
                <div className="row row-cols-2">
                    <div className="col-xxl-12">
                        <div className="example-wrapper">
                            <label for="FormControlIn1" className="form-label">Producto</label>
                            <div className="select-container-lg">
                                <select className="form-select mb-1" onChange={e => setValue(e.target.value)} id="FormControlIn1">
                                    <option selected>Elige un Producto</option>
                                    {listProducto.map((lp) => (
                                        <option value={lp}>{lp}</option>
                                    ))}
                                </select>
                            </div>
                            {value.length != 0 ?
                                <Fragment>
                                    <li key="llave"><label className="form-label" for="llave">Cantidad de {value}</label>
                                        <div className="row row-cols-4 p-1">
                                            <div className="col">
                                                <input type="number" id="llave" className="form-control" min="0" onChange={e => setinputCantidad(e.target.value)} />
                                            </div>
                                            <button type="button" className="btn btn-dark p-2" onClick={handleClick}>Agregar</button>
                                            <button type="button" className="btn btn-dark p-2" onClick={handleRemove}>Borrar</button>
                                        </div>
                                    </li>
                                    <div>Total de Productos: {total}</div>
                                </Fragment>
                                : <span>Loading...</span>}
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn3" className="form-label">Fecha De Venta</label>
                        <input type="date" className="form-control" onChange={e => setCheckInDate(moment(e.target.value).format('YYYY-MM-DD'))} id="FormControlIn3" />
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn4" className="form-label">Fecha De Pago</label>
                        <input type="date" className="form-control" onChange={e => setCheckOutDate(moment(e.target.value).format('YYYY-MM-DD'))} id="FormControlIn4" />
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn5" className="form-label">Vendedor</label>
                        <select className="form-select mb-1" onChange={e => setPostVendedor(e.target.value)} id="FormControlIn5">
                            <option selected>Elige un Vendedor</option>
                            {listVendedores.map((lven) => (
                                <option value={lven}>{lven}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn6" className="form-label">Mercado</label>
                        <select className="form-select mb-1" onChange={e => setPostTmercado(e.target.value)} id="FormControlIn6">
                            <option selected>Elige un Mercado</option>
                            <option value="Tienda Virtual">Tienda Virtual</option>
                            <option value="Tienda Fisica">Tienda Fisica</option>
                        </select>
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn7" className="form-label">Documento Del Cliente</label>
                        <div className="input-group mb-1">
                            <input type="text" className="form-control" onChange={e => setPostDCliente(e.target.value)} id="FormControlIn7" />
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn8" className="form-label">Nombre Del Cliente</label>
                        <div className="input-group mb-1">
                            <input type="text" className="form-control" onChange={e => setPostNCliente(e.target.value)} id="FormControlIn8" />
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn9" className="form-label">Estado</label>
                        <select className="form-select mb-1" onChange={e => setPostEstado(e.target.value)} id="FormControlIn9">
                            <option selected>Elige un Estado</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Recibido">Recibido</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div className="col-xxl-6">
                        <label for="FormControlIn9" class="form-label">Total De La Venta</label>
                        <div className="input-group mb-1">
                            <span className="input-group-text">$</span>
                            <textarea class="form-control" id="FormControlIn9" rows="1" value={counter}></textarea>
                        </div>
                    </div>
                    <div className="container-fluid bg-secondary">
                        <Button className="btn btn-dark m-2" onClick={handleShow}>
                            Registrar Venta
                        </Button>

                        <Modal show={show1} onHide={handleClose}>
                            <Modal.Header closeButton />
                            <Modal.Body>¡Venta Registrada!</Modal.Body>
                            <Modal.Footer>
                                <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Button className="btn btn-dark m-2" onClick={handleShow2}>
                            Previsualizar Venta
                        </Button>

                        <Modal show={show2} onHide={handleClose2}>
                            <Modal.Header closeButton>
                                <Modal.Title>Previsualización De La Venta</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="mb-3">
                                    <label for="exampleTextarea1" className="form-label">Producto</label>
                                    <textarea class="form-control" id="exampleTextarea1" rows="1" value={value}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea2" className="form-label">Fecha Inicial</label>
                                    <textarea class="form-control" id="exampleTextarea2" rows="1" value={checkInDate}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea3" className="form-label">Fecha Del Pago</label>
                                    <textarea class="form-control" id="exampleTextarea3" rows="1" value={checkOutDate}></textarea>
                                </div>
                                <div clasName="mb-3">
                                    <label for="exampleTextarea4" className="form-label">Vendedor</label>
                                    <textarea class="form-control" id="exampleTextarea4" rows="1" value={postVendedor}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea5" className="form-label">Mercado</label>
                                    <textarea class="form-control" id="exampleTextarea5" rows="1" value={postTmercado}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea6" className="form-label">Documento Del Cliente</label>
                                    <textarea class="form-control" id="exampleTextarea6" rows="1" value={postTDCliente}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea7" className="form-label">Nombre Del Cliente</label>
                                    <textarea class="form-control" id="exampleTextarea7" rows="1" value={postTNCliente}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea8" className="form-label">Estado</label>
                                    <textarea class="form-control" id="exampleTextarea8" rows="1" value={postTEstado}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea9" className="form-label">Cantidad</label>
                                    <textarea className="form-control" id="exampleTextarea9" rows="1" value={total}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleTextarea10" className="form-label">Total Venta</label>
                                    <textarea className="form-control" id="exampleTextarea10" rows="1" value={counter}></textarea>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="bg-dark" variant="primary" onClick={handleClose2}>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>)
    );
};

export default Body