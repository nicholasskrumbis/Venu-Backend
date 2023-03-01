var express = require('express');
var router = express.Router();
const RequestController = require("../controllers/request");

// get
router.get("/getRequestsReceivedByProfile/:receiver", RequestController.getRequestsReceivedByProfile);
router.get("/getRequestsSentByProfile/:sender", RequestController.getRequestsSentByProfile);

// post
router.post("/createFriendRequest", RequestController.createFriendRequest);

// put
router.put("/updateRequestStatus", RequestController.updateRequestStatus);

module.exports = router;
