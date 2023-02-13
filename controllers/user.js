const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

/* GET */

/*
GIVEN: username (partial or full)
RETURN: list of user objects with similar usernames
*/
exports.searchUsers = (req, res) => {
    const user = req.params["username"];
    console.log("finding user");
    User.find({name:{'$regex' : user, '$options' : 'i'}}, function (err, data) {
      if (err) {
        res.status(404).send({ data: err });
      } else {
        res.status(200).send({ data: data });
      }
    } )
};

/*
GIVEN: username 
RETURN: user object with username
*/
exports.getUserByUsername = (req, res) => {
    const username = req.params["username"];
    User.findOne({ username: username }, function (err, data) {
      if (err) {
        res.status(404).send({ data: err });
      } else {
        res.status(200).send({ data: data });
      }
    });
};

/*
GIVEN: email 
RETURN: user object with email
*/
exports.getUserByEmail = (req, res) => {
  const email = req.params["email"];
  User.findOne( { email: email }, function (err, data) {
    if (err) {
      res.status(404).send({ data: err });
    } else {
      res.status(200).send({ data: data });
    }
  });
};

/* POST */

/*
GIVEN: email, password 
RETURN: 'ok' if succesful login
*/
exports.loginWithEmail = async (req, res) => {
  const email = req.params["email"];
  const password = req.params["hashedPassword"];
  const user = await User.findOne({ email: email }).lean();

  if (!user) // couldn't find user with email
    return res.json({ status: 'error', error: 'Could not find user with email'})

  if (await bcrypt.compare(password, user.password)) { // successful login
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET
    )

    return res.json({ status: 'ok', data: token })
  }

  return res.json({ status: 'error', error: 'Invalid credentials.'})
}

/*
GIVEN: username, password 
RETURN: 'ok' if succesful login
*/
exports.loginWithUsername = async (req, res) => {
  const username = req.params["username"];
  const password = req.params["hashedPassword"];
  const user = await User.findOne({ username: username }).lean();

  if (!user) // couldn't find user with username
    return res.json({ status: 'error', error: 'Could not find user with username'})

  if (await bcrypt.compare(password, user.password)) { // successful login
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET
    )

    return res.json({ status: 'ok', data: token })
  }

  return res.json({ status: 'error', error: 'Invalid credentials.'})
}

/*
GIVEN: json object with data to be changed
RETURN: 'ok' if successfully updated profile information
*/
exports.editProfile = async (req, res) => {
  const userid = req.body.userid;
  delete req.body.userid;

  User.findByIdAndUpdate(userid, req.body, function (err, docs) {
    if (err) {
      res.status(404).send({ data: err });
    } else {
      res.status(200).send({ data: docs });
    }
  });
}

exports.createFriendRequest = async (req, res) => {
  const {
    requester,
    receiver
  } = req.body;

  const requestingUser = await User.findOne({ username: requester })
    .exec()
    .catch((err) => res.status(400).send({ data: err }));

  const receivingUser = await User.findOne({ username: receiver })
    .exec()
    .catch((err) => res.status(400).send({ data: err }));

  Promise.all([followeePromise, followerPromise])
    .then(async (profiles) => {
      const followeeProfile = profiles[0];
      const followerProfile = profiles[1];

        const request = new Request({
          requester: followerProfile._id,
          requestee: followeeProfile._id,
        });
        request.save().then(async (requestRes) => {
          followeeProfile.incomingRequests.push(requestRes._id);
          followerProfile.outgoingRequests.push(requestRes._id);
          const followeeSave = await followeeProfile
            .save()
            .catch((err) => res.status(404).send({ data: err }));
          const followerSave = await followerProfile
            .save()
            .catch((err) => res.status(404).send({ data: err }));
          Promise.all([followeeSave, followerSave])
            .then(() => {
              res.status(200).send({ data: request });
            })
            .catch((err) => res.status(404).send({ data: err }));
        });
    })
    .catch((err) => {
      res.status(404).send({ data: err });
    });
}

exports.updateRequest = async (req, res) => {
  
}