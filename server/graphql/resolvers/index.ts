import express from "express";
let Event = require("../../models/event");
let User = require("../../models/user");
const argon2 = require("argon2");

// Dynamic functions

const events = async (eventsIds: Array<String>) => {
  try {
    const events = await Event.find({
      _id: { $in: eventsIds },
    });
    events.map((event: any) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator),
      };
    });
    return events;
  } catch (error: any) {
    throw error;
  }
};

const user = async (userId: String) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err: any) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event: any) => {
        return {
          ...event._doc,
          _id: event._doc._id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (error: any) {
      throw error;
    }
  },
  users: () => {
    return User.find()
      .then((users: any) => {
        return users.map((user: any) => {
          return {
            ...user._doc,
            password: null,
            _id: user.id,
            createdEvents: events.bind(this, user.createdEvents),
          };
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
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
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
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
  createUser: async (args: any) => {
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });
      if (existingUser) {
        throw new Error("This email is already registered.");
      }
      const hashedPassword = await argon2.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (error: any) {
      throw error;
    }
  },
};
