const express = require('express')
const { Contenedor } = require('../contenedor.js')
const rutasProductos = express.Router()
const productos = new Contenedor('src/data/products.json');
const { v4: uuidv4 } = require('uuid');
const { socketEmit } = require('../services/socket')

rutasProductos.use(express.json());
rutasProductos.use(express.urlencoded({ extended: true }));

rutasProductos.route('/')
    .get((req, res) => {
        const allProds = productos.getAll()
        res.render('products', { allProds: allProds })
    })
    .post((req, res) => {
        const { title, stock, price, img } = req.body
        if (!title || !stock || !price || !img) {
            return res.status(400).json({
                error: "Campos Vacios "
            })
        }
        const newProduct = {
            id: uuidv4(),
            title: title,
            stock: stock,
            price: price,
            img: img,
        }
        productos.save(newProduct)
        socketEmit('producto', newProduct)
        res.redirect('/')
    })

module.exports = rutasProductos