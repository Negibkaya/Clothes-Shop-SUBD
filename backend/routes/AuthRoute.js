const { Router } = require("express");

const {
  register,
  login,
  deleteUser,
  updateUser,
} = require("../controllers/AuthControllers");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
