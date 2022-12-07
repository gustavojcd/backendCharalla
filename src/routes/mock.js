const express = require('express');
const rutaMock = express.Router();
const {getProducts} = require('../controller/products.controller')

rutaMock.use(express.json());
rutaMock.use(express.urlencoded({ extended: true }));

rutaMock.route('/')
    .get(getProducts)

module.exports= rutaMock;