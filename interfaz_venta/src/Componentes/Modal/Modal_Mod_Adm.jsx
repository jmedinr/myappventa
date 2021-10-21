import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import "../Filtro_Venta/Filtro_Venta"
import { useAuth0 } from "@auth0/auth0-react";


export default function Modal_Mod_Adm() {
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [productos, setProductos] = useState([]);
    const { isAuthenticated } = useAuth0();

    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:3001/productos/1");
            const jsonResponse = await response.json();
            const productoid = jsonResponse.data10;
            const listProductid = productoid.map((product) => {
                return product.producto
            });
            setProductos(listProductid)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getProducts();
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
                                    <Fragment>
                                        <tr data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                            <td>1</td>
                                            <td>231463512</td>
                                            <td>Leme</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="collapse" id="collapseExample">
                                                    <div className="container" text-white>
                                                        <div className="row g-2">
                                                            <div className="col-6">
                                                                <div className="p-3 border bg-light"><strong>Creada por: </strong><a>Vendedor1</a></div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="p-3 border bg-light"><strong>Fecha de Inicio: </strong><a>date</a></div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="p-3 border bg-light"><strong>Producto: </strong><a>{productos}</a></div>
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
                                                        </div>:null}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


