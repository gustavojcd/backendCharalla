const express = require('express')
const router = require('../routes/main')
const http = require('http')
const path = require('path')
const { myWSServer } = require('./socket')
//----------------------------------------
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('../config/index');

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: '1234',
        },
    }),
    secret: 'secretString',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
    },
};

//-------------------------------------------
const app = express()
const myHTTPServer = http.Server(app)

app.use(express.static('public'));

//inicia la configuracion de Pug
const viewsFolderPath = path.resolve(__dirname, '../../views');

app.set('views', viewsFolderPath)
app.set('view engine', 'pug')
//----------------------------------------------------

//inicia la configuracion de SocketIo
myWSServer(myHTTPServer);
//-------------------------------------

//Configuracio de cookies y session
app.use(cookieParser());
app.use(session(StoreOptions));
//-------------------------------

app.use('/', router);

module.exports = myHTTPServer;