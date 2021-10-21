import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import "../Filtro_Venta/Filtro_Venta"


export default function Modal_Mod_Adm() {
    const [show1, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="containter-fluid p-2">
            <input type="search" class="light-table-filter" data-table="table" placeholder="Filtro/Busqueda"/>
        <div class="container-fluid">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Documento Del Cliente</th>
                                    <th>Nombre Del Cliente</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
                                    <td>1</td>
                                    <td>231463512</td>
                                    <td>Leme</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="collapse" id="collapse1">
                                            <div className="container" text-white>
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Creada por: </strong><a>Vendedor1</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Fecha de Inicio: </strong><a>date</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Producto: </strong><a>Camiseta Polo 1</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Fecha de Pago: </strong><a>date</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Mercado: </strong><a>Tienda Virtual</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Estado: </strong><a>Recibido</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Total Venta: </strong><a>$ Valor</a></div>
                                                    </div>
                                                </div>
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
                                                        <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                            Cancelar
                                                        </Button>
                                                        <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                            OK
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
                                    <td>2</td>
                                    <td>6546446</td>
                                    <td>Pedro</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="collapse" id="collapse2">
                                            <div className="container" text-white>
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Creada por: </strong><a>Vendedor1</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Fecha de Inicio: </strong><a>date</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Producto: </strong><a>Camiseta Polo 1</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Fecha de Pago: </strong><a>date</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Mercado: </strong><a>Tienda Virtual</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Estado: </strong><a>Recibido</a></div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="p-3 border bg-light"><strong>Total Venta: </strong><a>$ Valor</a></div>
                                                    </div>
                                                </div>
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
                                                        <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                            Cancelar
                                                        </Button>
                                                        <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                            OK
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}