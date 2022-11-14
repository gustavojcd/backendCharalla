const db = require('../../db/mariaDB')

class Contenedor {
    constructor(db, tblProductos) {
        this.db = db;
        this.tblProductos = tblProductos;
    }

    createProduct(obj) {
        return this.db(this.tblProductos).insert(obj)
    }

    getAll() {
        return this.db(this.tblProductos)
            .select('*')
    }
    getById(id) {
        return this.db(this.tblProductos)
            .where(id)
            .select('*')
    }

    deleteById(id) {
        return this.db(this.tblProductos).where('id', id).del()
    }

    update(id, obj) {
        return this.db(this.tblProductos).where('id', id).update(obj)
    }
}
const contenedor = new Contenedor(db, 'products');

module.exports = {
    contenedor: contenedor
}