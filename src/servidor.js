const express = require('express')
const { Contenedor } = require('./contenedor')

const app = express()
const productos = new Contenedor('src/products.json');
const allProds = productos.getAll()

app.get('/productos', function (req, res) {
  res.send(allProds)
})

app.get('/productosRandom', function (req, res) {
  const id = parseInt(Math.random() * parseInt(allProds.length)) + 1
  const randProd = productos.getById(id)
  res.send(randProd)
})

app.listen(8080)