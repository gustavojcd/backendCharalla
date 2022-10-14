const { Router } = require('express')
const rutasProductos = require('./products')
const router = Router()

router.use('/productos', rutasProductos);

module.exports = router