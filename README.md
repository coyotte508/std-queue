# std-queue
Efficient fifo queue for handling large amounts of data in `O(1)`

## Description 

This module was created because most other queue modules in javascript either use simple arrays or
doubly linked lists.

Both have drawbacks: Large arrays are terribly inefficient when removing the first element and 
linked lists are not very efficent storage-wise.

## Usage

```js
import Queue from 'std-queue';

const queue = new Queue();

queue.push(1);
queue.push(2);

for (let i = 10; i < 10000; i++) {
  queue.push(i);
}

queue.push('Hello', 'World');
queue.peek(); // 1
queue.last(); // 'World';
queue.shift(); // 1, head is now at 2
queue.length; // 9993
queue.clear(); // Empties queue
queue.shift(); // undefined
```

## Underlying implementation

The underlying implementation is a simple linked list of subqueues *(delayed shift arrays)* of maximum size 1000 each. 

- When adding an element, it is pushed to the back of the last subqueue, or a new one if the last subqueue is full.
- Each subqueue is an array and the index of the element at the front of the subqueue
- When removing the first element, the index is increased in the first subqueue. If it reaches the end of the subqueue,
the subqueue is destroyed. The subqueue is never *shifted*, so each operation is efficient.

The only operations performed are:

- pushing an element to the back of an array
- adding a new subqueue
- destroying the front subqueue
- moving an index in a subqueue

Each of those operations are O(1), there is never any array resizing. The use of arrays instead of just linked lists
allow to be faster and use less RAM than linked lists.

## Contributions

If you have contributions or feature requests, open a pull request or create a new issue. I will glady add basic features if they are needed.
