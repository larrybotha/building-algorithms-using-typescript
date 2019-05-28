/**
 * DoublyLinkedListNode
 *
 * node {value, next} <-> node {value, next} <-> ... <-> undefined
 *
 * A node in a DoublyLinkedList, which holds a value, and optionally points to the
 * next node and previous node
 */
interface DoublyLinkedListNode<T> {
  value: T;
  next?: DoublyLinkedListNode<T> | undefined;
  prev?: DoublyLinkedListNode<T> | undefined;
}

class DoublyLinkedList<T> {
  private head?: DoublyLinkedListNode<T> | undefined;
  private tail?: DoublyLinkedListNode<T> | undefined;

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
     * create a new DoublyLinkedListNode
     */
    const node: DoublyLinkedListNode<T> = {
      next: undefined,
      prev: undefined,
      value,
    };

    /*
     * if there is no head, then this item is the head of this DoublyLinkedList
     */
    if (!this.head) {
      this.head = node;
    }

    /*
     * If there is a tail, then this node is the next node for the tail
     */
    if (this.tail) {
      node.prev = this.tail;
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
      } else {
        /*
         * if there is a head, we need to set its previous value to undefined,
         * as the previuos value no no longer exists
         */
        this.head.prev = undefined;
      }

      return value;
    }
  }

  /**
   * pop
   *
   * a FILO strategy for removing items last item from the linked list, returning
   * it, or returning undefined, with a time complexity of  O(1)
   *
   * @returns {T | undefined}
   */
  pop(): T | undefined {
    if (this.tail) {
      const {value} = this.tail;

      /*
       * set the tail to the previous value of the current tail
       */
      this.tail = this.tail.prev;

      /*
       * if the new tail doesn't exist, set the head to undefined, since we
       * don't have any values left in our list
       */
      if (!this.tail) {
        this.head = undefined;
      } else {
        /*
         * if there is a tail, we need to set the next value to undefined, as by
         * this point it has been removed
         */
        this.tail.next = undefined;
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

const list = new DoublyLinkedList<number>();
[1, 2, 4, 8].map(n => list.add(n));

for (const item of list.values()) {
  console.log(item);
}

export {DoublyLinkedList};
