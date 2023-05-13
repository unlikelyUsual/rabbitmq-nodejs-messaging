const RabbitMQ = require("./src/services/RabbitMQ");
const Constants = require("./src/util/Constants");

let channel = null;

(async () => {
  const instance = RabbitMQ.getInstance();
  if (!instance.getChannel()) await instance.connect();

  channel = instance.getChannel();

  channel?.consume(
    Constants.QUEUE,
    (msg) => {
      const message = msg.content.toString();
      console.log("Received message:", message);
    },
    { noAck: true }
  );
})();
