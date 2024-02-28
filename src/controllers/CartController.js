/* const fs = require('fs');
const path = require('path');
let carritoFilePath = path.join(__dirname, '../Data/carrito.json');
const controladorDBc = require('../ControladorDB/controladorDBcarrito.js')
const controladorDB = require('../ControladorDB/controladorDBproductos.js')

const controladorDeCarrito = {

    crearCarrito: function (req, res) {
        let carritos = controladorDBc.todosLosCarritos()
        let nuevoIDc = carritos.length ? Number(carritos[carritos.length - 1].cid) + 1 : 1;
        let nuevoCarrito = {
            "cid": nuevoIDc,
            "products": [],
        }
        carritos.push(nuevoCarrito)
        fs.writeFileSync(carritoFilePath, JSON.stringify(carritos), 'utf-8');
        res.send("el carrito fue creado correctamente")
    },
    listarCarrito: function (req, res) {
        let carritos = controladorDBc.todosLosCarritos()
        res.json(carritos)
    },
    listarProductosDelCarrito: function (req, res) {
        let cid = req.params.cid;
        let carritos = controladorDBc.todosLosCarritos()
        let carritoBuscado = carritos.find(carrito => carrito.cid == cid)
        if (carritoBuscado) return res.json(carritoBuscado.products)
        res.send("el carrito con esa id no existe")
    },
    agregarAlCarrito: function (req, res) {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let carritos = controladorDBc.todosLosCarritos()
        let carritoBuscado = carritos.find(carrito => carrito.cid == cid)
        if (!carritoBuscado) return res.send("el carrito con esa id no existe")
        let products = controladorDB.todosLosProductos()
        let productoBuscado = products.find(producto => producto.id == pid)
        if (!productoBuscado) return res.send("el producto con esa id no existe")
        if (!carritoBuscado.products.find(producto => producto.id == pid)) {
            carritoBuscado.products.push({
                pid: productoBuscado.id,
                quantity: 1,
            })
        }else{
            carritos.forEach(carrito => {
                if (carrito.cid == cid) {
                    carrito.products.forEach (producto => {
                        if(producto.id == pid){
                            producto.quantity++
                        }
                    })
                }
            });

        }
        fs.writeFileSync(carritoFilePath, JSON.stringify(carritos), 'utf-8');
        res.send ("producto agregado")
    },
}

module.exports = controladorDeCarrito */