var express = require('express');
var router = express.Router();
const fidelController = require("../controllers/fidel");

// get
router.get("/isActive/:cardid", fidelController.isActive);

// post
router.post("/uploadCard", fidelController.uploadCard);

// put
router.put("/updateCardStatus/:cardid/:status", fidelController.updateCardStatus);

module.exports = router;