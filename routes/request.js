var express = require('express');
var router = express.Router();
const RequestController = require("../controllers/request");

router.get("/getRequestsReceivedByProfile/:receiver", RequestController.getRequestsReceivedByProfile);
router.get("/getRequestsSentByProfile/:sender", RequestController.getRequestsSentByProfile);

router.post("/createFriendRequest", RequestController.createFriendRequest);
router.post("/updateRequestStatus", RequestController.updateRequestStatus);

module.exports = router;
