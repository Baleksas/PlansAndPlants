const authResolver = require("../resolvers/auth");
const bookingResolver = require("../resolvers/booking");
const eventsResolver = require("../resolvers/events");

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventsResolver,
};

module.exports = rootResolver;
