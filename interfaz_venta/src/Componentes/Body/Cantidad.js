import React, { Fragment, useState, useReducer } from "react";

const Cantidad = ({ items }) => {
    const [total, setTotal] = useState(0);
    let valor = []
    let suma=0
    let inputValue=0

    function handleClick(item) {
        items.map((ite)=>{
            inputValue=parseInt(document.getElementById(ite).value)
            if (inputValue){
                valor.push(inputValue)
            }else{
                valor.push(0)
            }
            
        });
        getTotal()
    }

    function handleRemove(item) {
        document.getElementById(item.item).value=0;
        items.map((ite)=>{
            inputValue=parseInt(document.getElementById(ite).value)
            valor.push(inputValue)
        });
        getTotal()
    }

    function getTotal(){
        valor.map((val)=>{
            suma+=val
        })
        console.log("suma",suma)
        setTotal(suma)
    }

    return (
        <Fragment>
            {items.map(item => (
                <li key={item}><label class="form-label" for="item">Cantidad de {item}</label>
                    <div class="row row-cols-4 p-1">
                        <div class="col">
                            <input type="number" id={item} class="form-control" min="0"/>
                        </div>
                        <button onClick={() => handleClick({ item })}>Agregar</button>
                        <button onClick={() => handleRemove({ item })}>Borrar</button>
                    </div>
                </li>
            ))}
            <div>Total de Productos: {total}</div>
        </Fragment>
    );
};

export default Cantidad;




