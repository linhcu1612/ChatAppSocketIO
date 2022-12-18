/** @format */

const app = require("./app");
const models = require("./models");
const bodyParser = require("body-parser");

models.initDB();

app.use(bodyParser.json());
