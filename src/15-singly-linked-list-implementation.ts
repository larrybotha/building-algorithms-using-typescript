/**
 * LinkedListNode
 *
 * A node in a LinkedList, which holds a value, and optionally points to the
 * next node
 */
interface LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T> | undefined;
}

class LinkedList<T> {
  private head?: LinkedListNode<T> | undefined;
  private tail?: LinkedListNode<T> | undefined;

  /**
   * add
   *
   * Add a node to the LinkedLost with time complexity O(1)
   *
   * @param {T} value - value to use when creating the node
   * @returns {undefined}
   */
  add(value: T): void {
    /*
     * create a new LinkedListNode
     */
    const node: LinkedListNode<T> = {
      next: undefined,
      value,
    };

    /*
     * if there is no head, then this item is the head of this LinkedList
     */
    if (!this.head) {
      this.head = node;
    }

    /*
     * If there is a tail, then this node is the next node for the tail
     */
    if (this.tail) {
      this.tail.next = node;
    }

    /*
     * because this is the most recently added node, it must be assigned as the
     * tail
     */
    this.tail = node;
  }

  /**
   * dequeue
   *
   * FIFO removal of items in the linked list with time complexity of O(1)
   *
   * Any operation that only requires a constant number of next value
   * manipulations can always be implemented with time complexity O(1)
   *
   * @returns {T | undefined}
   */
  dequeue(): T | undefined {
    /*
     * if there is a head, remove it and return it, otherwise return undefined
     */
    if (this.head) {
      const {value} = this.head;

      /*
       * set the head to the current head's next value
       */
      this.head = this.head.next;

      /*
       * if there is no head, then we need to assign the tail to undefined, as
       * there are no nodes following the new head
       */
      if (!this.head) {
        this.tail = undefined;
      }

      return value;
    }
  }

  /**
   * values
   *
   * Allow users to iterate through values in the linekd list with time
   * complexity O(1)
   *
   * @returns {IterableIterator<T>}
   */
  *values(): IterableIterator<T> {
    let current = this.head;

    while (current) {
      yield current.value;

      current = current.next;
    }
  }
}

const list = new LinkedList<number>();
[1, 2, 4, 8].map(n => list.add(n));

for (const item of list.values()) {
  console.log(item);
}

export {LinkedList};
