var express = require('express');
var router = express.Router();
const fidelController = require("../controllers/fidel");

// get
router.get("/isActive/:cardId", fidelController.isActive);

// post
router.post("/uploadCard", fidelController.uploadCard);
router.post("/onTransation", fidelController.onTransaction);

// put
router.put("/updateCardStatus/:cardId/:status", fidelController.updateCardStatus);

module.exports = router;