const sequelize = require("sequelize");
const db = require("../util/database");

const Customer = db.define("customers", {
  name: sequelize.STRING,
  email: sequelize.STRING,
  password: sequelize.STRING,
});

module.exports = Customer;
