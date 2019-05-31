/**
 * CompareFn
 *
 * A function similar to Javascript's sort function
 */
type CompareFn<T> = (a: T, b: T) => number;

class Heap<T> {
  private data: T[] = [];

  constructor(private compareFn: CompareFn<T>) {}

  private left(nodeIndex: number): number {
    return 2 * nodeIndex + 1;
  }

  private right(nodeIndex: number): number {
    return 2 * nodeIndex + 2;
  }

  private parent(nodeIndex: number): number {
    return nodeIndex % 2 === 0 ? (nodeIndex - 2) / 2 : (nodeIndex - 1) / 2;
  }

  /**
   * add
   *
   * add an element to the heap with time complexity O(logn)
   *
   * add makes use of siftUp, which has time complexity O(logn). Because of
   * this, add also has time cimplexiry of O(logn);
   *
   * @param {T} element
   * @returns {undefined}
   */
  add(element: T): void {
    this.data.push(element);

    /*
     * simply pushing an element onto the array will violate the heap property if
     * the new element is less than any of its parents
     *
     * We need to move the element up the head until we satisfy the heap
     * property
     */
    this.siftUp(this.data.length - 1);
  }

  /**
   * siftUp
   *
   * moves the node at the given index up to its proper place in the heap.
   *
   * We only evaluate the depth of the tree, thus its runtime complexity is
   * O(logn)
   *
   * @param {number} index
   * @returns {void}
   */
  private siftUp(index: number): void {
    /*
     * get the index of the parent of the node at the provided index
     */
    let parent = this.parent(index);

    /*
     * while:
     * - we are below the root node, and
     * - our current node is less then its parent node
     */
    while (
      index > 0 &&
      this.compareFn(this.data[parent], this.data[index]) > 0
    ) {
      /*
       * swap the parent node and the current node, restoring the order the heap
       * property requires
       */
      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];

      /*
       * set the current index to that of its parent for the next iteration
       */
      index = parent;

      /*
       * get the next parent's index
       */
      parent = this.parent(index);
    }
  }

  extractRoot(): T | undefined {
    if (this.data.length > 0) {
      const root = this.data[0];
      const last = this.data.pop();

      if (this.data.length > 0) {
        this.data[0] = last;
        this.siftDown(0);
      }

      return root;
    }
  }

  /**
   * siftDown
   *
   * move values down the tree until the heap requirement is satisfied
   *
   * The maximum number of iterations that can occur is the depth of the tree,
   * resulting in a time complexity of O(logn)
   *
   * @param {number} nodeIndex
   * @returns {void}
   */
  private siftDown(nodeIndex: number): void {
    /**
     * minIndex
     *
     * @param {number} left - left index to compase
     * @param {number} right - right index to compare
     * @returns {number} - the index of the value of the smaller of the two
     * nodes
     */
    const minIndex = (left: number, right: number): number => {
      /*
       * if the right child is out of range, check if the left child is out of
       * range
       */
      if (right >= this.data.length) {
        /*
         * if the left child is out range, return -1
         */
        if (left >= this.data.length) {
          return -1;
        } else {
          /*
           * otherwise return the left index
           */
          return left;
        }
      } else {
        /*
         * compare the two values, returning the index of the smaller value
         */
        if (this.compareFn(this.data[left], this.data[right]) <= 0) {
          return left;
        } else {
          return right;
        }
      }
    };

    /*
     * get the index of the smaller value of the nodes at the node index
     */
    let min = minIndex(this.left(nodeIndex), this.right(nodeIndex));

    /*
     * while
     * - our minimum is positive, and
     * - the value at the node index is greater than the value at the smaller of
     * the left and right nodes at the current index
     */
    while (
      min >= 0 &&
      this.compareFn(this.data[nodeIndex], this.data[min]) > 0
    ) {
      /*
       * swap the value at the minimum with the value at the node index
       */
      [this.data[min], this.data[nodeIndex]] = [
        this.data[nodeIndex],
        this.data[min],
      ];

      /*
       * set the node index to be the minimum for the next index
       */
      nodeIndex = min;

      /*
       * set the minimum to the smaller of the left and right nodes of the new
       * node index
       */
      min = minIndex(this.left(nodeIndex), this.right(nodeIndex));
    }
  }

  /**
   * size
   *
   * return the size of the heap
   *
   * @returns {number}
   */
  size(): number {
    return this.data.length;
  }

  /**
   * peek
   *
   * return the value at the root of the heap without removing it
   *
   * @returns {T | undefined}
   */
  peek(): T | undefined {
    if (this.data.length > 0) {
      return this.data[0];
    } else {
      return undefined;
    }
  }
}

const heap = new Heap<number>((a, b) => a - b);
heap.add(1);
heap.add(6);
heap.add(2);

// outputs heap values in ascending order
console.log(heap.extractRoot());
console.log(heap.extractRoot());
console.log(heap.extractRoot());

export {Heap};
