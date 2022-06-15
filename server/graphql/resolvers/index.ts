import express from "express";
let Event = require("../../models/event");
let User = require("../../models/user");
let Booking = require("../../models/booking");

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

const singleEvent = async (eventId: String) => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      _id: event.id,
      date: new Date(event._doc.date).toISOString(),
      creator: user.bind(this, event._doc.creator),
    };
  } catch (error) {
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
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking: any) => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {
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
  bookEvent: async (args: any) => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "62a05b42e82159c44f4f9e4f",
      event: fetchedEvent,
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      user: user.bind(this, result._doc.user),
      event: singleEvent.bind(this, result._doc.event),
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString(),
    };
  },
  cancelBooking: async (args: any) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator),
      };
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
