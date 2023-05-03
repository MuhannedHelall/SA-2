const express = require("express");
const kafka = require("kafka-node");
const app = express();
app.use(express.json());

const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER,
});
const marketer = new kafka.Producer(client);

marketer.on("ready", () => {
  marketer.send(
    [
      {
        topic: process.env.KAFKA_TOPIC,
        messages: JSON.stringify({ topic: "Topic is opened!" }),
      },
    ],
    (err) => err && console.log(err)
  );

  app.post("/", (req, res) => {
    marketer.send(
      [
        {
          topic: process.env.KAFKA_TOPIC,
          messages: JSON.stringify(req.body),
        },
      ],
      (err, data) => {
        if (err) console.log(err);
        res.send(req.body);
      }
    );
  });
  app.delete("/", (req, res) => {
    marketer.send(
      [
        {
          topic: process.env.KAFKA_TOPIC,
          messages: JSON.stringify(req.body),
        },
      ],
      (err, data) => {
        if (err) console.log(err);
        res.send(req.body);
      }
    );
  });
});

app.listen(process.env.PORT, () =>
  console.log("App is listening on port " + process.env.PORT)
);
