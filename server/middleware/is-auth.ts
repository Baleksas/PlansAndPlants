import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

module.exports = (res: Response, req: any, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  console.log("authHeader", authHeader);
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  console.log("token:", token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  console.log("decodedToken:", decodedToken);
  req.userId = decodedToken.userId;
  next();
};
