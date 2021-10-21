const express = require("express")
const cors = require('cors')
const mysql = require("mysql2");
const bodyParser = require('body-parser')
const port = 3001;
const app = express();

app.use(bodyParser.json())
app.use(cors({origin: true}))

app.set('port', process.env.PORT || port)

const db = mysql.createPool({
   connectionLimit: 100,
   host: "localhost",       //This is your localhost IP
   user: "root",         // "newuser" created in Step 1(e)
   password: "12345678",  // password for the new user
   database: "mydb",      // Database name
   port: "3306"             // port name, "3306" by default
})

app.get('/',(req,res)=>{
    res.send("Welcome to my API");
    });

// clientes

app.get('/clientes',(req,res)=>{
    const sql = 'SELECT * FROM mydb.cliente';
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data1: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/clientes/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM mydb.cliente WHERE idcliente = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data2: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addcliente',(req,res)=>{
    const sql = 'INSERT INTO mydb.cliente SET ?';

    const clienteObj= { 
        idcliente: req.body.idcliente,
        nombreCliente: req.body.nombreCliente,
        documentoCliente: req.body.documentoCliente,
        vendedor_idvendedor: req.body.vendedor_idvendedor
    }

    db.query(sql,clienteObj, err =>{
        if(err) throw err;
        res.send("Cliente Creado");
    })
});

app.put('/updatecliente/:id',(req,res)=>{
    const {id} = req.params;
    const {nombreCliente, documentoCliente, vendedor_idvendedor} = req.body;
    const sql = `UPDATE mydb.cliente SET nombreCliente = '${nombreCliente}', documentoCliente= ${documentoCliente},vendedor_idvendedor = ${vendedor_idvendedor} WHERE idcliente = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Cliente Updated");
    })
});


app.delete('/deletecliente/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.cliente WHERE idcliente = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Cliente Deleted");
    })
});

// Estado

app.get('/estados',(req,res)=>{
    const sql = 'SELECT * FROM mydb.estado';
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data3: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/estados/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM mydb.estado WHERE idestado = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data4: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addestado',(req,res)=>{
    const sql = 'INSERT INTO mydb.estado SET ?';

    const estadoObj= { 
        idestado: req.body.idestado,
        estado: req.body.estado,
        producto_idproducto: req.body.producto_idproducto,
    }

    db.query(sql,estadoObj, err =>{
        if(err) throw err;
        res.send("Estado Creado");
    })
});

app.put('/updateestado/:id',(req,res)=>{
    const {id} = req.params;
    const {estado, producto_idproducto} = req.body;
    const sql = `UPDATE mydb.estado SET estado= '${estado}', producto_idproducto= ${producto_idproducto} WHERE idestado = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Estado Updated");
    })
});

app.delete('/deleteestado/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.estado WHERE idestado = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Estado Deleted");
    })
});

//Fecha

app.get('/fechas',(req,res)=>{
    const sql = 'SELECT * FROM mydb.fecha';
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data5: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/fechas/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM mydb.fecha WHERE idfecha = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data6: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addfecha',(req,res)=>{
    const sql = 'INSERT INTO mydb.fecha SET ?';

    const fechaObj= { 
        idfecha: req.body.idfecha,
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
    }

    db.query(sql,fechaObj, err =>{
        if(err) throw err;
        res.send("Fecha Creada");
    })
});

app.put('/updatefecha/:id',(req,res)=>{
    const {id} = req.params;
    const {fechaInicial, fechaFinal} = req.body;
    const sql = `UPDATE mydb.fecha SET fechaInicial= '${fechaInicial}', fechaFinal= '${fechaFinal}' WHERE idfecha = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Fecha Updated");
    })
});

app.delete('/deletefecha/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.fecha WHERE idfecha = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Fecha Deleted");
    })
});

//Mercados

app.get('/mercados',(req,res)=>{
    const sql = 'SELECT * FROM mydb.mercado';
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data7: results})
        } else {
            res.send('Not result');
        }
    });
});


app.get('/mercados/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM mydb.mercado WHERE idmercado = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data8: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addmercado',(req,res)=>{
    const sql = 'INSERT INTO mydb.mercado SET ?';

    const mercadoObj= { 
        idmercado: req.body.idmercado,
        tipoTienda: req.body.tipoTienda,
        producto_idproducto: req.body.producto_idproducto,
    }

    db.query(sql,mercadoObj, err =>{
        if(err) throw err;
        res.send("Mercado Creado");
    })
});

app.put('/updatemercado/:id',(req,res)=>{
    const {id} = req.params;
    const {tipoTienda, producto_idproducto} = req.body;
    const sql = `UPDATE mydb.mercado SET tipoTienda= '${tipoTienda}', producto_idproducto= ${producto_idproducto} WHERE idmercado = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Mercado Updated");
    })
});


