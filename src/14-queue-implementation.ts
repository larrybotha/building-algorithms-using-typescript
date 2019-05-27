/**
 * QueueInvalid
 *
 * An invalid implementation of Queue
 *
 * Queue is a FIFO structure, and has a time complexity of O(1) for key operations.
 *
 * It has the following public methods:
 * - queue - add a value ti the queueu
 * - dequeue - remove the first item from the queue and return it
 *
 * We'll see below how an implementation modeled on arrays violates the complexity
 * requirement
 */
class QueueInvalid<T> {
  /**
   * model Queue using an array
   */
  private data: T[] = [];

  /**
   * enqueue
   *
   * append an item to the queue with time complexity O(1)
   *
   * @param {T} item - the item to append to the queue
   * @returns {void}
   */
  public enqueue(item: T): void {
    this.data.push(item);
  }

  /**
   * dequeue
   *
   * remove the first item in the queue, and return it, or return undefined, with
   * time complexity O(1)
   *
   * This is where the implementation with array falls short. By relying on [].shift,
   * every item in the array requires its index to be updated, resulting in a time
   * complexity of O(n)
   *
   * Becuase of this, array is not suitable for an O(!) of Queue
   *
   * @returns {T | undefined}
   */
  public dequeue(): T | undefined {
    return this.data.shift();
  }
}
/**
 * Queue
 *
 * It has the following public methods:
 * - queue - add a value ti the queueu
 * - dequeue - remove the first item from the queue and return it
 */
class Queue<T> {
  /**
   * model Queue using a map
   */
  private data: {[index: number]: T} = Object.create(null);
  private lastDequeuedIndex = 0;
  private nextEnqueuedIndex = 0;

  /**
   * enqueue
   *
   * append an item to the queue with time complexity O(1)
   *
   * @param {T} item - the item to append to the queue
   * @returns {void}
   */
  public enqueue(item: T): void {
    this.data[this.nextEnqueuedIndex] = item;
    this.nextEnqueuedIndex++;
  }

  /**
   * dequeue
   *
   * remove the first item in the queue, and return it, or return undefined, with
   * time complexity O(1)
   *
   * @returns {T | undefined}
   */
  public dequeue(): T | undefined {
    /*
     * if the dequeued and enqueded indices are equal, then we have an empty queue,
     * and we let the implicit undefined returm happen, otherwise we handle the
     * dequeue ourselves
     */
    if (this.lastDequeuedIndex !== this.nextEnqueuedIndex) {
      const item = this.data[this.lastDequeuedIndex];
      delete this.data[this.lastDequeuedIndex];
      this.lastDequeuedIndex++;

      return item;
    }
  }

  /**
   * size
   *
   * return the size of the queue
   *
   * @returns {number}
   */
  size(): number {
    return this.nextEnqueuedIndex - this.lastDequeuedIndex;
  }
}

export {QueueInvalid};
