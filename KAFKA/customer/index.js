const kafka = require("kafka-node");
const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const Offer = require("./models/Offer");

const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

//CRUD routes
app.use("/customers", require("./routes/Customers"));
app.use("/offers", require("./routes/Offers"));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});
sequelize.sync({ force: true });

const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER});
const customer = new kafka.Consumer(client,[{ topic: process.env.KAFKA_TOPIC }],{ autoCommit: false });

customer.on("message", async (message) => {
  const offer = JSON.parse(message.value);
  if(offer.topic){
    console.log(offer.topic);
  }
  else if(!offer.isDeleted){
    await Offer.create(offer)
      .then((result) => console.log(offer, "\nOffer Created !"))
      .catch((err) => console.log(err));
  }else{
    Offer.findByPk(offer.id)
      .then(async (deletedOffer) => {
        if(!deletedOffer) console.log("Offer not found!")
        else {
          await deletedOffer.destroy({ where: { id: offer.id } });
          console.log("Offer Deleted!");
        }
      })
      .catch((err) => console.log(err));
  }
});

customer.on("error", (err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log("APP is listening on PORT " + process.env.PORT)
);
