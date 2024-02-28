import path from "path";
import { Router } from "express";
/* import { Express } from "express"; */
import ProductManager from "../manager/ProductManager.js";
import __dirname from "../utils.js";
const router = Router();

const manager = new ProductManager(path.join(__dirname,"../DB/productos.json"))
/* console.log (manager.getProducts()) */
router.get("/", (req, res) => {
  res.render("home", { products: manager.getProducts() });
})

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", { products: manager.getProducts() });
})

export default router;