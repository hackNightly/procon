'use strict';

jest.dontMock('../consumer/Consumer')
jest.dontMock('async');

describe('Consumer', () => {
  const Consumer = require('../consumer/Consumer');

  it('should have a queue', () => {
    expect(Consumer.queue).toBeDefined();
  });

  describe('#enqueue', () => {
    it('should add things to the queue', () => {
      spyOn(Consumer.queue, 'push');
      Consumer.enqueue('3+3', () => {});

      expect(Consumer.queue.push).toHaveBeenCalledWith('3+3', jasmine.any(Function));
    });
  });

  describe('#evaluate', () => {
    it('can perform addition', () => {
      Consumer.evaluate('3+2=', (err, result) => {
        expect(result).toBe(5);
      });
    });

    it('can perform subtraction', () => {
      Consumer.evaluate('3-2=', (err, result) => {
        expect(result).toBe(1);
      });
    });

    it('can perform multiplication', () => {
      Consumer.evaluate('3*2=', (err, result) => {
        expect(result).toBe(6);
      });
    });

    it('can perform division', () => {
      Consumer.evaluate('10/2=', (err, result) => {
        expect(result).toBe(5);
      });
    });
  });
});
