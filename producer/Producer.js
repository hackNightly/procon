'use strict';

const shortid = require('shortid');

class Producer {
  constructor() {
    this.id = shortid.generate();
  }

  /**
   * Generates an expression suitable for sending to a consumer
   * @return {Object} The expression object
   * @attribute {String} expression The mathematical expression
   * @attribute {String} producerID The ID of the producer
   */
  generateExpression() {
    const left  = this.getRandomNumber(0, 50000);
    const right = this.getRandomNumber(0, 50000);
    const operator = ['+','-','*','/'][Math.floor(Math.random()*4)];
    const expression = `${left}${operator}${right}=`;

    console.log(`Producer<${this.id}> generated expression ${expression}`);

    return {
      expression: expression,
      producerID: this.id
    };
  }

  /**
   * Generates a random integer between min and max
   * @returns {Number} An integer between min and max
   */
  getRandomNumber(min, max) {
    if (min < 0 || !min)  { min = 0; }
    if (max <= 0 || !max) { max = 1; }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Producer;
