import { expect } from "chai";
import Queue from "..";

describe('Queue', () => {
  describe('shift', () => {
    it ('should behave ok with a small amount of data', () => {
      const queue = new Queue();

      queue.push(1);
      queue.push(2, 3);

      expect(queue.shift()).to.equal(1);
      expect(queue.length).to.equal(2);
      expect(queue.shift()).to.equal(2);
      expect(queue.shift()).to.equal(3);
      expect(queue.shift()).to.equal(undefined);

      queue.push(4);
      expect(queue.shift()).to.equal(4);
    });
  });

  describe('length', () => {
    it ('should stay consistent', () => {
      const queue = new Queue();

      expect(queue.length).to.equal(0);

      queue.push(1);
      queue.push(2, 3);

      expect(queue.length).to.equal(3);

      for (let i = 0; i < 3; i++) {
        queue.shift();
      }

      expect(queue.length).to.equal(0);
      queue.shift();
      expect(queue.length).to.equal(0);

      for (let i = 0; i < 503; i++) {
        queue.shift();
      }
      expect(queue.length).to.equal(0);
    });
  });

  it ('should behave ok with a real example', () => {
    const queue = new Queue();

    queue.push(1);
    queue.push(2);

    for (let i = 10; i < 10000; i++) {
      queue.push(i);
    }

    queue.push('Hello', 'World');
    expect(queue.peek()).to.equal(1);
    expect(queue.last()).to.equal('World');
    expect(queue.length).to.equal(9994);
    expect(queue.shift()).to.equal(1);
    expect(queue.peek()).to.equal(2);
    expect(queue.length).to.equal(9993);
    queue.clear(); // Empties queue
    expect(queue.length).to.equal(0);
    expect(queue.shift()).to.equal(undefined);
    expect(queue.length).to.equal(0);
  });
});
