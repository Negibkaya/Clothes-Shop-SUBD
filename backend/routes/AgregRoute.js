const { Router } = require("express");

const {
  getCountMessageEachMounth,
  getUsersBetweenDates,
} = require("../controllers/AgregControllers");

const router = Router();

router.get("/message", getCountMessageEachMounth);
router.post("/between", getUsersBetweenDates);

module.exports = router;
