const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2/promise');
const port = 3001;
const bluebird = require('bluebird');
let connection; // variable para almacenar la conexión a la DB

// configura el servidor para recibir datos en formato json
app.use(express.json());
app.use(cors({ origin: true }));

app.set('port', process.env.PORT || port)

app.get("/", (req, res) => {
    res.json("Backend misiontic Gestor Ventas");
});

//Productos

app.get("/productos", async (req, res) => {
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM mydb.productos");
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.get("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows, fields] = await connection.execute(`SELECT * FROM mydb.productos WHERE idproducto = ${id}`);
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.get("/productosprecio/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows, fields] = await connection.execute(`SELECT precio FROM mydb.productos WHERE producto = ${id}`);
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.get("/productosstock/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows, fields] = await connection.execute(`SELECT stock FROM mydb.productos WHERE producto = ${id}`);
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.put("/update-stock/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        await connection.execute(`UPDATE mydb.productos SET stock = ${stock} WHERE producto = ${id}`);
        res.json({ status: "ok" })
    } catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.post("/addproducto", async (req, res) => {
    try {
        const { producto, precio, stock } = req.body;
        await connection.execute(`INSERT INTO mydb.productos (producto, precio, stock) VALUES('${producto}',${precio}, ${stock})`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }

});

app.put('/updateproducto/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { producto, precio, stock } = req.body;
        await connection.execute(`UPDATE mydb.productos SET producto = '${producto}', precio = ${precio}, stock = ${stock} WHERE idproducto = ${id}`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.delete('/deleteproducto/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await connection.execute(`DELETE FROM mydb.productos WHERE idproducto = ${id}`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

//Ventas

app.get("/ventas", async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM mydb.ventas');
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.get("/ventas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows, fields] = await connection.execute(`SELECT * FROM mydb.ventas WHERE idventa = ${id}`);
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.post("/addventas", async (req, res) => {
    try {
        const { producto, fechaInicial, fechaFinal, tipoMercado, estado, cantidad, total_venta, vendedor, documentocliente, cliente } = req.body;
        await connection.execute(`INSERT INTO mydb.ventas (producto,fechaInicial,fechaFinal,tipoMercado,estado,cantidad,total_venta,vendedor,documentocliente,cliente) VALUES('${producto}','${fechaInicial}', '${fechaFinal}', '${tipoMercado}','${estado}', ${cantidad}, ${total_venta},'${vendedor}',${documentocliente},'${cliente}')`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.put('/updateventa/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { producto, fechaInicial, fechaFinal, tipoMercado, estado, cantidad, total_venta, vendedor, documentocliente, cliente } = req.body;
        await connection.execute(`UPDATE mydb.ventas SET producto = '${producto}', fechaInicial = '${fechaInicial}',fechaFinal= '${fechaFinal}',tipoMercado= '${tipoMercado}',estado= '${estado}',cantidad= ${cantidad},total_venta= ${total_venta},vendedor= '${vendedor}',documentocliente= ${documentocliente},cliente= '${cliente}' WHERE idventa = ${id}`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.delete('/deleteventa/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await connection.execute(`DELETE FROM mydb.ventas WHERE idventa = ${id}`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

//Vendedores

app.get("/vendedores", async (req, res) => {
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM mydb.vendedores');
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.get("/vendedores/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows, fields] = await connection.execute(`SELECT * FROM mydb.vendedores WHERE idvendedores = ${id}`);
        res.json({ data: rows });
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.get('/get-vendedores/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const [rows, fields] = await connection.execute(`SELECT * FROM mydb.vendedores WHERE correo = ${id}`);
        res.json(rows[0]);
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.post("/addvendedor", async (req, res) => {
    try {
        const { nombreVendedor,rol,correo} = req.body;
        await connection.execute(`INSERT INTO mydb.vendedores (nombreVendedor,rol,correo) VALUES('${nombreVendedor}','${rol}', '${correo}')`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});

app.put('/updatevendedor/:id', async(req, res) => {
    const { id } = req.params;
    const { nombreVendedor, rol, correo} = req.body;
    await connection.execute(`UPDATE vendedores SET nombreVendedor= '${nombreVendedor}', rol= '${rol}', correo= '${correo}' WHERE idvendedor = ${id}`);
    res.json({ status: "ok" })
    const sql = `UPDATE mydb.vendedores SET nombreVendedor= '${nombreVendedor}', rol= '${rol}', correo= '${correo}' WHERE idvendedor = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Vendedor Updated");
    })
});

app.delete('/deletevendedor/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await connection.execute(`DELETE FROM mydb.vendedores WHERE idvendedor = ${id}`);
        res.json({ status: "ok" })
    }
    catch (error) {
        console.log(error);
        res.json(error)
    }
});


app.listen(app.get('port'), async () => {
    connection = await mysql.createConnection({
        host: 'tu_host',
        user: 'tu_user',
        password: 'tu_password',
        database: 'nombre_bd',
        port: 3306,
        Promise: bluebird
    });
    console.log("Server running on port: " + app.get('port'));
});