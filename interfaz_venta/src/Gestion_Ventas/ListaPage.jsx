import React, { Fragment } from 'react'
import Body from '../Componentes/Body/Body.jsx'
import Table from '../Componentes/Table/Table_Admin'
import "./ListaPage.css"


function ListaPage() {
    return (
        <Fragment>
            <div className="description bg-secondary text-white" >
                <h1>Lista de Ventas</h1>
            </div >
            <Body />
            <Table />
        </Fragment>
    );
}

export default ListaPage