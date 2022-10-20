const express = require('express')
const router = require('../routes/main')
const app = express()
const path = require('path')

app.use(express.static('public'));

//inicia la configuracion de Pug
const viewsFolderPath = path.resolve(__dirname, '../../views');

app.set('views', viewsFolderPath)
app.set('view engine', 'pug')
//termina la configuracion de Pug

app.use('/', router)

module.exports = app;