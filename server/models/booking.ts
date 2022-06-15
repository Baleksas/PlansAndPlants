import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  //   Adds updated at and created at properties
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
