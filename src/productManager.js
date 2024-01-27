const fs = require('fs');
const pathFile = require('path');
const datos = 'datos.json';

const finished = (error) => {
    if (error) {
        console.error(error);
        return;
    }
};

class ProductManager {
    constructor(path = process.cwd(), file = datos) {
        this.path = path;
        this.file = file;
        this.originalProducts = {};
        this.currentId = 0;

        if (!fs.existsSync(pathFile.join(this.path, this.file))) {
            try {
                fs.writeFileSync(pathFile.join(this.path, this.file), JSON.stringify(this.originalProducts, null, 2));
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }

        const readProducts = fs.readFileSync(pathFile.join(this.path, this.file), 'utf-8');
        this.products = JSON.parse(readProducts);
        this.currentId = Object.keys(this.products)[Object.keys(this.products).length - 1];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (stock <= 0 || typeof stock !== 'number') {
            console.log('Debe ingresar una cantidad real');
            return '';
        }

        let ids = [];
        let codes = [];
        Object.entries(this.products).forEach((producto) => {
            ids.push(producto[0]);
            codes.push(producto[1]['code']);
        });

        let max = Math.max(...ids);

        if (max == '-Infinity') {
            max = 0;
        }

        if (codes.includes(code)) {
            console.log('El codigo no debe repetirse');
            return '';
        }

        let thisItem = {};

        thisItem.id = max + 1;
        thisItem.title = title;
        thisItem.description = description;
        thisItem.price = price;
        thisItem.thumbnail = thumbnail;
        thisItem.code = code;
        thisItem.stock = stock;

        this.products[thisItem.id] = thisItem;

        fs.writeFileSync(pathFile.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto agregado correctamente con el id ${thisItem.id}`);
    }

    getProducts() {
        if (this.currentId >= 1) {
            return this.products;
        } else {
            console.log('No se encontraron productos');
            return '';
        }
    }

    getProductById(id = null) {
        if (this.products[id] === undefined) {
            console.log(`No se encontro un producto con el codigo ${id}`);
            return '';
        } else if (this.products[id]['title'] === undefined) {
            console.log(`El producto esta vacio`);
            return '';
        } else {
            return this.products[id];
        }
    }

    updateProduct(id, title, description, price, thumbnail, code, stock) {
        if (this.products[id] === undefined) {
            console.log(`No se encontro un producto con el codigo ${id}`);
            return '';
        } else {
            for (let i = 0; i < Object.keys(this.products).length; i = i + 1) {
                if (Object.values(this.products).find((value) => this.products[i + 1]['code'] === code) !== undefined) {
                    if (id - 1 !== i) {
                        console.log('El codigo no debe repetirse');
                        return '';
                    }
                }
            }
        }

        let thisItem = {};

        thisItem.id = id;
        thisItem.title = title;
        thisItem.description = description;
        thisItem.price = price;
        thisItem.thumbnail = thumbnail;
        thisItem.code = code;
        thisItem.stock = stock;
    
        this.products[id] = thisItem;

        fs.writeFileSync(pathFile.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto ${id} modificado correctamente`);
        return '';
    }

    deleteProduct(id) {
        if (this.products[id] === undefined) {
            console.log(`No se encontro un producto con el codigo ${id}`);
            return '';
        }

        delete this.products[id];

        fs.writeFileSync(pathFile.join(this.path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        console.log(`Producto ${id} eliminado correctamente`);
        return '';
    }
}
