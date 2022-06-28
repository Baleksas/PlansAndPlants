import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql"; // ES6
import mongoose from "mongoose";
import * as dotenv from "dotenv";
let graphqlSchema = require("./graphql/schema/index");
let graphqlResolver = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

dotenv.config();
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200);
  }
  next();
});

app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@plansandplants.hm1jjgp.mongodb.net/${process.env.MONGODB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8001);
  })
  .catch((err) => {
    console.log(err);
  });
