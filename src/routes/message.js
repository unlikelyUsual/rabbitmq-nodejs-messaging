const express = require("express");
const Logger = require("../util/Logger");
const route = express.Router;
const logger = new Logger("Messaging");
const { connectRabbitMq } = require("../util/Middlewares");
const RabbitMQ = require("../services/RabbitMQ");
const HTTP = require("../util/Http");
const Constants = require("../util/Constants");

const handleError = (res, err) => {
  logger.error(err);
  return res.status(HTTP.ISE).json({ message: err.message });
};

route.post("/message", connectRabbitMq, async (req, res) => {
  logger.log("Message :", req.body);
  try {
    const channel = RabbitMQ.getInstance().getChannel();
    await channel.assertQueue(Constants.QUEUE, { durable: false });
    const message = JSON.stringify({ message: req.body });
    await channel.sendToQueue(Constants.QUEUE, Buffer.from(message));
    res.json({ message: "Done!" });
  } catch (err) {
    return handleError(res, err);
  }
});
