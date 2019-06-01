import {Heap, CompareFn} from './19-heap-data-structure-implementation';

/**
 * MinimumArrayNaive
 *
 * Maintain a list of numbers in order from largest to smallest
 *
 * Adding and extracting items results in an O(n^2) complexity, because items
 * are add sequentially (O(n)), and then need to be evaluated within the structure
 * (a nested O(n)) in order to be inserted in the correct location.
 *
 * This results in a time complexity of O(n^2)
 */
class MinimumArrayNaive {
  data: number[] = [];

  /**
   * add
   *
   * Add a value to the internal array in order from largest to smallest
   *
   * The worst case scenario would be to loop over the entire array, resulting
   * in a time complexity of O(n)
   *
   * @param {number} item - item to add to the array
   * @returns {void}
   */
  add(item: number): void {
    for (let index = 0; index < this.data.length; index++) {
      if (item > this.data[index]) {
        this.data.splice(index, 0, item);

        return;
      }
    }

    this.data.push(item);
  }

  /**
   * extract
   *
   * Return the smallest number in the array, i.e. the last item
   *
   * Because we use array.pop, we have time complexity O(1)
   *
   * @returns {number | undefined}
   */
  extract(): number | undefined {
    return this.data.pop();
  }
}

/**
 * MaximumArrayNaive
 *
 * Maintain a list of numbers in order from smallest to largest
 *
 * This structure differs from MinimumArrayNaive only in the evaluationg of
 * newly added items in the add method, thus we can extend the MinimumArrayNaive
 * implementation, modifying only the add method
 */
class MaximumArrayNaive extends MinimumArrayNaive {
  /**
   * add
   *
   * Add a value to the internal array in order from smallest to largest
   *
   * The worst case scenario would be to loop over the entire array, resulting
   * in a time complexity of O(n)
   *
   * @param {number} item - item to add to the array
   * @returns {void}
   */
  add(item: number): void {
    for (let index = 0; index < this.data.length; index++) {
      if (item < this.data[index]) {
        this.data.splice(index, 0, item);

        return;
      }
    }

    this.data.push(item);
  }
}

const maintain = new MinimumArrayNaive();
const xs = [1, 4, 2, 5];
xs.forEach(x => maintain.add(x));
let curr = maintain.extract();

while (typeof curr === 'number') {
  console.log(curr);
  curr = maintain.extract();
}

/*
 * Instead of using the nested array naive implementation above, we can leverage
 * heaps again to reduce time complexity, since a heap is a structure
 * responsible for maintaining an ordered list of items based on a provided
 * compare function
 *
 * Both minimumArray and maximumArray below have a time complexity of O(nlogn)
 * as a result of first looping over the items to add to the structures (O(n)), and
 * then extracting items (O(nlogn))
 */
const minimumArray = new Heap<number>((a, b) => (a - b > 0 ? 1 : -1));
xs.forEach(x => minimumArray.add(x));

while (minimumArray.size() > 0) {
  console.log(minimumArray.extractRoot());
}

const maximumArray = new Heap<number>((a, b) => (b - a > 0 ? 1 : -1));
xs.forEach(x => maximumArray.add(x));

while (maximumArray.size() > 0) {
  console.log(maximumArray.extractRoot());
}

export {MinimumArrayNaive, MaximumArrayNaive};
