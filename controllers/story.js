const User = require("../models/user");
const Story = require("../models/story");
const mongoose = require("mongoose");

/* GET */

/*
GIVEN: user id
RETURN: list of story objects from a users friends
*/
exports.getFriendsStory = async (req, res) => {

    console.log(req.params.userid)

    const user = await User.findOne({ _id: req.params.userid }).lean();
    var stories = [];

    console.log(user)

    for (let i = 0; i < user.friends.length; i++) {

      console.log("getting fried")
      console.log(user.friends[i])
      const aggCursor = Story.aggregate([{
          $match: {
            userId: user.friends[i]
            }
        }])

      for await (const doc of aggCursor) {
        stories.push(doc);
      }
    }

    res.status(200).send( { data: stories })
}

/*
GIVEN: 
RETURN: list of all story objects
*/
exports.getAllStories = async (req, res) => {
    Story.find(function (err, data) {
      if (err) {
        res.status(404).send({ data: err });
      } else {
        res.status(200).send({ data: data });
      }
    } )
}

/* POST */

/*
GIVEN: userid, image url
RETURN: 'ok' if successfully created new story
*/
exports.createStory = async (req, res) => {
  const {
      userId,
      image,
    } = req.body;
      
    try {
      const response = await Story.create({
          userId: mongoose.Types.ObjectId(userId),
          venuId: "somevenuid",
          image: "imageurl"
      })
  
      console.log('Story succesfully created: ', response)
  
    } catch (error) {
      if (error.code === 11000) // duplicate key
        return res.json({ status: 'error', error: 'Duplicate post' })
      
      throw error
    }
    
    res.json({ status: 'ok' })
}