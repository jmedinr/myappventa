import React, { useEffect, useState } from 'react';
import './Body.css'
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../node_modules/@progress/kendo-theme-default/dist/all.css';
import { MultiSelect } from '../../../node_modules/@progress/kendo-react-dropdowns';
import DatePicker from 'react-date-picker';
import Cantidad from './Cantidad'
import TotalVenta from './TotalVenta'
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl"


function Body() {
    let productos = [];
    let precios = [];
    const [listProducto, setListProducto] = useState([]);
    const [listPrecios, setListPrecios] = useState([]);
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [value, setValue] = useState([]);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const { isAuthenticated } = useAuth0();

    // define handler change function on check-in date
    const handleCheckInDate = (date) => {
        setCheckInDate(date);
        setCheckOutDate(null);
    };

    // define handler change function on check-out date
    const handleCheckOutDate = (date) => {
        setCheckOutDate(date);
    };

    const onChange = (event) => {
        setValue([...event.value]);
    };


    const getProducts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/productos`);
            const jsonResponse = await response.json();
            const productoid = jsonResponse.data9;
            console.log("Producto:",productoid);
            productoid.map((product) => {
                productos.push(product.producto);
                precios.push(product.precio);
            });
            setListProducto(productos)
            setListPrecios(precios)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getProducts();
    }, [])

    return (
        isAuthenticated && (
            <div className="container-fluid bg-secondary text-white">
                <div className="row row-cols-2">
                    <div className="col-xxl-6">
                        <div className="example-wrapper">
                            <div>
                                <div>Productos</div>
                                <MultiSelect data={listProducto} onChange={onChange} value={value} />
                                {value.length ? <Cantidad items={value} /> : <span>Loading...</span>}
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        <div>Productos Seleccionados</div>
                        <textarea class="form-control" id="floatingTextarea" value={value}></textarea>
                    </div>
                    <div className="col-xxl-6">
                        <div className="container-fluid p-1">Fecha Inicial</div>
                        <DatePicker
                            className="reac-date-picker bg-light"
                            value={checkInDate}
                            minDate={new Date()}
                            onChange={handleCheckInDate}
                        />
                    </div>
                    <div className="col-xxl-6">
                        <div className="container-fluid p-1">Fecha Del Pago</div>
                        <DatePicker
                            className="reac-date-picker bg-light"
                            value={checkOutDate}
                            minDate={checkInDate}
                            onChange={handleCheckOutDate}
                        />
                    </div>
                    <div className="col-xxl-6">
                        Vendedor
                        <div className="input-group mb-1">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        Mercado
                        <select className="form-select mb-1">
                            <option selected>Tienda Virtual</option>
                            <option value="2">Tienda Física</option>
                        </select>
                    </div>
                    <div className="col-xxl-6">
                        Documento Del Cliente
                        <div className="input-group mb-1">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        Nombre Del Cliente
                        <div className="input-group mb-1">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-xxl-6">
                        Estado
                        <select className="form-select mb-1">
                            <option selected>En Creación</option>
                            <option value="2">En Embalaje</option>
                            <option value="3">En Despacho</option>
                            <option value="4">En Ruta</option>
                            <option value="5">Recibido</option>
                        </select>
                    </div>
                    <div className="col-xxl-6">
                        Total Venta
                        <div className="input-group mb-1">
                            <span className="input-group-text">$</span>
                            <TotalVenta val={listPrecios} productos={value}></TotalVenta>
                        </div>
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
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Producto</Form.Label>
                                    <Form.Control type="product" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha Inicial</Form.Label>
                                    <Form.Control type="datei" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha Del Pago</Form.Label>
                                    <Form.Control type="datef" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vendedor</Form.Label>
                                    <Form.Control type="seller" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mercado</Form.Label>
                                    <Form.Control type="market" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Documento Del Cliente</Form.Label>
                                    <Form.Control type="documentc" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Del Cliente</Form.Label>
                                    <Form.Control type="nombrec" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control type="state" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Total Venta</Form.Label>
                                    <Form.Control type="total" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="bg-dark" variant="primary" onClick={handleClose2}>
                                Cancelar
                            </Button>
                            <Button className="bg-dark" variant="primary" onClick={handleClose2}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div >)
    );
}

export default Body