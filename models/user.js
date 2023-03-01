const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectID = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    birthday: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    tags: [
      {
        type: String, 
        required: false,
      }
    ],
    cards: [
      {
        type: String,
        required: false,
      }
    ],
    friends: [
      {
        type: ObjectID, 
        ref: "User", 
        required: false,
      }
    ],
    blocked: [
      {
        type: ObjectID, 
        ref: "User", 
        required: false,
      }
    ],
    outgoingRequests: [
      {
        type: ObjectID,
        ref: "User",
        required: false,
      }
    ],
    incomingRequests: [
      {
        type: ObjectID,
        ref: "User",
        required: false,
      }
    ]
  },
  { collection: 'users' },
  { typeKey: '$type' }
);

const User = mongoose.model("User", userSchema);

module.exports = User;