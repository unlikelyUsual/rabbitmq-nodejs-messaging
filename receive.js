const RabbitMQ = require("./src/services/RabbitMQ");

if (!RabbitMQ.getChannel()) await RabbitMQ.connect();

const channel = RabbitMQ.getChannel();

channel.consume(
  queueName,
  (msg) => {
    const message = msg.content.toString();
    console.log("Received message:", message);
  },
  { noAck: true }
);
