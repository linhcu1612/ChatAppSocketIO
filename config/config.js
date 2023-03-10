/** @format */

const dotenv = require("dotenv");

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

const corsClientDomain = process.env.CORS_CLIENT_DOMAIN;
const mongoDBUrl = process.env.MONGODB_URL;
const sessionSecret = process.env.SESSION_DB_SECRET || "notVerySecretSecret";

const port = process.env.PORT || "3001";

module.exports = { corsClientDomain, sessionSecret, port, mongoDBUrl };
