'use strict';

const Producer = require('../producer/Producer');

class ProducerFactory {
  static get(number) {
    let producers = [];

    for (let i = 0; i < number; i++) {
      let instance = new Producer();

      producers.push(instance);
    }

    return producers;
  }
}

module.exports = ProducerFactory;
