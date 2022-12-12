var express = require('express');
var router = express.Router();
const UserController = require("../controllers/user");

router.get("/getUser/:uid", UserController.getUser);

module.exports = router;
