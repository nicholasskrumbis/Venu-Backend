var express = require('express');
var router = express.Router();
const StoryController = require("../controllers/story");


// get
router.get("/getFriendsStory/:userid", StoryController.getFriendsStory);
router.get("/getAllStories", StoryController.getAllStories);


// post
router.post("/createStory", StoryController.createStory);


module.exports = router;
