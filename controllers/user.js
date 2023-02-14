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
  const username = req.body.username;
  delete req.body.username;

  var newInfo = req.body;

  if (req.body.newUsername) {
      newInfo.username = req.body.newUsername;
      delete newInfo.newUsername;
  }

  const user = await User.findOne({ username: username }).lean();

  User.findByIdAndUpdate(user._id, req.body, function (err, docs) {
    if (err) {
      res.status(404).send({ data: err });
    } else {
      res.status(200).send({ data: docs });
    }
  });
}