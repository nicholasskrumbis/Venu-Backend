var express = require("express");
var router = express.Router();
const RegisterController = require("../controllers/register");

router.post("/register", RegisterController.register);

module.exports = router;