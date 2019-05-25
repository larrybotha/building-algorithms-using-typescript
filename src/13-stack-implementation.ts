/**
 * Stack
 *
 * LIFO (Last In First Out) with O(1) key operations
 */
class Stack<T> {
  private data: T[] = [];

  /**
   * push
   *
   * Adds item in O(1), since the index of no other items in the array are
   * affected
   *
   * @param {T} item
   * @returns {void}
   */
  public push(item: T): void {
    this.data.push(item);
  }

  /**
   * pop
   *
   * Removes last inserted item in O(1), since the index of no other elements in
   * the array are affected
   *
   * If no item, returns undefined
   *
   * @returns {T | undefined}
   */
  public pop(): T | undefined {
    return this.data.pop();
  }

  /**
   * size
   *
   * Returns number of items in the stack in O(1)
   *
   * @returns {number}
   */
  public size(): number {
    return this.data.length;
  }
}

export {Stack};
