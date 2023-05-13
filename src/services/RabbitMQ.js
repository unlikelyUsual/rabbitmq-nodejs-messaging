const Logger = require("../util/Logger");
const amqp = require("amqplib");

class RabbitMQ {
  _logger = new Logger("Rabbit MQ");
  _url = process.env.RABBIT_MQ_URL || "amqp://localhost";
  channel = null;
  static instance = null;
  connection = null;

  constructor() {
    if (RabbitMQ.instance) {
      throw new Error("Error: Instantiation failed: Use RabbitMQ.getInstance() instead of new.");
    }
  }

  async connect() {
    try {
      this.connection = await amqp.connect(this._url);
      this.channel = await this.connection.createChannel();
      return this.channel;
    } catch (err) {
      this._logger.error(err);
      return null;
    }
  }

  static getInstance() {
    RabbitMQ.instance = RabbitMQ.instance || new RabbitMQ();
    return RabbitMQ.instance;
  }

  getChannel() {
    return this.channel;
  }

  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}

module.exports = RabbitMQ;
