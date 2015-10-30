'use strict';

jest.dontMock('../producer/Producer');

describe('Producer', () => {
  const Producer = require('../producer/Producer.js');
  let producer;

  beforeEach(() => {
    producer = new Producer();
  });

  describe('#generateExpression', () => {
    it('should produce a mathematical expression', () => {
      const expressionObj = producer.generateExpression();
      const expression = expressionObj.expression;
      const matches    = expression.match(/^\d+[+/\-*]\d+=/).filter(a => a);

      expect(matches.length).toBe(1);
    });
  });

  describe('#getRandomNumber', () => {
    let number;

    beforeEach(function() {
      number = producer.getRandomNumber(0, 20000);
    });

    it('should generate a number', () => {
      expect(typeof number).toBe('number');
    });

    it('should generate a positive integer', () => {
      expect(number > 0).toBe(true);
    });
  });
});
