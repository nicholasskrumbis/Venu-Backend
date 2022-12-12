const User = require("../models/user");

exports.getUser = (req, res) => {
    const uid = req.params["uid"];
    User.findById(uid, function (err, data) {
      if (err) {
        res.status(404).send({ data: err });
      } else {
        res.status(200).send({ data: data });
      }
    });
};