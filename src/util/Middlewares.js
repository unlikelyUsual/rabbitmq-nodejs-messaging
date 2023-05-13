const RabbitMQ = require("../services/RabbitMQ");

const connectRabbitMq = async (req, res, next) => {
  console.log(`Connect mq server, trying...`);
  const instance = RabbitMQ.getInstance();
  console.log(`Instance`, instance);
  const channel = instance.getChannel();
  if (!channel) await instance.connect();
  next();
};

module.exports = {
  connectRabbitMq,
};
