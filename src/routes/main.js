const { Router } = require('express')
const rutasProductos = require('./products')
const rutasUser = require('./user.routes')
const router = Router()

router.use('/productos', rutasProductos);
router.use('/user', rutasUser)
router.get('/', (req, res) => {
    res.render('home')
})
module.exports = router