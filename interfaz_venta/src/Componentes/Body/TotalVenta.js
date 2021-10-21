import React, { useEffect, useState } from 'react'

const TotalVenta = ({ val, productos }) => {
    let totales = []
    let valores = []
    let inputValue = 0
    let totalVenta = 0
    const [counter, setCounter] = useState(0);

    const getPrecio = () => {
        val.map((va) => {
            totales.push(va)
        });
        productos.map((pro) => {
            inputValue = parseInt(document.getElementById(pro).value)
            if (inputValue) {
                valores.push(inputValue)
            } else {
                valores.push(0)
            }
        });
        /*     productos.map((item) => {
                valores.push(item)
            }); */
        console.log("Totales", totales)
        console.log("Valores", valores)
        for (let i = 0; i < valores.length; i++) {
            totalVenta += totales[i] * valores[i]
        }
        setCounter(totalVenta)
        console.log("Total", totalVenta)
    }

    useEffect(() => {
        setTimeout(() => {
            getPrecio();
          }, 1000);
    }, [])

    return (
        <>
            <textarea class="form-control" id="floatingTextarea" value={counter}></textarea>
            <button onClick={getPrecio}>Obtener Total</button>
        </>

    )
}

export default TotalVenta
