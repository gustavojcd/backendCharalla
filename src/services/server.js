const express = require('express')
const router = require('../routes/main')
const http = require('http')
const path = require('path')
const { myWSServer } = require('./socket')

//-----------------------------------------------
const session = require('express-session')
const passport = require('passport')
const { loginFunc, signUpFunc } = require('./auth')
const MongoStore = require('connect-mongo')
const Config = require('../config/index')
const { initDb } = require('../db/db')
//-----------------------------------------------

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

//-------------------------------------
initDb();
console.log('Conectado a la DB!');

const ttlSeconds = 180;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
    // crypto: {
    //   secret: 'squirrel',
    // },
  }),
  secret: 'secretString',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions)); 

app.use(passport.initialize());

app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

//-------------------------------------


app.use('/', router);

module.exports = myHTTPServer;