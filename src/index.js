const express = require("express");
const PORT = process.env.PORT || 5999;
const app = express();
const messageRoute = require("./routes/message");
const Logger = require("./util/Logger");
const RabbitMQ = require("./services/RabbitMQ");
const { Worker } = require("worker_threads");

const logger = new Logger("Index.Js: ");

app.use(express.json());

app.use("/", messageRoute);

const closeServer = async () => {
  // Perform tasks to close database connections, cleanup, etc.
  logger.log("Closing server...");
  const instance = RabbitMQ.getInstance();
  await instance.close();

  server.close(() => {
    logger.log("Server closed");
    process.exit(0);
  });
};

// Register the event handler for the exit event
process.on("exit", closeServer);

// Register the event handler for the SIGINT signal event (Ctrl+C)
process.on("SIGINT", closeServer);

const worker = new Worker("./receive.js");

worker.postMessage(`Start receiving message`);

worker.on("message", (messageFromWorker) => {
  logger.log("Received message from the web worker:", messageFromWorker);
});

worker.on("error", (error) => {
  logger.error("Worker error:", error);
});

const server = app.listen(PORT, () => logger.log(`Process started on port : ${PORT}`));
