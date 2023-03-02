const Request = require("../models/request");
const User = require("../models/user");
const mongoose = require("mongoose");

/* GET */

/*
GIVEN: username
RETURN: list of incoming requests (request object)
*/
exports.getRequestsReceivedByProfile = (req, res) => {
  const { receiver } = req.params;
  Request.find(
    { receiver: receiver },
    function (err, docs) {
      if (err) {
        res.status(404).send({ data: err });
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
};

/*
GIVEN: username
RETURN: list of sent requests (request object)
*/
exports.getRequestsSentByProfile = (req, res) => {
  const { sender } = req.params;
  Request.find(
    { requester: sender },
    function (err, docs) {
      if (err) {
        res.status(404).send({ data: err });
      } else {
        res.status(200).send({ data: docs });
      }
    }
  );
}

/* POST */

/*
GIVEN: requester (username), receiver (username)
RETURN: 'ok' if successful created request
*/
exports.createFriendRequest = async (req, res) => {
    const { requester, receiver } = req.body;

    const requestingUser = await User.findOne({ username: requester }).lean();
    const receivingUser = await User.findOne({ username: receiver }).lean();
      
    try {
      const response = await Request.create({
        requester: requestingUser._id,
        receiver: receivingUser._id
      })
  
      console.log('Request succesfully created: ', response)
  
    } catch (error) {
      if (error.code === 11000) // duplicate key
        return res.json({ status: 'error', error: 'Duplicate request' })
      
      throw error
    }
    
    res.json({ status: 'ok' })
};

/*
GIVEN: requester (username), receiver (username), accept (true/false)
RETURN: 'ok' if successfully processed request (accept or reject)
*/
exports.updateRequestStatus = async (req, res) => {
  const { requester, receiver, accept } = req.body;

  const requestingUser = await User.findOne( { username: requester }).lean();
  const receivingUser = await User.findOne( { username: receiver }).lean();

  Request.deleteOne(
    { requester: requestingUser._id, receiver: receivingUser._id },
    function (err, docs) {
      if (err)
        res.status(404).send({ data: err });
    }
  );

  if (accept) { // add the each user to friends list
    User.update(
      { username: receiver },
      { $push: { friends: mongoose.Types.ObjectId(requestingUser._id) } },
      function(err, docs) {
        if (err)
          res.status(404).send({ data: err });
      }
    );

    User.update(
      { username: requester },
      { $push: { friends: mongoose.Types.ObjectId(receivingUser._id) } },
      function(err, docs) {
        if (err)
          res.status(404).send({ data: err });
      }
    );
  } 

  res.json({ status: 'ok' });
};