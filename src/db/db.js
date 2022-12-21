const mongoose = require('mongoose')
const Config = require('../config/index')

const initDb = () => {
    return mongoose.connect(Config.MONGO_ATLAS_URL)
}

module.exports = {
    initDb
}