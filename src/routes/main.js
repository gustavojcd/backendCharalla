const { Router } = require('express')
const rutasProductos = require('./products')
const rutasUser = require('./user.routes')
const rutaInfo = require('./info')
const rutaRandom = require('./randoms.route')
const router = Router()

router.use('/api/randoms', rutaRandom)
router.use('/info', rutaInfo)
router.use('/productos', rutasProductos);
router.use('/user', rutasUser)
router.get('/', (req, res) => {
    res.render('home')
})
module.exports = router