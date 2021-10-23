import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import "../Filtro_Venta/Filtro_Venta"
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl"


export default function Modal_Mod_Adm() {
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [ventas, setVentas] = useState([]);
    const { isAuthenticated } = useAuth0();

    const getVentas = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/ventas`);
            const jsonResponse = await response.json();
            const responseVentas = jsonResponse.data10;
            console.log(jsonResponse);
            const listaVentas = responseVentas.map((vent) =>{
                <Fragment>
                    <tr data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <td>vent.idventa</td>
                        <td>vent.documentocliente</td>
                        <td>vent.cliente</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="collapse" id="collapseExample">
                                <div className="container" text-white>
                                    <div className="row g-2">
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Creada por: </strong><a>vent.vendedor</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Fecha de Inicio: </strong><a>vent.fechaInicial</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Producto: </strong><a>vent.producto</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Fecha de Pago: </strong><a>vent.fechaFinal</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Mercado: </strong><a>vent.tipoMercado</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Estado: </strong><a>vent.estado</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Cantidad: </strong><a>vent.cantidad</a></div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-3 border bg-light"><strong>Total Venta: </strong><a>vent.total_venta</a></div>
                                        </div>
                                    </div>
                                    {isAuthenticated ?
                                        <div className="container-fluid">
                                            <Button className="btn btn-dark m-2" onClick={handleShow}>
                                                Modificar Venta
                                            </Button>

                                            <Modal show={show1} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Modificar Venta</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Producto</Form.Label>
                                                            <Form.Control type="text">vent.producto</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Fecha Inicial</Form.Label>
                                                            <Form.Control type="date">vent.fechaInicial</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Fecha Del Pago</Form.Label>
                                                            <Form.Control type="date">vent.fechaFinal</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Vendedor</Form.Label>
                                                            <Form.Control type="text">vent.vendedor</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Mercado</Form.Label>
                                                            <Form.Control type="number">vent.tipoMercado</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Documento Del Cliente</Form.Label>
                                                            <Form.Control type="number">vent.documentocliente</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Nombre Del Cliente</Form.Label>
                                                            <Form.Control type="text">vent.cliente</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Estado</Form.Label>
                                                            <Form.Control type="number">vent.estado</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Cantidad</Form.Label>
                                                            <Form.Control type="number">vent.cantidad</Form.Control>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Total Venta</Form.Label>
                                                            <Form.Control type="number">vent.total_venta</Form.Control>
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                        Cancelar
                                                    </Button>
                                                    <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                        OK
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                            <Button className="btn btn-danger m-2" onClick={handleShow2}>
                                                Eliminar
                                            </Button>

                                            <Modal show={show2} onHide={handleClose2}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Eliminar Producto</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>¿Seguro de que quieres <strong>Eliminar</strong> La Venta?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose2}>
                                                        Cancelar
                                                    </Button>
                                                    <Button className="bg-danger" variant="primary" onClick={handleClose2}>
                                                        OK
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div> : null}
                                </div>
                            </div>
                        </td>
                    </tr>
                </Fragment>}
            );
            setVentas(listaVentas)
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getVentas();
    }, [])

    return (
        <div className="containter-fluid p-2">
            <input type="search" class="light-table-filter" data-table="table" placeholder="Filtro/Busqueda" />
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <table className="table">
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


