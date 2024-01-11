const products = []

class ProductManager {
    constructor() {
        this.autoId = Object.keys(products).length + 1;}

    addProduct(title, description, price, thumbnail, code, stock) {
        if (stock <= 0 || typeof stock !== "number") {
            console.log("ingrese una cantidad valida");
        }
        let item = {}
            item.id = this.autoId
            item.title = title;
            item.description = description;
            item.price = price;
            item.thumbnail = thumbnail;
            item.code = code;
            item.stock = stock;
        products[this.autoId] = item;
    }

    getProducts() {
        if (this.autoId > 1) {
            return products
        } else {
            console.log("no existen productos");
            return ''
        }
    }

    getProductById(id = null) {
        if (products[id] === undefined) {
            console.log(`No existe un producto con el codigo ${id}`);
            return '';
        } else {
            return products[id];
        }
    }

}


//TESTING

console.log("probando el testeo")
const productoprueba = new ProductManager();
console.log(productoprueba.getProducts)
productoprueba.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123", 25)
console.log(productoprueba.getProducts)
productoprueba.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123", 25)