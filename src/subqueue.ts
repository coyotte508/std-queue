export default class Subqueue <T> {
  public full() {
    return this.array.length >= 1000;
  }

  public get size() {
    return this.array.length - this.index;
  }

  public peek(): T {
    return this.array[this.index];
  }

  public last(): T {
    return this.array[this.array.length - 1];
  }

  public dequeue(): T {
    return this.array[this.index++];
  }

  public enqueue(elem: T) {
    this.array.push(elem);
  }

  private index: number = 0;
  private array: T [] = [];

  public next: Subqueue<T> | null = null;
}
