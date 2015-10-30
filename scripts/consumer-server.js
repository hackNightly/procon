'use strict';

const connect  = require('connect');
const bodyParser = require('body-parser');
const http     = require('http');
const Consumer = require('../consumer/Consumer');
const server   = connect();
const port     = 8888;

server.use(bodyParser.json());

server.use((req, res, next) => {
  if (! req.body.expression) {
    next(new Error('No expression found'));
  }

  let expression = req.body.expression;

  console.log(`Consumer: Received request to evaluate ${expression}`);

  Consumer.enqueue(expression, (err, result) => {
    if (err) {
      next(new Error(err));
    }
    else {
      res.end(result.toString());
    }
  });
});

http.createServer(server).listen(port, () => {
  console.log(`Consumer running at port ${port}`);
});


