var { dateToString } = require("../../helpers/date");
let Booking = require("../../models/booking");
import express from "express";
let Event = require("../../models/event");
const { transformEvent, transformBooking } = require("./merge");

module.exports = {
  bookings: async (args: any, req: any) => {
    if (!req.isAuth) throw new Error("User is not authenticated");
    try {
      const bookings = await Booking.find();
      return bookings.map((booking: any) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  //   ---------------------
  bookEvent: async (args: any, req: any) => {
    if (!req.isAuth) throw new Error("User is not authenticated");

    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "62a05b42e82159c44f4f9e4f",
      event: fetchedEvent,
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args: any) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      if (booking) {
        await Booking.deleteOne({ _id: args.bookingId });
      } else {
        console.log("Booking not found");
      }
      return event;
    } catch (error) {
      throw error;
    }
  },
};
