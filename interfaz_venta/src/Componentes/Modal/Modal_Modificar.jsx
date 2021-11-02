import React, { useState} from "react";
import { Modal, Button, } from 'react-bootstrap';
import apiBaseUrl from "../../Componentes/utils/Appiurl"

function Modal_Mod_Adm({ idProductos, pproducto, pprecio, pstock }) {
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const firstProducto = (pproducto);
    const [firstProducton, setFirstProducton] = useState(pproducto);
    const firstPprecio = (pprecio);
    const [firstPprecion, setFirstPprecion] = useState(pprecio);
    const firstPstock = (pstock);
    const [firstPstockn, setFirstPstockn] = useState(pstock);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    async function handleClose() {
        const putData = {
            producto: firstProducton,
            precio: firstPprecion,
            stock: firstPstockn,
        };
        try {
            const res = await fetch(`${apiBaseUrl}/updateproducto/${idProductos}`, {
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
                setFirstProducton(pproducto);
                setFirstPprecion(pprecio);
                setFirstPstockn(pstock);
                console.log("Venta Actualizada");
            }
        } catch (err) {
            setFirstProducton(pproducto);
            setFirstPprecion(pprecio);
            setFirstPstockn(pstock);
            console.log(err);
        }
        setShow(false);
    }

    async function handleClose2() {
        try {
            const res = await fetch(`${apiBaseUrl}/deleteproducto/${idProductos}`, { method: "delete" });

            const data = await res.json();

            const result = {
                status: res.status + "-" + res.statusText,
                headers: { "Content-Type": res.headers.get("Content-Type") },
                data: data,
            };
            setFirstProducton(pproducto);
            setFirstPprecion(pprecio);
            setFirstPstockn(pstock);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        setShow2(false);
    }

    return (
        <>
            <Button className="p-2" variant="dark" onClick={handleShow}>
                Modificar Producto
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label for="FormControlTextarea1" className="form-label">Producto Actual</label>
                        <textarea className="form-control" id="FormControlTextarea1" rows="1" value={firstProducto}></textarea>
                        <label for="FormControlInput1" className="form-label">Valor Nuevo Para El Producto</label>
                        <input type="text" className="form-control" onChange={e => setFirstProducton(e.target.value)} id="FormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea2" className="form-label">Precio Actual</label>
                        <textarea className="form-control" id="FormControlTextarea2" rows="1" value={firstPprecio}></textarea>
                        <label for="FormControlInput2" className="form-label">Precio Nuevo</label>
                        <input type="number" class="form-control" onChange={e => setFirstPprecion(e.target.value)} id="FormControlInput2" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea3" className="form-label">Stock Actual</label>
                        <textarea className="form-control" id="FormControlTextarea3" rows="1" value={firstPstock}></textarea>
                        <label for="FormControlInput3" className="form-label">Stock Nuevo</label>
                        <input type="number" class="form-control" onChange={e => setFirstPstockn(e.target.value)} id="FormControlInput3" />
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
                <Modal.Body>¿Seguro de que quieres <strong>Eliminar</strong> El Producto?</Modal.Body>
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