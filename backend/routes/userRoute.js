var express = require("express");
var router = express.Router();

var authentication = require("../middlewares/authentication");

var {
  validateUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/signup", createUser);
router.post("/signin", validateUser);

// router
//   .route("/:userID")
//   .get(authentication, getUser)
//   .put(updateUser)
//   .delete(deleteUser);

module.exports = router;
