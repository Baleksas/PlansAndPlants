import express from "express";
let User = require("../../models/user");
let Event = require("../../models/event");
const { events } = require("./merge");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Dynamic functions

module.exports = {
  login: async ({ email, password }: any) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) throw new Error("User does not exist");
      const isEqual = await argon2.verify(user.password, password);
      if (!isEqual) throw new Error("Password does not match");
      const token = await jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        "secret",
        { expiresIn: "1h" }
      );
      console.log(token);
      return {
        userId: user.id,
        token: token,
        tokenExpires: 1,
      };
    } catch (error) {
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
