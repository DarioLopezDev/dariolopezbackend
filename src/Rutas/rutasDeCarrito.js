const express = require('express');
const router = express.Router();
const path = require('path');

const controladorDeCarrito = require('../Controladores/controladorDeCarrito.js');


router.post('/', controladorDeCarrito.crearCarrito)
router.get('/', controladorDeCarrito.listarCarrito)
router.get('/:cid', controladorDeCarrito.listarProductosDelCarrito)
router.post('/:cid/product/:pid', controladorDeCarrito.agregarAlCarrito)

module.exports = router;