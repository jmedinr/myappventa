/* eslint-disable no-fallthrough */
import React, { useEffect, useState, Fragment } from 'react';
import './Body.css'
import { Modal, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import apiBaseUrl from "../../Componentes/utils/Appiurl";

function BodyRegistrarP() {
    const [productoP, setproductoP] = useState("");
    const [precioP, setprecioP] = useState(0);
    const [stockP, setstockP] = useState(0);
    const [show1, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [validUser, setValidUser] = useState("");
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleShow = async () => {
        const postData = {
            producto: productoP,
            precio: precioP,
            stock: stockP
        };
        try {
            const res = await fetch(`${apiBaseUrl}/addproducto`, {
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
                setproductoP("");
                setprecioP(0);
                setstockP(0);
                document.getElementById("FormControlIn1").value = "";
                document.getElementById("FormControlIn2").value = 0;
                document.getElementById("FormControlIn3").value = 0;
                console.log("Producto Registrado");
            }
        } catch (err) {
            console.log(err);
        }
    };


    const validateUserRole = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/get-vendedores/'${user.email}'`);
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(error);
        }
    };

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
    };
    const verifySesion = () => {
        const cookies = document.cookie;
        let state = false;
        if (cookies.includes('auth0')) {
            state = true;
        }
        return state;
    };

    useEffect(() => {
        setTimeout(() => {
            grantAccess();
            validateUserRole();
        }, 500);
    }, [isAuthenticated, validUser]);

    return (
        (validUser=="administrador") && (
            <div className="container-fluid bg-secondary text-white">
                <div className="description">
                    <h1>Agregar Productos</h1>
                </div>
                <div className="row row-cols-3">
                    <div className="col-xxl-4">
                        <div className="example-wrapper">
                            <label for="FormControlIn1" className="form-label">Producto</label>
                            <div className="input-group mb-1">
                                <input type="text" className="form-control" onChange={e => setproductoP(e.target.value)} id="FormControlIn1" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4">
                        <label for="FormControlIn2" className="form-label">Stock</label>
                        <input type="number" className="form-control" onChange={e => setstockP(e.target.value)} id="FormControlIn2" />
                    </div>
                    <div className="col-xxl-4">
                        <label for="FormControlIn3" className="form-label">Precio</label>
                        <div className="input-group mb-1">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" onChange={e => setprecioP(e.target.value)} id="FormControlIn3" />
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-secondary">
                    <Button className="btn btn-dark m-2" onClick={handleShow}>
                        Registrar Producto
                    </Button>

                    <Modal show={show1} onHide={handleClose}>
                        <Modal.Header closeButton />
                        <Modal.Body>??Producto Registrado!</Modal.Body>
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
                            <Modal.Title>Previsualizaci??n Del Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <label for="exampleTextarea1" className="form-label">Producto</label>
                                <textarea class="form-control" id="exampleTextarea1" rows="1" value={productoP}></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="exampleTextarea2" className="form-label">Precio</label>
                                <textarea class="form-control" id="exampleTextarea2" rows="1" value={precioP}></textarea>
                            </div>
                            <div className="mb-3">
                                <label for="exampleTextarea3" className="form-label">Stock</label>
                                <textarea class="form-control" id="exampleTextarea3" rows="1" value={stockP}></textarea>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="bg-dark" variant="primary" onClick={handleClose2}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>));
};

export default BodyRegistrarP