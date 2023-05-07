class Logger {
  _namespace;
  constructor(namespace) {
    this._namespace = namespace;
  }

  log(...params) {
    console.log(this._namespace, ...params);
  }

  error(...params) {
    console.error(this._namespace, ...params);
  }
}

module.exports = Logger;
