const express = require('express')
const router = require('../routes/main')
const http = require('http')
const path = require('path')
const { myWSServer } = require('./socket')


const app = express()
const myHTTPServer = http.Server(app)

app.use(express.static('public'));

//inicia la configuracion de Pug
const viewsFolderPath = path.resolve(__dirname, '../../views');

app.set('views', viewsFolderPath)
app.set('view engine', 'pug')
//termina la configuracion de Pug

//inicia la configuracion de SocketIo
myWSServer(myHTTPServer);
//-------------------------------------

app.use('/', router);

module.exports = myHTTPServer;