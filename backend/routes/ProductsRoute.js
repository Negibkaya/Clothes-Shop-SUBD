const { Router } = require("express");

const {
  getProducts,
  saveProducts,
  delProducts,
  updateProducts,
  getProducts_price,
  getProducts_type

} = require("../controllers/ProductsControllers");

const router = Router();

router.get("/getProducts", getProducts);
router.post("/saveProducts", saveProducts);
router.delete("/delProducts/:id", delProducts);
router.put("/updateProducts/:id", updateProducts);

router.post("/getProducts_price", getProducts_price);
router.post("/getProducts_type", getProducts_type);
//delete
//put
//get ы 

module.exports = router;
