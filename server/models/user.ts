import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      //   Same as event model name. Now mongoose knows that there's connection
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
