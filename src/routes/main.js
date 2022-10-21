const { Router } = require('express')
const rutasProductos = require('./products')
const router = Router()

router.use('/productos', rutasProductos);
router.use('/', (req, res) => {
    res.render('pages/home')
})
module.exports = router