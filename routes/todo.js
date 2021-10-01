const router = require("express").Router();
const todoContollers = require("../controllers/todoContolllers");

router.post("/",todoContollers.create);
router.get("/",todoContollers.findAll);
router.get("/:id",todoContollers.findOne);
router.put("/:id", todoContollers.update);
router.delete("/:id", todoContollers.delete);

module.exports = router;

