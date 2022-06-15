import express from "express";
let Event = require("../../models/event");
let User = require("../../models/user");
const argon2 = require("argon2");

// Dynamic functions

const events = (eventsIds: Array<String>) => {
  return Event.find({
    _id: { $in: eventsIds },
  })
    .then((events: Array<any>) => {
      return events.map((event: any) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    })
    .catch((error: any) => {
      throw error;
    });
};

const user = (userId: String) => {
  return User.findById(userId)
    .then((user: any) => {
      return {
        ...user._doc,
        _id: user.id,
        password: null,
        createdEvents: events.bind(this, user.createdEvents),
      };
    })
    .catch((err: any) => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .then((events: any) => {
        return events.map((event: any) => {
          return {
            ...event._doc,
            _id: event._doc._id.toString(),
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event.creator),
          };
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
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
  createEvent: (args: any) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "62a05b42e82159c44f4f9e4f",
    });
    let createdEvent: any;
    return event
      .save()
      .then((result: any) => {
        createdEvent = {
          ...result._doc,
          _id: result.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, result.creator),
        };
        return User.findById("62a05b42e82159c44f4f9e4f");
      })
      .then((user: any) => {
        if (!user) {
          throw new Error("User not found");
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(() => {
        return createdEvent;
      })
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
  },
  createUser: (args: any) => {
    return User.findOne({
      email: args.userInput.email,
    })
      .then((user: any) => {
        if (user) {
          throw new Error("This email is already registered.");
        }
        return argon2.hash(args.userInput.password, 12);
      })
      .then((hashedPassword: any) => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result: any) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((error: any) => {
        throw error;
      });
  },
};
