const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectID = mongoose.Schema.Types.ObjectId;

const requestSchema = new Schema(
  {
    requester: {
        type: ObjectID,
        ref: "User",
        required: true,
    },
    receiver: {
        type: ObjectID,
        ref: "User",
        required: true,
    }
  },
  { collection: 'requests' }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;