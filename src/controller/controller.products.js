const { contenedor } = require('../services/services.products.js');
const { socketEmit } = require('../services/socket')

const list = async (req, res) => {
    try {
        const allProds = await contenedor.getAll();
        res.render('products', { allProds: allProds })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

const created = async (req, res) => {
    try {
        const { title, stock, price, img } = req.body
        if (!title || !stock || !price || !img) {
            return res.status(400).json({
                error: "Campos Vacios "
            })
        }
        const newProduct = {
            title: title,
            stock: stock,
            price: price,
            img: img,
        }
        await contenedor.createProduct(newProduct)
        socketEmit('producto', newProduct)
        res.redirect('/')
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    list,
    created,
}