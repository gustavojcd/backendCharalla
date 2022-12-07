const {generateProducts} = require("../utils/products.utils");
const { v4: uuidv4 } = require('uuid');

let products = []

const createProductsMock = async () => {
    cant = 5
    for (let i = 0; i < cant; i++) {
        const product = generateProducts();
        product.id = uuidv4();
        product.stock = Math.floor(Math.random() * 100) + 1;
        products.push(product);
    }
}

const getAllProducts = async () => {
    return products
}

module.exports = {
    createProductsMock,
    getAllProducts
}