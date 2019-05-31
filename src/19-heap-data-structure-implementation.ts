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
   * @param {number} index
   * @returns {void}
   */
  private siftUp(index: number): void {
    let parent = this.parent(index);

    while (
      index > 0 &&
      this.compareFn(this.data[parent], this.data[index]) > 0
    ) {
      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];

      index = parent;

      parent = this.parent(index);
    }
  }
}
