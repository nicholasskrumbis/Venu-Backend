var express = require("express");
var router = express.Router();
const SignUpController = require("../controllers/signup");

router.post("/", SignUpController.signup);

module.exports = router;