const express = require("express");
const PORT = process.env.PORT || 5999;
const app = express();
const messageRoute = require("./routes/message");
const Logger = require("./util/Logger");
const RabbitMQ = require("./services/RabbitMQ");

const logger = new Logger("Index JS");

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

const server = app.listen(PORT, () => console.log(`Process started on port : ${PORT}`));
