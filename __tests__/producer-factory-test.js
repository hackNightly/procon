'use strict';

jest.dontMock('../producer/Producer');
jest.dontMock('../producer/ProducerFactory');

describe('ProducerFactory', () => {
  const ProducerFactory = require('../producer/ProducerFactory');
  const Producer = require('../producer/Producer');

  it('should return Producer instances', () => {
    let instances = ProducerFactory.get(2);

    expect(instances[0] instanceof Producer).toBe(true);
  });
});