app.delete('/deletemercado/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.mercado WHERE idmercado = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Mercado Deleted");
    })
});


//Productos

app.get('/productos',(req,res)=>{
    const sql = 'SELECT * FROM mydb.producto';
    db.query(sql, (err,results)=>{
        //if (err) throw err;
        if (results.length>0){
            res.json({data9: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/productos/:id',(req,res)=>{
    try {
        const {id} = req.params;
        const sql = `SELECT * FROM mydb.producto WHERE idproducto = ${id}`;
        db.query(sql, (err,results)=>{
            console.log(err);
            if (results.length>0){
                res.json({data10: results})
            } else {
                res.send('Not result');
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.get('/precio/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT precio FROM mydb.producto WHERE idproducto = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data11: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/cantidad/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT cantidad FROM mydb.producto WHERE idproducto = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data12: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addproducto',(req,res)=>{
    try {
        const sql = 'INSERT INTO mydb.producto SET ?';
        const productoObj= { 
        idproducto: req.body.idproducto,
        producto: req.body.producto,
        stock: req.body.stock,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        vendedor_idvendedor: req.body.vendedor_idvendedor
    }
    db.query(sql,productoObj, err =>{
        console.log(err);
        res.send("Producto Creado");
    })
    } catch (error) {
        console.log(error);
    }
});

app.put('/updateproducto/:id',(req,res)=>{
    const {id} = req.params;
    const {producto, stock, precio, cantidad, vendedor_idvendedor} = req.body;
    const sql = `UPDATE mydb.producto SET producto = '${producto}', stock = ${stock}, precio = ${precio}, cantidad = ${cantidad}, vendedor_idvendedor = ${vendedor_idvendedor} WHERE idproducto = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Producto Updated");
    })
});

app.delete('/deleteproducto/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.producto WHERE idproducto = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Producto Deleted");
    })
});

// Total Venta

app.get('/totalventa',(req,res)=>{
    const sql = 'SELECT * FROM mydb.totalventa';
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data13: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/totalventa/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM mydb.totalventa WHERE idtotalVenta = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data14: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addtotalventa',(req,res)=>{
    const sql = 'INSERT INTO mydb.totalventa SET ?';

    const fechaObj= { 
        idtotalVenta: req.body.idtotalVenta,
        totalVenta: req.body.totalVenta,
        vendedor_idvendedor: req.body.vendedor_idvendedor,
    }

    db.query(sql,fechaObj, err =>{
        if(err) throw err;
        res.send("Total Venta Creado");
    })
});

app.put('/updatetotalventa/:id',(req,res)=>{
    const {id} = req.params;
    const {totalVenta, vendedor_idvendedor} = req.body;
    const sql = `UPDATE mydb.totalventa SET totalVenta= ${totalVenta}, vendedor_idvendedor= ${vendedor_idvendedor} WHERE idtotalVenta = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Total Venta Updated");
    })
});

app.delete('/deletetotalventa/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.totalventa WHERE idtotalVenta = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Total Venta Deleted");
    })
});

// Vendedores

app.get('/vendedores',(req,res)=>{
    const sql = 'SELECT * FROM mydb.vendedor';
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data15: results})
        } else {
            res.send('Not result');
        }
    });
});

app.get('/vendedores/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `SELECT * FROM mydb.vendedor WHERE idvendedor = ${id}`;
    db.query(sql, (err,results)=>{
        if (err) throw err;
        if (results.length>0){
            res.json({data16: results})
        } else {
            res.send('Not result');
        }
    });
});

app.post('/addvendedor',(req,res)=>{
    const sql = 'INSERT INTO mydb.vendedor SET ?';

    const vendedorObj= { 
        idvendedor: req.body.idvendedor,
        nombreVendedor: req.body.nombreVendedor,
        fecha_idfecha: req.body.fecha_idfecha,
    }

    db.query(sql,vendedorObj, err =>{
        if(err) throw err;
        res.send("Vendedor Creado");
    })
});

app.put('/updatevendedor/:id',(req,res)=>{
    const {id} = req.params;
    const {nombreVendedor, fecha_idfecha} = req.body;
    const sql = `UPDATE mydb.vendedor SET nombreVendedor= '${nombreVendedor}', fecha_idfecha= '${fecha_idfecha}' WHERE idvendedor = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Vendedor Updated");
    })
});

app.delete('/deletevendedor/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `DELETE FROM mydb.vendedor WHERE idvendedor = ${id}`;
    db.query(sql, err =>{
        if(err) throw err;
        res.send("Vendedor Deleted");
    })
});

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

app.listen(app.get('port'), 
    ()=> console.log(`Server Started on port ${port}...`))

