const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);
router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
