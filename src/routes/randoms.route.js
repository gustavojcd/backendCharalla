const express = require('express')
const { fork } = require('child_process')
const path = require('path')

const pathScript = path.resolve(__dirname, '../utils/calculo.js')
const rutaRandom = express.Router()

rutaRandom.route('')
    .get((req, res) => {
        try {
            const cant = req.query.cant || 100_000_000
            console.log(cant)
            const computo = fork(pathScript)
            computo.send(cant)
            computo.on('message', (contador) => {
                res.json(contador)
            })
        } catch (error) {
            console.log(error)
        }
    })

module.exports = rutaRandom