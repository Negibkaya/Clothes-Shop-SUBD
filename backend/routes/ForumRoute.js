const { Router } = require("express");

const {
  getForum,
  saveForum,
  updateForum,
  deleteForum,
} = require("../controllers/ForumControllers");

const router = Router();

router.get("/getForum", getForum);
router.post("/saveForum", saveForum);
router.put("/updateForum/:id", updateForum);
router.delete("/deleteForum/:id", deleteForum);

module.exports = router;
