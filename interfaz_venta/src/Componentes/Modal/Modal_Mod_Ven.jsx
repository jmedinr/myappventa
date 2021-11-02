import React, { useState, useEffect } from "react";
import { Modal, Button, } from 'react-bootstrap';
import apiBaseUrl from "../../Componentes/utils/Appiurl"

function Modal_Mod_Ven({ idVendedores, vnombre, vrol, vcorreo}) {
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const firstVnombre = (vnombre);
	const [firstVnombren, setFirstVnombren] = useState(vnombre);
    const firstVrol=(vrol);
	const [firstVroln, setFirstVroln] = useState(vrol);
    const firstVcorreo = (vcorreo);
	const [firstVcorreon, setFirstVcorreon] = useState(vcorreo);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    async function handleClose() {
        const putData = {
            nombreVendedor: firstVnombren,
            rol: firstVroln,
            correo: firstVcorreon,
        };
        try {
            const res = await fetch(`${apiBaseUrl}/updatevendedor/${idVendedores}`, {
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
                setFirstVnombren(vnombre);
                setFirstVroln(vrol);
                setFirstVcorreon((vcorreo),
                    console.log("Vendedor Actualizado"));
            }
        } catch (err) {
            setFirstVnombren(vnombre);
            setFirstVroln(vrol);
            setFirstVcorreon((vcorreo),
                console.log(err));
        }
        setShow(false);
    }

    async function handleClose2() {
        try {
            const res = await fetch(`${apiBaseUrl}/deletevendedor/${idVendedores}`, { method: "delete" });

            const data = await res.json();

            const result = {
                status: res.status + "-" + res.statusText,
                headers: { "Content-Type": res.headers.get("Content-Type") },
                data: data,
            };
            setFirstVnombren(vnombre);
            setFirstVroln(vrol);
            setFirstVcorreon((vcorreo),
                console.log(result));
        } catch (err) {
            console.log(err);
        }
        setShow2(false);
    }

    return (
        <>
            <Button className="p-2" variant="dark" onClick={handleShow}>
                Modificar Vendedor
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Vendedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label for="FormControlTextarea1" className="form-label">Nombre de Vendedor Actual</label>
                        <textarea className="form-control" id="FormControlTextarea1" rows="1" value={firstVnombre}></textarea>
                        <label for="FormControlInput1" className="form-label">Nombre de Vendedor Nuevo</label>
                        <input type="text" className="form-control" onChange={e => setFirstVnombren(e.target.value)} id="FormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea2" className="form-label">Rol Actual</label>
                        <textarea className="form-control" id="FormControlTextarea2" rows="1" value={firstVrol}></textarea>
                        <label for="FormControlInput2" className="form-label">Rol Nuevo</label>
						<select className="form-select mb-1" onChange={e => setFirstVroln(e.target.value)} id="FormControlInput2">
                            <option selected>Elige Un Rol</option>
                            <option value="administrador">administrador</option>
                            <option value="vendedor">vendedor</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="FormControlTextarea3" className="form-label">Correo Actual</label>
                        <textarea className="form-control" id="FormControlTextarea3" rows="1" value={firstVcorreo}></textarea>
                        <label for="FormControlInput3" className="form-label">Correo Nuevo</label>
                        <input type="email" className="form-control" onChange={e => setFirstVcorreon(e.target.value)} id="FormControlInput1" />
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

export default Modal_Mod_Ven