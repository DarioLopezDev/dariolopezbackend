import express from 'express';
import { ProductManager } from './productManager.js';

const app = express();
const port = 3500;

app.get('/products', (req, res) => {
    const allProducts = new ProductManager();
    const prodList = allProducts.getProducts();
    const maxProducts = Object.keys(allProducts).length - 1;
    const newLimit = req.query.limit;
    if (newLimit !== undefined) {
        if (newLimit > maxProducts || newLimit <= 0 || isNaN(newLimit)) {
            res.send('El limite debe ser un numero mayor a cero e igual o menor a la cantidad de productos');
        } else {
            res.send(Object.entries(prodList).slice(0, newLimit));
        }
    } else {
        res.send(allProducts.getProducts());
    }
});

app.get('/products/:pid', (req, res) => {
    const allProducts = new ProductManager();
    const newPid = req.params.pid;
    const selectedProduct = allProducts['products'][newPid];
    if (newPid !== undefined && selectedProduct !== undefined) {
        if (newPid <= 0 || isNaN(newPid)) {
            res.send('El ID debe ser un numero mayor a cero y existir en la lista de productos');
        } else {
            res.send(selectedProduct);
        }
    } else {
        res.send('El ID debe ser un numero mayor a cero y existir en la lista de productos');
    }
});

app.get('*', (req, res) => {
    res.send('Error 404');
});

app.listen(port, () => console.log(`Servidor Funcionando en http://localhost:${port}`));