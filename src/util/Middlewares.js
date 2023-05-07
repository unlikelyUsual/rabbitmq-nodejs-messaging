const RabbitMQ = require("../services/RabbitMQ");

const connectRabbitMq = async (req, res, next) => {
  const channel = RabbitMQ.getChannel();
  if (!channel) await RabbitMQ.connect();
  next();
};

module.exports = {
  connectRabbitMq,
};
