const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectID = mongoose.Schema.Types.ObjectId;

const venuSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
    busy: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
  },
  { collection: 'notifications' }
);

const Venu = mongoose.model("Venu", venuSchema);

module.exports = Venu;