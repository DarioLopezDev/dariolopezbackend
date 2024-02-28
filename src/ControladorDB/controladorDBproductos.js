/* const fs = require('fs');
const path = require('path');
let productosFilePath = path.join(__dirname, '../Data/productos.json');

module.exports = {
    todosLosProductos:function () {
        let productos = JSON.parse(fs.readFileSync(productosFilePath));
        return productos;
    },
    eliminarProductos: function (id) {
        let productos = this.todosLosProductos()
        let resultado = productos.filter (producto => producto.id !=id)
        fs.writeFileSync(productosFilePath, JSON.stringify(resultado), 'utf-8');
    }
} */