'use strict';

const async = require('async');

/**
 * A consumer of mathematical expressions
 */
class Consumer {
  constructor() {
    this.queue = async.queue(this.evaluate, 20);
  }

  /**
   * Evaluates a mathematical expression
   * @param  {String} expression The mathematical expression
   * @param {Function} callback Function to be called after evaluation
   * @returns {Number}          The answer to the expression
  */
  evaluate(expression, callback) {
    const operatorRegx = /[+-/*]/;
    const operator     = expression.match(operatorRegx)[0];
    const operands     = expression.replace('=', '').split(operatorRegx).map(i => parseInt(i, 10));
    const calculate    = new Function('x', 'y', `return x ${operator} y`);
    const result       = calculate(operands[0], operands[1]);

    console.log(`Consumer: Evaluated expression as ${expression}${result}`);

    return callback(null, result);
  }

  /**
   * Adds an expression to the queue
   * @param  {String}   expression A mathematical expression
   * @param  {Function} cb         The function to be called after processed
   */
  enqueue(expression, cb) {
    console.log(`Consumer: Adding ${expression} to queue`);

    this.queue.push(expression, cb);
  }
}

module.exports = new Consumer();
