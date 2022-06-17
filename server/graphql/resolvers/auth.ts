import express from "express";
let User = require("../../models/user");
let Event = require("../../models/event");
const { events } = require("./merge");
const argon2 = require("argon2");

// Dynamic functions

module.exports = {
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
