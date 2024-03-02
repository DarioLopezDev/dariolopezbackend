import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

//Definicion de constantes
const productsFile = '../productos.json';
const fileP = __dirname
////////////////////////////////////////////////////////////////////////////
//Se establece la clase constructora

class ProductManager {
    constructor(filePath = fileP, file = productsFile) {
        this.filePath = filePath;
        this.file = file;
        this.original_products = {};
        this.current_id = 0;
//determina si existe el archivo
        if (!fs.existsSync(path.join(this.filePath, this.file))) {
            try {
// si no existe lo crea y guarda un objeto vacio. 
                fs.writeFileSync(path.join(this.filePath, this.file), JSON.stringify(this.original_products));
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }
//se crea una constante que almacena la cadena de texto JSON del archivo de producto
        const readProducts = fs.readFileSync(path.join(this.filePath, this.file), 'utf-8');
//parseo a un objeto js y almaceno esos productos en la propiedad "this.products"
        this.products = JSON.parse(readProducts);

//indica el id actual, del ultimo producto.
        this.current_id = Object.keys(this.products)[Object.keys(this.products).length - 1];
    }

////////////////////////////////////////////////////////////////////////////
//el metodo retorna los productos luego de verificar si el current_id es mayor o igual a 1, ya que eso significa que hay productos, de lo contrario si no hay productos retorna "undefined"

getProducts(limit) {
    
    if (this.current_id >= 1) {
        try{  
            if (!limit) {
                return   this.products;
              } else {
                return this.products.slice(0, limit);
              }
            } catch(err) {
            console.error("ERROR AL CONSULTAR LISTADO", err.mesaage)}
    } else {
        return undefined;
    }
}

////////////////////////////////////////////////////////////////////////////
//el metodo se utilizara para crear los productos utilizando los siguientes parametros

  async addProduct({ title, description, code, price, stock, thumbnail, status, category }) {
    //se hace un comprobacion si el stock es igual a 0 o menor a 0, o si el stock no es numerico, determina que el stock no es valido
    if (stock <= 0 || typeof stock !== 'number') {
        return {status: "Failed", msg: "Quantity must be a positive number , linea 60 archivo ProductManager.js"};
    }else {
    const allProducts = await this.getProducts();
    if(allProducts.some(prod => prod.code === code)) {
      console.log("Product code already exists");
      return { status: "Failed", msg: "Product code already exists" };
    }
    let currentId = allProducts.length ? allProducts[allProducts.length - 1].id + 1 : 1
    const newProduct = { title, description, code, price, stock, thumbnail, status, category, id: currentId };
    
    allProducts.push(newProduct);
    await this.writeFile(allProducts);

    return { status: "Success", msg: "Product added successfully", product: newProduct };
  }
  }

 ////////////////////////////////////////////////////////////////////////////

  async writeFile(obj = []) {
    const json = JSON.stringify(obj, null, 2);
    await fs.promises.writeFile(path.join(this.filePath, this.file), json, 'utf-8')
  }
}
/* 
export function getProductos() {
    const all_products = new ProductManager(__dirname,"../DB/productos.json");
    console.log("linea 87 archivo product manager", all_products)
    const prod_list = all_products.getProducts();
    console.log("linea 89 archivo product manager", prod_list)
    const max_products = Object.keys(all_products).length - 1;

    if (prod_list === undefined) {
        return JSON.stringify('There are no products');
    } else {
        return prod_list;
    }
}
 */

export default ProductManager