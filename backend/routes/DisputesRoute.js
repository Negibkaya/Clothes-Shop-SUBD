const { Router } = require("express");

const {
  getDisputes,
  saveDisputes,
  delDisputes,
  updateDisputes,
  getDispuse_date

} = require("../controllers/DisputesControllers");

const router = Router();

router.get("/getDisputes", getDisputes);
router.post("/saveDisputes", saveDisputes);
router.delete("/delDisputes/:id", delDisputes);
router.put("/updateDisputes/:id", updateDisputes);

router.post("/getDisputes_date", getDispuse_date);

//delete
//put
//get ы 

module.exports = router;
