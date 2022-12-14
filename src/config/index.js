const dotenv = require('dotenv');

dotenv.config();

module.exports={
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL
}