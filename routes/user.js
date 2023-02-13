var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user");

// get
router.get("/getUserByUsername/:username", UserController.getUserByUsername);
router.get("/getUserByEmail/:email", UserController.getUserByEmail);
router.get("/searchUsers/:username", UserController.searchUsers);
router.get("/loginWithUsername/:username/:hashedPassword", UserController.loginWithUsername);
router.get("/loginWithEmail/:email/:hashedPassword", UserController.loginWithEmail);

// post
router.post("/editProfile", UserController.editProfile);

router.post("/createFriendRequest", UserController.createFriendRequest);
router.post("/updateRequest", UserController.updateRequest);

module.exports = router;
