import React, { useState, useEffect } from "react";
import { Modal, Button, } from 'react-bootstrap';
import apiBaseUrl from "../../Componentes/utils/Appiurl"
import * as moment from 'moment'

function Modal_Mod_Adm({ idVentas, Pventa, finicial, ffinal, tmercado, eventa, caventa, tventa, vventa, dventa, cventa }) {
    let lproductos = [];
    let vendedoresmo = [];
    let precios = [];
    let totalVenta = 0;
    let valores = [];
    const [listProductomo, setListProductomo] = useState([]);
    const [listVendedoresmo, setListVendedoresmo] = useState([]);
    const [listPrecios, setListPrecios] = useState([]);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const firstProducto=(Pventa);
    const [firstProducton, setFirstProducton] = useState(Pventa);
    const firstfechainicial=(moment(finicial).format('YYYY-MM-DD'));
    const [firstfechainicialn, setFirstfechainicialn] = useState(moment(finicial).format('YYYY-MM-DD'));
    const firstfechafinal=(moment(ffinal).format('YYYY-MM-DD'));
    const [firstfechafinaln, setFirstfechafinaln] = useState(moment(ffinal).format('YYYY-MM-DD'));
    const firsttipomercado = (tmercado);
    const [firsttipomercadon, setFirsttipomercadon] = useState(tmercado);
    const firstestadoventa = (eventa);
    const [firstestadoventan, setFirstestadoventan] = useState(eventa);
    const firstcantidadventa = (caventa);
    const [firstcantidadventan, setFirstcantidadventan] = useState(caventa);
    const [firstputtotalventa, setFirstputtotalventa] = useState(tventa);
    const [firstputtotalventan, setFirstputtotalventan] = useState(0);
    const firstvendedorventa = (vventa);
    const [firstvendedorventan, setFirstvendedorventan] = useState(vventa);
    const firstdocumentoventa = (dventa);
    const [firstdocumentoventan, setFirstdocumentoventan] = useState(dventa);
    const firstclienteventa = (cventa);
    const [firstclienteventan, setFirstclienteventan] = useState(cventa);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    let handleClose = async () => {
        let stockventa = []
        const response = await fetch(`${apiBaseUrl}/productosstock/'${firstProducton}'`);
        console.log("response",response)
        const jsonResponse = await response.json();
        console.log("jsonResponse",jsonResponse)
        const liststockventa = jsonResponse.data;
        console.log("liststockventa",liststockventa)
        liststockventa.map((st) => {
            return stockventa.push(st.stock)
        })
        console.log("stockventa[0]",stockventa[0])
        console.log("caventa",caventa)
        console.log("firstcantidadventan",firstcantidadventan)
        const stocknuevo = (stockventa[0] + caventa) - firstcantidadventan;
        const putData = {
            producto: firstProducton,
            fechaInicial: firstfechainicialn,
            fechaFinal: firstfechafinaln,
            tipoMercado: firsttipomercadon,
            estado: firstestadoventan,
            cantidad: firstcantidadventan,
            total_venta: firstputtotalventa,
            vendedor: firstvendedorventan,
            documentocliente: firstdocumentoventan,
            cliente: firstclienteventan,
        };
        if (stocknuevo > 0) {
            try {
                const res = await fetch(`${apiBaseUrl}/updateventa/${idVentas}`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": "token-value",
                    },
                    body: JSON.stringify(putData),
                });

                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    console.log(message);
                } else {
                    const putData2 = { stock: stocknuevo };
                    try {
                        const res2 = await fetch(`${apiBaseUrl}/update-stock/'${firstProducton}'`, {
                            method: "put",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": "token-value",
                            },
                            body: JSON.stringify(putData2),
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
                    setFirstProducton(Pventa)
                    setFirstfechainicialn(moment(finicial).format('YYYY-MM-DD'))
                    setFirstfechafinaln(moment(ffinal).format('YYYY-MM-DD'))
                    setFirsttipomercadon(tmercado)
                    setFirstestadoventan(eventa)
                    setFirstcantidadventan(caventa)
                    setFirstputtotalventa(tventa)
                    setFirstputtotalventan(0)
                    setFirstvendedorventan(vventa)
                    setFirstdocumentoventan(dventa)
                    setFirstclienteventan(cventa)
                    console.log("Venta Actualizada");
                }
            } catch (err) {
                setFirstProducton(Pventa)
                setFirstfechainicialn(moment(finicial).format('YYYY-MM-DD'))
                setFirstfechafinaln(moment(ffinal).format('YYYY-MM-DD'))
                setFirsttipomercadon(tmercado)
                setFirstestadoventan(eventa)
                setFirstcantidadventan(caventa)
                setFirstputtotalventa(tventa)
                setFirstputtotalventan(0)
                setFirstvendedorventan(vventa)
                setFirstdocumentoventan(dventa)
                setFirstclienteventan(cventa)
                console.log(err);
            }
        } else {
            console.log("Venta no pudo ser Actualizada No Hay Stock Disponible")
        }
        setShow(false);
    };

    let handleClose2 = async () => {
        let stockventa = []
        const response = await fetch(`${apiBaseUrl}/productosstock/'${firstProducton}'`);
        const jsonResponse = await response.json();
        const liststockventa = jsonResponse.data;
        liststockventa.map((st) => {
            return stockventa.push(st.stock)
        })
        const stocknuevo = (stockventa[0] + caventa);
        const putData3 = { stock: stocknuevo };
        try {
            const res3 = await fetch(`${apiBaseUrl}/update-stock/'${firstProducton}'`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(putData3),
            });

            if (!res3.ok) {
                const message = `An error has occured: ${res3.status} - ${res3.statusText}`;
                console.log(message);
            } else {
                console.log("Stock Actualizado");
            }
        } catch (err) {
            console.log(err);
        }
        try {
            const res = await fetch(`${apiBaseUrl}/deleteventa/${idVentas}`, { method: "delete" });

            const data = await res.json();

            const result = {
                status: res.status + "-" + res.statusText,
                headers: { "Content-Type": res.headers.get("Content-Type") },
                data: data,
            };
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        setShow2(false);
    }

    const getProduct = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/productos`);
            const jsonResponse = await response.json();
            const productoid = jsonResponse.data;
            productoid.map((product) => {
                lproductos.push(product.producto);
            });
            setListProductomo(lproductos);
        } catch (error) {
            console.log(error);
        }
    }

    const getVendedoresmo = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/vendedores`);
            const jsonResponse = await response.json();
            const vendedoresJson = jsonResponse.data;
            vendedoresJson.map((vend) => {
                vendedoresmo.push(vend.nombreVendedor);
            });
            setListVendedoresmo(vendedoresmo)
        } catch (error) {
            console.log(error);
        }
    }

    const getProductsid = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/productosprecio/'${firstProducton}'`);
            const jsonResponse = await response.json();
            const productoid = jsonResponse.data;
            productoid.map((product) => {
                precios.push(product.precio);
            });
            setListPrecios(precios)
        } catch (error) {
            console.log(error);
        }
    }

    const getPrecio = () => {
        firstcantidadventan > 0 ? valores.push(firstcantidadventan) : valores.push(0);
        totalVenta = listPrecios[0] * valores[0];
        setFirstputtotalventan(totalVenta);
        setFirstputtotalventa(totalVenta);
    }

    useEffect(() => {
        setTimeout(() => {
            getProduct();
            getProductsid();
            getVendedoresmo();
        }, 500);
    }, [])


    return (
        <>
            <Button className="p-2" variant="dark" onClick={handleShow}>
                Modificar Venta
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label for="FormControlTextarea1" className="form-label">Producto Actual</label>
                        <textarea className="form-control" id="FormControlTextarea1" rows="1" value={firstProducto}></textarea>
                        <label for="FormControlInput1" className="form-label">Valor Nuevo Para El Producto</label>
                        <div className="select-container-lg">
                            <select className="form-select mb-1" onChange={e => setFirstProducton(e.target.value)}>
                                <option selected>Elige un Producto</option>
                                {listProductomo.map((lpr) => (
                                    <option value={lpr}>{lpr}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea2" className="form-label">Fecha De Venta Actual</label>
                        <textarea className="form-control" id="FormControlTextarea2" rows="1" value={firstfechainicial}></textarea>
                        <label for="FormControlInput2" className="form-label">Fecha De Venta Nueva</label>
                        <input type="date" className="form-control" onChange={e => setFirstfechainicialn(moment(e.target.value).format('YYYY-MM-DD'))} id="FormControlInput2" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea3" className="form-label">Fecha De Pago Actual</label>
                        <textarea className="form-control" id="FormControlTextarea3" rows="1" value={firstfechafinal}></textarea>
                        <label for="FormControlInput3" className="form-label">Fecha De Pago Nueva</label>
                        <input type="date" className="form-control" onChange={e => setFirstfechafinaln(moment(e.target.value).format('YYYY-MM-DD'))} id="FormControlInput3" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea4" className="form-label">Vendedor Actual</label>
                        <textarea className="form-control" id="FormControlTextarea4" rows="1" value={firstvendedorventa}></textarea>
                        <label for="FormControlInput4" className="form-label">Vendedor Nuevo</label>
                        <select className="form-select mb-1" onChange={e => setFirstvendedorventan(e.target.value)}>
                            <option selected>Elige un Vendedor</option>
                            {listVendedoresmo.map((lvenmo) => (
                                <option value={lvenmo}>{lvenmo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea5" className="form-label">Mercado Actual</label>
                        <textarea className="form-control" id="FormControlTextarea5" rows="1" value={firsttipomercado}></textarea>
                        <label for="FormControlInput5" className="form-label">Mercado Nuevo</label>
                        <select className="form-select mb-1" onChange={e => setFirsttipomercadon(e.target.value)}>
                            <option selected>Elige Un Tipo De Mercado</option>
                            <option value="Tienda Virtual">Tienda Virtual</option>
                            <option value="Tienda Fisica">Tienda Fisica</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea6" className="form-label">Documento Cliente Actual</label>
                        <textarea className="form-control" id="FormControlTextarea6" rows="1" value={firstdocumentoventa}></textarea>
                        <label for="FormControlInput6" className="form-label">Documento Cliente Nuevo</label>
                        <input type="number" className="form-control" onChange={e => setFirstdocumentoventan(e.target.value)} id="FormControlInput6" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea7" className="form-label">Nombre Cliente Actual</label>
                        <textarea className="form-control" id="FormControlTextarea7" rows="1" value={firstclienteventa}></textarea>
                        <label for="FormControlInput7" className="form-label">Nombre Del Cliente Nuevo</label>
                        <input type="text" className="form-control" onChange={e => setFirstclienteventan(e.target.value)} id="FormControlInput7" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea8" className="form-label">Estado Actual</label>
                        <textarea className="form-control" id="FormControlTextarea8" rows="1" value={firstestadoventa}></textarea>
                        <label for="FormControlInput8" className="form-label">Estado Nuevo</label>
                        <select className="form-select mb-1" onChange={e => setFirstestadoventan(e.target.value)}>
                            <option selected>Elige un Estado</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Recibido">Recibido</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea9" className="form-label">Cantidad Actual</label>
                        <textarea className="form-control" id="FormControlTextarea9" rows="1" value={firstcantidadventa}></textarea>
                        <label for="FormControlInput9" className="form-label">Cantidad Nueva</label>
                        <input type="number" class="form-control" onChange={e => setFirstcantidadventan(e.target.value)} id="FormControlInput9" />
                    </div>
                    <div class="mb-3">
                        <label for="FormControlTextarea9" className="form-label">Total Venta Actual</label>
                        <textarea className="form-control" id="FormControlTextarea9" rows="1" value={firstputtotalventa}></textarea>
                        <label for="FormControlInput10" className="form-label">Total Venta Nuevo</label>
                        <textarea className="form-control" id="FormControlInput10" rows="1" value={firstputtotalventan}></textarea>
                        <button type="button" className="btn btn-dark p-1" onClick={getPrecio}>Obtener Total Nuevo</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button className="p-2" variant="danger" onClick={handleShow2}>
                Eliminar
            </Button>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro de que quieres <strong>Eliminar</strong> La Venta?</Modal.Body>
                <Modal.Footer>
                    <Button className="bg-danger" variant="primary" onClick={handleClose2}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modal_Mod_Adm