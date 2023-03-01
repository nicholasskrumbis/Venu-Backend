const User = require("../models/user");
const Story = require("../models/story");
const mongoose = require("mongoose");

/* GET */

/*
GIVEN: user id
RETURN: list of story objects from user friends
*/
exports.getFriendsStory = async (req, res) => {
    const user = await User.findOne({ _id: req.params._id }).lean();
    var stories = []

    for (let i = 0; i < user.friends.length; i++) {
      Story.find({ user: mongoose.Types.ObjectId(user.friends[i]) },

      );
    }
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
      user,
      image,
    } = req.body;
      
    try {
      const response = await Story.create({
          user: mongoose.Types.ObjectId(user),
          image
      })
  
      console.log('Story succesfully created: ', response)
  
    } catch (error) {
      if (error.code === 11000) // duplicate key
        return res.json({ status: 'error', error: 'Duplicate post' })
      
      throw error
    }
    
    res.json({ status: 'ok' })
}