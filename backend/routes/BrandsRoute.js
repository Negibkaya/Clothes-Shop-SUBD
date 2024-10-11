const { Router } = require("express");

const {
  getBrands,
  saveBrands,
  delBrands,
  updateBrands

} = require("../controllers/BrandsContollers");

const router = Router();

router.get("/getBrands", getBrands);
router.post("/saveBrands", saveBrands);
router.delete("/delBrands/:id", delBrands);
router.put("/updateBrands/:id", updateBrands);

//delete
//put
//get ы 

module.exports = router;
