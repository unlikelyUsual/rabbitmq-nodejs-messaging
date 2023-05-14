const RabbitMQ = require("./src/services/RabbitMQ");
const Constants = require("./src/util/Constants");
const { parentPort } = require("worker_threads");
const Logger = require("./src/util/Logger");
const logger = new Logger("Worker.Js:");

// Receive message from the main thread
parentPort.on("message", async (messageFromMain) => {
  logger.log("Received message from the main thread:", messageFromMain);

  const instance = RabbitMQ.getInstance();
  if (!instance.getChannel()) await instance.connect();

  const channel = instance.getChannel();

  channel?.consume(
    Constants.QUEUE,
    (msg) => {
      const message = msg.content.toString();
      logger.log("Received message:", message);
      parentPort.postMessage(message);
    },
    { noAck: true }
  );
});
