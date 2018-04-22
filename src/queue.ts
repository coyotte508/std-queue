import Subqueue from './subqueue';

export default class Queue<T> {
  get length() {
    return this._size;
  }

  public push(...elems: T[]) {
    for (const elem of elems) {
      this.bottom.enqueue(elem);

      if (this.bottom.full()) {
        this.bottom = this.bottom.next = new Subqueue<T>();
      }
    }

    this._size += elems.length;
  }

  public shift(): T {
    if (this._size === 0) {
      return undefined;
    }

    const val = this.top.dequeue();
    this._size--;
    if (this.top.size === 0 && this.top.full()) {
      this.top = this.top.next;
    }
    return val;
  }

  public peek(): T {
    return this.top.peek();
  }

  public last(): T {
    return this.bottom.last();
  }

  public clear() {
    this.bottom = this.top = new Subqueue();
    this._size = 0;
  }

  private top: Subqueue<T> = new Subqueue();
  private bottom: Subqueue<T> = this.top;
  private _size: number = 0;
}
