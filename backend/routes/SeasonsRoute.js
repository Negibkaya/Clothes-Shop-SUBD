const { Router } = require("express");

const {
  getSeasons,
  saveSeasons,
  delSeasons,
  updateSeasons

} = require("../controllers/SeasonsControllers");

const router = Router();

router.get("/getSeasons", getSeasons);
router.post("/saveSeasons", saveSeasons);
router.delete("/delSeasons/:id", delSeasons);
router.put("/updateSeasons/:id", updateSeasons);

//delete
//put
//get ы 

module.exports = router;
