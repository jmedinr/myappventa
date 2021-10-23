const express = require("express")
const cors = require('cors')
const mysql = require("mysql2");
const bodyParser = require('body-parser')
const port = 3001;
const app = express();

app.use(express.json())
app.use(cors({ origin: true }))

app.set('port', process.env.PORT || port)

const db = mysql.createPool({
    host: "sql10.freesqldatabase.com",       //This is your localhost IP
    user: "sql10445630",         // "newuser" created in Step 1(e)
    password: "LlZzSbYFhk",  // password for the new user
    database: "sql10445630",      // Database name
    port: "3306"             // port name, "3306" by default
})

app.get('/', (req, res) => {
    res.json("Welcome to my API Back");
});

// clientes

app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM mydb.cliente';
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ data1: results })
        } else {
            res.send('Not result');
        }
    });
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM mydb.cliente WHERE idcliente = ${id}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ data2: results })
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addcliente', (req, res) => {
    const sql = 'INSERT INTO mydb.cliente SET ?';

    const clienteObj = {
        idcliente: req.body.idcliente,
        nombreCliente: req.body.nombreCliente,
        documentoCliente: req.body.documentoCliente,
        vendedor_idvendedor: req.body.vendedor_idvendedor
    }

    db.query(sql, clienteObj, err => {
        if (err) throw err;
        res.send("Cliente Creado");
    })
});

app.put('/updatecliente/:id', (req, res) => {
    const { id } = req.params;
    const { nombreCliente, documentoCliente, vendedor_idvendedor } = req.body;
    const sql = `UPDATE mydb.cliente SET nombreCliente = '${nombreCliente}', documentoCliente= ${documentoCliente},vendedor_idvendedor = ${vendedor_idvendedor} WHERE idcliente = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Cliente Updated");
    })
});


app.delete('/deletecliente/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM mydb.cliente WHERE idcliente = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Cliente Deleted");
    })
});


//Productos


app.post('/addproducto', (req, res) => {
    const sql = 'INSERT INTO productos SET ?';

    const clienteObj = {
        idproducto: req.body.idproducto,
        producto: req.body.producto,
        precio: req.body.precio,
        stock: req.body.stock
    }

    db.query(sql, clienteObj, err => {
        if (err) throw err;
        res.send("Producto Creado");
    })
});

app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        //if (err) throw err;
        if (results.length > 0) {
            res.json({ data9: results })
        } else {
            res.send('Not result');
        }
    });
});

app.get('/ventas', (req, res) => {
    const sql = 'SELECT * FROM ventas';
    db.query(sql, (err, results) => {
        //if (err) throw err;
        if (results.length > 0) {
            res.json({ data10: results })
        } else {
            res.send('Not result');
        }
    });
});

app.get('/productos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM productos WHERE idproducto = ${id}`;
        db.query(sql, (err, results) => {
            console.log(err);
            if (results.length > 0) {
                res.json({ data10: results })
            } else {
                res.send('Not result');
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.get('/precio/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT precio FROM mydb.producto WHERE idproducto = ${id}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ data11: results })
        } else {
            res.send('Not result');
        }
    });
});

app.get('/cantidad/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT cantidad FROM mydb.producto WHERE idproducto = ${id}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ data12: results })
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addventas', (req, res) => {
    try {
        const sql = 'INSERT INTO ventas SET ?';
        const productoObj = {
            idproducto: req.body.idproducto,
            producto: req.body.producto,
            fechaInicial: req.body.fechaInicial,
            fechaFinal: req.body.fechaFinal,
            tipoMercado: req.body.tipoMercado,
            estado: req.body.estado,
            cantidad: req.body.cantidad,
            total_venta: req.body.total_venta
        }
        db.query(sql, productoObj, err => {
            console.log(err);
            res.send("Producto Creado");
        })
    } catch (error) {
        console.log(error);
    }
});

app.put('/updateproducto/:id', (req, res) => {
    const { id } = req.params;
    const { producto, stock, precio, cantidad, vendedor_idvendedor } = req.body;
    const sql = `UPDATE mydb.producto SET producto = '${producto}', stock = ${stock}, precio = ${precio}, cantidad = ${cantidad}, vendedor_idvendedor = ${vendedor_idvendedor} WHERE idproducto = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Producto Updated");
    })
});

app.delete('/deleteproducto/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM mydb.producto WHERE idproducto = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Producto Deleted");
    })
});

// Vendedores

app.get('/vendedores', (req, res) => {
    const sql = 'SELECT * FROM mydb.vendedor';
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ data15: results })
        } else {
            res.send('Not result');
        }
    });
});

app.get('/vendedores/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM mydb.vendedor WHERE idvendedor = ${id}`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ data16: results })
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addvendedor', (req, res) => {
    const sql = 'INSERT INTO mydb.vendedor SET ?';

    const vendedorObj = {
        idvendedor: req.body.idvendedor,
        nombreVendedor: req.body.nombreVendedor,
        fecha_idfecha: req.body.fecha_idfecha,
    }

    db.query(sql, vendedorObj, err => {
        if (err) throw err;
        res.send("Vendedor Creado");
    })
});

app.put('/updatevendedor/:id', (req, res) => {
    const { id } = req.params;
    const { nombreVendedor, fecha_idfecha } = req.body;
    const sql = `UPDATE mydb.vendedor SET nombreVendedor= '${nombreVendedor}', fecha_idfecha= '${fecha_idfecha}' WHERE idvendedor = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Vendedor Updated");
    })
});

app.delete('/deletevendedor/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM mydb.vendedor WHERE idvendedor = ${id}`;
    db.query(sql, err => {
        if (err) throw err;
        res.send("Vendedor Deleted");
    })
});

app.listen(app.get('port'),
    () => console.log(`Server Started on port ${port}...`))

db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connected successful: " + connection.threadId)
})