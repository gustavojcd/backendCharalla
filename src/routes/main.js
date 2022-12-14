const express = require('express')
const rutasProductos = require('./products')
const rutasUser = require('./user.routes')

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/productos', rutasProductos);
router.use('/', rutasUser);

router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router