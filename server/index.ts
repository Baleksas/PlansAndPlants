import express from "express";
import bodyparser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

let Event = require("./models/event");
let User = require("./models/user");

app.use(bodyparser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(
      `
      type Event{
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type User{
        _id: ID!
        email: String!
        password: String
      }

      input UserInput{
        email: String!
        password: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      
      type RootQuery{
        events:[Event!]!                              
        users:[User!]!
      }
      type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
      }

      schema{
        query: RootQuery
        mutation: RootMutation
      }
      `
    ),
    rootValue: {
      // Queries
      events: () => {
        return Event.find()
          .then((events: any) => {
            return events.map((event: any) => {
              return { ...event._doc, _id: event.id };
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
              return { ...user._doc, _id: user.id };
            });
          })
          .catch((error: any) => {
            console.log(error);
          });
      },
      // Mutations
      createEvent(args: any) {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });

        return event
          .save()
          .then((result: any) => {
            console.log(result);
            return {
              ...result._doc,
              _id: result.id,
            };
          })
          .catch((error: any) => {
            console.log(error);
            throw error;
          });
      },
      createUser(args: any) {
        const user = new User({
          email: args.userInput.email,
          password: args.userInput.password,
        });
        return user
          .save()
          .then((result: any) => {
            console.log(result);
            return {
              ...result._doc,
              _id: result.id,
            };
          })
          .catch((error: any) => {
            console.log(error);
            throw error;
          });
      },
      graphiql: true,
    },
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@plansandplants.hm1jjgp.mongodb.net/${process.env.MONGODB}?retryWrites=true&w=majority
  `
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
