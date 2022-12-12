const User = require("../models/user");
const mongoose = require("mongoose");

mongoose.Promise = Promise;

exports.signup = (req, res) => {
  const {
    id,
    personalName,
    personalPicture,
    professionalName,
    professionalPicture,
  } = req.body;

  //Create personal profile
  const userProfilePrivate = new Profile();
  userProfilePrivate.user = id;
  userProfilePrivate.type = "PERSONAL";
  userProfilePrivate.displayedName = personalName;
  userProfilePrivate.profileImage = personalPicture;

  //Create user
  const user = new User();
  user._id = id;
  user.name = personalName;

  userProfilePrivate
    .save()
    .then((personalProfile) => {
      const personalId = personalProfile._id;
      user.personalProfile = personalId;
      userProfilePublic
        .save()
        .then((publicProfile) => {
          const publicId = publicProfile._id;
          user.professionalProfile = publicId;
          user
            .save()
            .then((result) => {
              res.status(200).send({ data: result });
            })
            .catch((err) => {
              res.status(404).send({ data: err });
            });
        })
        .catch((err) => {
          res.status(404).send({ data: err });
        });
    })
    .catch((err) => {
      res.status(404).send({ data: err });
    });
};