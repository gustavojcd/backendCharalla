const { faker } = require('@faker-js/faker');
faker.locale = "es";

const generateProducts = () => ({
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(100),
    img: faker.image.imageUrl()
})

module.exports = {
    generateProducts
}