const express = require('express')
const rutaInfo = express.Router()

rutaInfo.route('/')
    .get((req, res) => {
        res.json({
            'Argumentos de entrada': process.argv,
            'Nombre de la plataforma': process.platform,
            'Version de Node.js': process.version,
            'Memoria total reservada': process.memoryUsage().rss,
            'Path de ejecucion': process.pathExec,
            'Process id': process.pid,
            'Carperta del proyecto': process.cwd()
        })
    })

module.exports = rutaInfo