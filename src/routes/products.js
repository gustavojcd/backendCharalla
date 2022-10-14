const express = require('express')
const { Contenedor } = require('../contenedor.js')
const rutasProductos = express.Router()
const productos = new Contenedor('src/data/products.json');
const { v4: uuidv4 } = require('uuid');

rutasProductos.use(express.json());
rutasProductos.use(express.urlencoded({ extended: true }));

rutasProductos.route('/:id')
    .get((req, res) => {
        const id = req.params.id
        const result = productos.getById(id)
        if (!result) {
            return res.status(404).json({ error: "producto no encontrado" });
        }
        res.send(result);
    })
    .put((req, res) => {
        const id = req.params.id
        const { title, stock, price, img } = req.body
        const index = productos.getIndex(id)
        if (index < 0) {
            return res.status(404).json({
                error: "El Producto no existe"
            })
        }
        if (!title || !stock || !price || !img) {
            return res.status(400).json({
                error: "Campos Vacios "
            })
        }
        const updateProd = {
            id: id,
            title: title,
            stock: stock,
            price: price,
            img: img
        }
        productos.update(updateProd, index)
        res.json({
            msg: `El producto con ID = ${id}, ha sido modificado.`,
            data: updateProd,
        })
    })
    .delete((req, res) => {
        const id = req.params.id
        const result = productos.deleteById(id)
        res.send(result)
    })

rutasProductos.route('/')
    .get((req, res) => {
        const allProds = productos.getAll()
        res.send(allProds)
    })
    .post((req, res) => {
        const { title, stock, price, img } = req.body
        const newProduct = {
            id: uuidv4(),
            title: title,
            stock: stock,
            price: price,
            img: img,
        }
        productos.save(newProduct)
        res.send(newProduct)
    })

module.exports = rutasProductos