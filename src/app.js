//Dependencias
const express = require('express');
/* const methodOverride = require('method-override'); */
const app = express();
const port = 8080;
const path = require('path');

//Rutas requeridas
const rutasProductos = require(path.resolve('./src/Rutas/rutasDeProductos.js'));
const rutasCarrito = require(path.resolve('./src/Rutas/rutasDeCarrito.js'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Uso de Rutas
app.use('/api/products', rutasProductos);
app.use('/api/carts', rutasCarrito);

/* //Uso de PUT y DELETE
app.use(methodOverride('_method')); */

//Evitar 404
app.get('*', (req, res) => {
    res.send(`
    <h1>No existe esa página</h1>
    <h3><a href="/">Volver al Home</a></h3>
    `)
});

//Escucha de Puertos
app.listen(port, () => {
    console.log(`
    Servidor levantado correctamente en el puerto ${port}
    http://localhost:${port}/
    `);
});