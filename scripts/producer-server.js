'use strict';

const connect         = require('connect');
const http            = require('http');
const ProducerFactory = require('../producer/ProducerFactory');
const producers       = ProducerFactory.get(2);
const request         = require('request');
const Agent           = require('agentkeepalive');
const server          = connect();
const consumerPath    = 'http://localhost:8888/';

const keepAliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 30000,
  keepAliveTimeout: 30000
});

/**
 * Iterates over producers and sends expressions to consumer
 * @param  {Function} callback Function to be called after send
 */
const produce = (callback) => {
  producers.forEach((producer) => {
    let expression = producer.generateExpression();

    makeRequest(expression, callback);
  });
}

/**
 * Sends an expression to the consumer
 * @param  {Object} expression A expression suitable for a consumer
 * @param  {Function} callback Function to be called after request is made
 */
const makeRequest = (expression, callback) => {
  request.post({
    url: consumerPath,
    headers: {'content-type': 'application/json'},
    agent: keepAliveAgent,
    json: expression
  }, (req, res, body) => {
    const cannotConnect = (req && (req.code === 'ECONNREFUSED' || req.code === 'ECONNRESET'))

    if (cannotConnect) {
      let err = `Producer<ID:${expression.producerID}>: Could not connect to consumer for ${expression.expression}`;

      callback(err);
    }
    else if (res.statusCode === 200) {
      expression.body = body;

      callback(null, expression);
    }
  });
};

setInterval(() => {
  produce((err, result) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log(`Producer<ID:${result.producerID}>: ${result.expression} was evaluated as ${result.body}`);
    }
  });
}, 500);
