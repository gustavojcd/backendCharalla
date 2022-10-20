const { Router } = require('express')
const rutasProductos = require('./products')
const router = Router()

router.use('/productos', rutasProductos);

router.use('/', (req, res) => {
    res.render('home')
})

module.exports = router