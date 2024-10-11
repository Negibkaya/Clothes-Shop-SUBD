const { Router } = require("express");

const {
  getUsers,
  saveUsers,
  delUsers,
  updateUsers,
  getUsers_role

} = require("../controllers/UsersControllers");

const router = Router();

router.get("/getUsers", getUsers);
router.post("/saveUsers", saveUsers);
router.delete("/delUsers/:id", delUsers);
router.put("/updateUsers/:id", updateUsers);

router.post("/getUsers_role", getUsers_role);
//delete
//put
//get ы 

module.exports = router;
