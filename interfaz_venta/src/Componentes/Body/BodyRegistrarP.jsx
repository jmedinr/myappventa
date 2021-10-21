import React, { useState } from "react";
import './Body.css'
import { Modal, Button, Form } from 'react-bootstrap';


function BodyRegistrarP() {
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return (
        <div className="container-fluid bg-secondary text-white">
            <div className="description">
                <h1>Agregar Productos</h1>
            </div>
            <div className="row row-cols-3">
                <div className="col-xxl-4">
                    Código
                    <div className="input-group mb-1">
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="col-xxl-4">
                    Producto
                    <div className="input-group mb-1">
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="col-xxl-4">
                    Precio
                    <div className="input-group mb-1">
                        <span className="input-group-text">$</span>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-secondary">
                <Button className="btn btn-dark m-2" onClick={handleShow}>
                    Crear Croducto
                </Button>

                <Modal show={show1} onHide={handleClose}>
                    <Modal.Header closeButton />
                    <Modal.Body>¡Producto Registrado!</Modal.Body>
                    <Modal.Footer>
                        <Button className="bg-dark" variant="primary" onClick={handleClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Button className="btn btn-dark m-2" onClick={handleShow2}>
                    Previsualizar Producto
                </Button>

                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Previsualización Del Producto</Modal.Title>
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
        </div>
    );
}

export default BodyRegistrarP