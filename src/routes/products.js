const express = require('express')
const rutasProductos = express.Router()

const { list, created } = require('../controller/controller.products')

rutasProductos.use(express.json());
rutasProductos.use(express.urlencoded({ extended: true }));

rutasProductos.route('/')
    .get(list)
    .post(created)

module.exports = rutasProductos