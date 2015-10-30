'use strict';

const Producer = require('../producer/Producer');

class ProducerFactory {
  static get(number) {
    const producers = [];

    for (let i = 0; i < number; i++) {
      const instance = new Producer();

      producers.push(instance);
    }

    return producers;
  }
}

module.exports = ProducerFactory;
