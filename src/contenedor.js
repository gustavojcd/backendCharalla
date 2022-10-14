const fs = require('fs');
const fsPromises = fs.promises

class Contenedor {
    constructor(filename, prods = []) {
        this.filename = filename;
        this.prods = prods;
        if (!fs.existsSync(this.filename)) {
            this.writeProductsTxt(this.filename);
        }
    }
    async writeProductsTxt(filename) {
        try {
            await fsPromises.writeFile(filename, JSON.stringify(this.prods, null, '\t'));
        } catch (error) {
            console.error(error);
        }
    }
    readProductsTxt(filename) {
        let rawProds = fs.readFileSync(filename, 'utf8');
        if (rawProds.length === 0) {
            return this.prods;
        } else {
            let newProds = JSON.parse(rawProds);
            this.prods = [...newProds];
        }
    }
    save(params) {
        this.readProductsTxt(this.filename)
        this.prods.push(params)
        this.writeProductsTxt(this.filename);
    }
    update(updateProd, index) {
        this.prods.splice(index, 1, updateProd)
        this.writeProductsTxt(this.filename)
    }
    getIndex(id) {
        this.readProductsTxt(this.filename);
        const index = this.prods.findIndex((prod) => prod.id === id)
        return index
    }
    getById(id) {
        this.readProductsTxt(this.filename);
        const index = this.prods.findIndex((prod) => prod.id === id)
        return index >= 0 ? this.prods[index] : null;
    }
    getAll() {
        this.readProductsTxt(this.filename);
        return this.prods;
    }
    deleteById(id) {
        this.readProductsTxt(this.filename);
        for (let x = 0; x < this.prods.length; x++) {
            if (this.prods[x].id === id) {
                this.prods.splice(x, 1);
                this.writeProductsTxt(this.filename);
                return "el ID ha sido eliminado; archivo actualizado"
            }
        }
        return "el ID ingresado no existe";
    }
    deleteAll() {
        this.prods = [];
        this.writeProductsTxt(this.filename);
        return "todos los productos borrados; archivo actualizado"
    }
}

module.exports = { Contenedor }
