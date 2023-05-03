const sequelize = require("sequelize");
const db = require("../util/database");

const Offer = db.define("offers", {
  name: sequelize.STRING,
  price: sequelize.STRING,
  endDate: sequelize.STRING,
  isDeleted: sequelize.BOOLEAN,
});

module.exports = Offer;
