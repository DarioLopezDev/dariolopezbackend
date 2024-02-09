const fs = require('fs');
const path = require('path');
let productosFilePath = path.join(__dirname, '../Data/productos.json');
const controladorDB = require('../ControladorDB/controladorDBproductos.js')


///////////////*******************************///////////////
//Muestra en Consola los productos cargados del archivo productos.json
/* console.log(productos) */
///////////////*******************************///////////////


const controladorDeProductos = {

    productos: function (req, res) {
        let productos = controladorDB.todosLosProductos()
        res.json(productos);
    },
    productoUnico: function (req, res) {
        let pid = req.params.pid;
        let productos = controladorDB.todosLosProductos()
        let productoEncontrado = productos.find((producto) => {
            return producto.id == pid
        })
        console.log(pid)
        if (productoEncontrado) return res.json(productoEncontrado)
        res.status(400).send("producto no encontrado")
    },
    productosNuevos: function (req, res) {
        let productos = controladorDB.todosLosProductos()
        let productosId = productos.map (producto => producto.id )
        productosId.sort(function(a, b) {
            return b - a;
        });
        let nuevoID = productos.length ? productosId[0]+1 : 1
        let nuevoProducto = {
            "id": nuevoID,
            "title": req.body.title,
            "description": req.body.description,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "stock": req.body.stock,
            "code": req.body.code,
            "status": true && req.body.status,
            "category": req.body.category
        }
        productos.push(nuevoProducto)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos), 'utf-8');
        res.send("el producto fue agregado correctamente")
    },
    actualizarProductos: function (req, res) {
        let pid = req.params.pid;
        controladorDB.eliminarProductos(pid)
        let productos = controladorDB.todosLosProductos()
        let productoActualizado = {
            "id": Number(pid),
            "title": req.body.title,
            "description": req.body.description,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "stock": req.body.stock,
            "code": req.body.code,
            "status": true && req.body.status,
            "category": req.body.category
        }
        productos.push(productoActualizado)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos), 'utf-8');
        res.send("el producto fue actualizado correctamente")
    },
    eliminarProductos: function (req, res) {
        let pid = req.params.pid;
        controladorDB.eliminarProductos(pid)
        res.send ("Se ha eliminado de forma correcta el producto");
    }
}

module.exports = controladorDeProductos