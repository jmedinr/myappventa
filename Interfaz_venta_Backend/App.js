const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const port = 3001;
const bluebird = require('bluebird');
let connection; // variable para almacenar la conexión a la DB

// configura el servidor para recibir datos en formato json
app.use(express.json());

app.get("/get-products", async (request, response) => {
    const [rows, fields] = await connection.execute("SELECT * FROM producto");
    response.json(rows);
})

app.post("/add-product", async (req, res) => {
    const [producto, stock, precio, cantidad, vendedor_idvendedor] = req.body;
    await connection.execute(`INSERT INTO products (producto, stock, precio, cantidad, vendedor_idvendedor) VALUES('${producto}',${stock}, ${precio}, ${cantidad},'${vendedor_idvendedo}')`);
    res.json(producto)
})

app.put("/update-product", (req, res) => {
    const product = req.body;
    console.log(product.producto)
    res.json(product)
})
app.delete("/delete-product", (req, res) => {
    const product = req.body;
    console.log(product.producto)
    res.json(product)
})


app.listen(port, async () => {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'mydb',
        Promise: bluebird
    });
    console.log("Server running on port: " + port);
});