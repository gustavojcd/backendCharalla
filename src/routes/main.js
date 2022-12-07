const { Router } = require('express');
const rutasProductos = require('./products');
const rutaMock = require('./mock');
const router = Router()

router.use('/productos', rutasProductos);

//Aqui la ruta para el desafio Mocks y Normalizacion
router.use('/api/productos-test', rutaMock)

router.get('/', (req, res) => {
    res.render('home')
})
module.exports = router