const fs = require('fs');
const path = require('path');
let carritoFilePath = path.join(__dirname, '../Data/carrito.json');

module.exports = {
    todosLosCarritos:function () {
        let carritos = JSON.parse(fs.readFileSync(carritoFilePath));
        return carritos;
    },
    eliminarCarrito: function (cid) {
        let Carritos = this.todosLosCarritos()
        let resultadoC = Carritos.filter (carrito => carrito.cid !=cid)
        fs.writeFileSync(carritoFilePath, JSON.stringify(resultadoC), 'utf-8');
    }
}