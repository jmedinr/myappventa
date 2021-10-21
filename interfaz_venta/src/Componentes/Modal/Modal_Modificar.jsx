import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import "../Filtro_Venta/Filtro_Venta"


export default function Modal_Mod_Adm() {
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
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
                                    <th>ID Producto</th>
                                    <th>Descripción Del Producto</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                                    <td>1</td>
                                    <td>Camiseta Roja</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="collapse" id="collapse1">
                                            <div className="container" text-white>
                                                <div className="p-3 border bg-light"><strong>Precio: $</strong><a>10000</a></div>
                                                <Button className="btn btn-dark m-2" onClick={handleShow}>
                                                    Modificar Producto
                                                </Button>

                                                <Modal show={show1} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Modificar Producto</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Código</Form.Label>
                                                                <Form.Control type="code" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Producto</Form.Label>
                                                                <Form.Control type="product" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Precio</Form.Label>
                                                                <Form.Control type="price" />
                                                            </Form.Group>
                                                            <Modal.Footer>
                                                                <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                                    Cancelar
                                                                </Button>
                                                                <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                                    OK
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Form>
                                                    </Modal.Body>
                                                </Modal>

                                                <Button className="btn btn-danger m-2" onClick={handleShow2}>
                                                    Eliminar
                                                </Button>

                                                <Modal show={show2} onHide={handleClose2}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Eliminar Producto</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>¿Seguro de que quieres <strong>Eliminar</strong> el Producto?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose2}>
                                                            Cancelar
                                                        </Button>
                                                        <Button className="bg-danger" variant="primary" onClick={handleClose2}>
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
                                    <td>Camiseta Azul</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="collapse" id="collapse2">
                                            <div className="container" text-white>
                                                <div className="p-3 border bg-light"><strong>Precio: $</strong><a>10000</a></div>
                                                <Button className="btn btn-dark m-2" onClick={handleShow}>
                                                    Modificar Producto
                                                </Button>

                                                <Modal show={show1} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Modificar Producto</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Código</Form.Label>
                                                                <Form.Control type="code" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Producto</Form.Label>
                                                                <Form.Control type="product" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Precio</Form.Label>
                                                                <Form.Control type="price" />
                                                            </Form.Group>
                                                            <Modal.Footer>
                                                                <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                                    Cancelar
                                                                </Button>
                                                                <Button className="bg-dark" variant="primary" onClick={handleClose}>
                                                                    OK
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Form>
                                                    </Modal.Body>
                                                </Modal>

                                                <Button className="btn btn-danger m-2" onClick={handleShow2}>
                                                    Eliminar
                                                </Button>

                                                <Modal show={show2} onHide={handleClose2}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Eliminar Producto</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>¿Seguro de que quieres <strong>Eliminar</strong> el Producto?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose2}>
                                                            Cancelar
                                                        </Button>
                                                        <Button className="bg-danger" variant="primary" onClick={handleClose2}>
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