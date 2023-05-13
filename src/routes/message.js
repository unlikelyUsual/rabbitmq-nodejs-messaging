const express = require("express");
const Logger = require("../util/Logger");
const { connectRabbitMq } = require("../util/middlewares");
const RabbitMQ = require("../services/RabbitMQ");
const HTTP = require("../util/Http");
const Constants = require("../util/Constants");

const logger = new Logger("Messaging");
const route = express.Router();

const handleError = (res, err) => {
  logger.error(err);
  return res.status(HTTP.ISE).json({ message: err.message });
};

route.post("/message", connectRabbitMq, async (req, res) => {
  logger.log("Message :", req.body);
  try {
    const instance = RabbitMQ.getInstance();
    const channel = instance.getChannel();
    logger.log(`Channel`, channel);
    await channel.assertQueue(Constants.QUEUE, { durable: false });
    const message = JSON.stringify({ message: req.body });
    await channel.sendToQueue(Constants.QUEUE, Buffer.from(message));
    return res.json({ message: "Done!" });
  } catch (err) {
    return handleError(res, err);
  }
});

module.exports = route;
