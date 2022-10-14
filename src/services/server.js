const express = require('express')
const router = require('../routes/main')
const app = express()

app.use(express.static('public'));

app.use('/api', router)

module.exports = app;