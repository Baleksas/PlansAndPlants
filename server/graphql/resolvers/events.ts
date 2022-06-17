var { dateToString } = require("../../helpers/date");
let Event = require("../../models/event");
let User = require("../../models/user");
let { user, events, singleEvent } = require("./merge");
const { transformEvent } = require("./merge");
import express from "express";

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event: any) => {
        return transformEvent(event);
      });
    } catch (error: any) {
      throw error;
    }
  },

  // Mutations
  createEvent: async (args: any) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "62a05b42e82159c44f4f9e4f",
    });
    let createdEvent: any;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById("62a05b42e82159c44f4f9e4f");
      if (!creator) {
        throw new Error("User not found");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (error: any) {
      throw error;
    }
  },
};
