const router = require("express").Router();
const userContollers = require("../controllers/userContollers");

router.post("/",userContollers.create);
router.get("/",userContollers.findAll);
router.get("/:id",userContollers.findOne);
router.put("/:id", userContollers.update);
router.delete("/:id", userContollers.delete);
router.get("/one_many/:id",userContollers.oneToMany);
router.get("/belongsTo", userContollers.belongsTo);

module.exports = router;

