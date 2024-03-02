//Dependencias
import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import path from "path"
import ProductManager from './manager/ProductManager.js';
import viewsRouter from './routes/viewsRoutes.js';
import { Server } from 'socket.io';


/* const methodOverride = require('method-override'); */
const app = express();

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//servidor para sockets dentro del servidor principal
const io = new Server(httpServer);

/* //Rutas requeridas (REPARAR RUTAS ***************)
import router from './routes/rutasDeProductos.js';
 const router = require ( './Rutas/rutasDeCarrito.js'); */

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, "..", '/views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));
app.use('/', viewsRouter);

//Uso de Rutas
/* app.use('/api/products', rutasProductos); */
/* app.use('/api/carts', rutasCarrito); */

/* //Uso de PUT y DELETE
app.use(methodOverride('_method')); */

//Evitar 404
app.get('*', (req, res) => {
    res.send(`
    <h1>No existe esa página</h1>
    <h3><a href="/">Volver al Home</a></h3>
    `)
});



//Inicio la conexion del servidor con SOCKET

const manager =  new ProductManager(__dirname,"../DB/productos.json");
io.on('connection', socket => {
    console.log('New client connect: ', socket.id)

    socket.on('new product', async (data) => {
        await manager.addProduct(data);
        const allProducts = manager.getProducts()
        io.emit('updated', allProducts)
    });
});