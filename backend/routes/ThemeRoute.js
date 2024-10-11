const { Router } = require("express");

const {
  getAllTheme,
  createTheme,
  updateTheme,
  deleteTheme,
} = require("../controllers/ThemeControllers");

const router = Router();

router.get("/getTheme", getAllTheme);
router.post("/saveTheme", createTheme);
router.put("/updateTheme/:id", updateTheme);
router.delete("/deleteTheme/:id", deleteTheme);

module.exports = router;
