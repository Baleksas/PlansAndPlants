import express from "express";
let Event = require("../../models/event");
let User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const transformEvent = (event: any) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event._doc.creator),
  };
};

const transformBooking = (booking: any) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt),
  };
};

const events = async (eventsIds: Array<String>) => {
  try {
    const events = await Event.find({
      _id: { $in: eventsIds },
    });
    return events.map((event: any) => {
      return transformEvent(event);
    });
  } catch (error: any) {
    throw error;
  }
};

const singleEvent = async (eventId: String) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
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

// exports.user = user;
// exports.singleEvent = singleEvent;
exports.events = events;

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
