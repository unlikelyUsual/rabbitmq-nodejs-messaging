const Logger = require("../util/Logger");
const amqp = require("amqplib");

class RabbitMQ {
  _logger = new Logger("Rabbit MQ");
  _url = process.env.RABBIT_MQ_URL || "amqp://localhost:13527";
  channel = null;
  static instance = null;
  connect = null;

  constructor() {
    if (RabbitMQ.channel) {
      throw new Error("Error: Instantiation failed: Use RabbitMQ.getInstance() instead of new.");
    }
  }

  async connect() {
    try {
      this.connect = await amqp.connect(this, _url);
      this.channel = await this.connect.createChannel();
      return this.channel;
    } catch (err) {
      this._logger.error(err);
      return null;
    }
  }

  getInstance() {
    RabbitMQ.instance = RabbitMQ.instance || new RabbitMQ();
    return RabbitMQ.instance;
  }

  static getChannel() {
    return this.channel;
  }

  static close() {
    connect.close();
  }
}

module.exports = RabbitMQ;
