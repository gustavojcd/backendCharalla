const express = require('express')
const router = require('../routes/main')
const app = express()
const path = require('path')
const { engine } = require('express-handlebars')

app.use(express.static('public'));

//inicia la configuracion de express-handlebars
const viewsFolderPath = path.resolve(__dirname, '../../views')
const layoutsFolderPath = path.resolve(`${viewsFolderPath}/layouts`)
const partialsFolderPath = path.resolve(__dirname, `${viewsFolderPath}/partials`)
const defaultLayoutPath = path.resolve(__dirname, `${layoutsFolderPath}/main.hbs`)

app.engine('hbs', engine({
    layoutDir: layoutsFolderPath,
    extname: 'hbs',
    defaultLayout: defaultLayoutPath,
    partialsDir: partialsFolderPath
}))
app.set('view engine', 'hbs')
app.set('views', viewsFolderPath)
//termina la configuracion de express-hanldebars

app.use('/', router)

module.exports = app;