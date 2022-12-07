const { createProductsMock, getAllProducts } = require('../services/products.services')

const getProducts = async (req, res) => {
    try {
        await createProductsMock();
        const response = await getAllProducts();
        res.status(200).json({ response });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProducts };