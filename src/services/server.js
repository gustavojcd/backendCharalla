const express = require('express')
const router = require('../routes/main')
const path = require('path')
const app = express()


app.use(express.static('public'));

//inicia configuracion de ejs
const viewsFolderPath = path.resolve(__dirname,'../../views')
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath)
//termina configuracion de ejs

app.use('/', router)

module.exports = app;