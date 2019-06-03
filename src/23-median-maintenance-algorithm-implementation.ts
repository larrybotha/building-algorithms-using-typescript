import {Heap, CompareFn} from './19-heap-data-structure-implementation';

/**
 * MedianMaintenanceArrayNaive
 *
 * Implement a naive structure for maintaining the median of an array.
 *
 * Because this implementation uses a for loop, it has a time complexity pf O(n)
 */
class MedianMaintenanceArrayNaive {
  data: number[] = [];

  /**
   * add
   *
   * add an item into the array structure in order, and return the median
   *
   * Because we are using a for loop, we have time complexity O(n)
   *
   * @param {number} item - the number to insert
   * @returns {number}
   */
  public add(item: number): number {
    for (let index = 0; index < this.data.length; index++) {
      /*
       * if the item is less than the value at the current index
       */
      if (item < this.data[index]) {
        /*
         * insert the item in place
         */
        this.data.splice(index, 0, item);
      } else {
        this.data.push(item);
      }

      return this.median();
    }

    /*
     * if we didn't exit via the loop, push the item onto the end of the array
     */
    this.data.push(item);

    return this.median();
  }

  /**
   * median
   *
   * return the median of the list
   *
   * @returns {number}
   */
  public median(): number {
    const {length} = this.data;
    const medianIndex = (length - 1) / 2;

    if (length === 1) {
      return this.data[0];
    }

    if (medianIndex % 1 === 0) {
      return this.data[Math.floor(medianIndex)];
    } else {
      return (
        (this.data[Math.floor(medianIndex)] +
          this.data[Math.ceil(medianIndex)]) /
        2
      );
    }
  }
}

/**
 * MedianMaintenanceArray
 *
 * Maintain a median in a list using two heaps sorted in opposite directions,
 * resulting in a time complexity of O(logn);
 */
class MedianMaintenanceArray {
  /*
   * maintain a list items ordered from largest to smallest
   *
   * extracting the root will give us the largest of the smallest numbers in the list
   */
  lowMaxHeap = new Heap<number>((a, b) => b - a);
  /*
   * maintain a list of items from smallest to largest
   *
   * extracting the root will give us the smallest of the larger numbers in the list
   */
  highMinHeap = new Heap<number>((a, b) => a - b);

  /**
   * add
   *
   * add na item to the data structure with time complexity O(logn)
   *
   * if it is a small number, it will be added to the heap maintaining the small numbers
   *
   * @param {number} item - item to add
   * @returns {number}
   */
  public add(item: number): number {
    if (this.lowMaxHeap.size() === 0 || item < this.lowMaxHeap.peek()) {
      this.lowMaxHeap.add(item);
    } else {
      this.highMinHeap.add(item);
    }

    this.balanceHeaps();

    return this.median();
  }

  /**
   * balanceHeaps
   *
   * once an item is added to either heap, we need to ensure that the heaps
   * have allocated the same number of items, with a maximum difference of 1
   *
   * @returns {void}
   */
  private balanceHeaps(): void {
    const biggerHeap =
      this.lowMaxHeap.size() > this.highMinHeap.size()
        ? this.lowMaxHeap
        : this.highMinHeap;
    const smallerHeap =
      biggerHeap === this.lowMaxHeap ? this.highMinHeap : this.lowMaxHeap;

    if (biggerHeap.size() - smallerHeap.size() > 1) {
      smallerHeap.add(biggerHeap.extractRoot());
    }
  }

  /**
   * median
   *
   * return the median of the data structure
   *
   * @returns {number}
   */
  private median(): number {
    const lowMaxSize = this.lowMaxHeap.size();
    const highMinSize = this.highMinHeap.size();
    let median;

    if (lowMaxSize > highMinSize) {
      median = this.lowMaxHeap.peek();
    } else {
      median = this.highMinHeap.peek();
    }

    if (lowMaxSize === highMinSize) {
      median = (this.lowMaxHeap.peek() + this.highMinHeap.peek()) / 2;
    }

    return median;
  }
}

const xs = [3, 2, 6, 1, 7];
const naiveMedianMaintainedArray = new MedianMaintenanceArrayNaive();
const medianMaintainedArray = new MedianMaintenanceArray();

xs.map(x => console.log(naiveMedianMaintainedArray.add(x)));
console.log('===================');
xs.map(x => console.log(medianMaintainedArray.add(x)));

export {MedianMaintenanceArray, MedianMaintenanceArrayNaive};
