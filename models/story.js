const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectID = mongoose.Schema.Types.ObjectId;

const storySchema = new Schema(
  {
    user: {
        type: ObjectID,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
  },
  { collection: 'stories' }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;