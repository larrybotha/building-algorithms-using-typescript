/**
 * insertionSort
 *
 * Sort an array by using the insertion algorithm
 *
 * Build a sorted array from the unsorted array by inserting values one at a
 * time.
 *
 * @param {number[])} arr - array to sort
 * @returns {number[]} the sorted array
 */
const insertionSort = (arr: number[]): number[] => {
  const xs = arr.slice();

  console.log(xs);

  /*
   * iterate from 1, as an array with a single item is alreay sorted
   */
  for (let i = 1; i < xs.length; i++) {
    const current = xs[i];
    /*
     * keep track of the index of the values we'll evaluate against the current
     * value
     */
    let j = i - 1;

    console.log({section: xs.slice(0, i), current});

    /*
     * If a value preceding the current value is greater than the current value,
     * shift the entire array over
     *
     * while
     * - j is positive, and
     * - the tracked value is greater than the current value
     */
    while (j >= 0 && xs[j] > current) {
      /*
       * assign the value at j to the next position in the array
       */
      console.log(`xs[${j + 1}] = ${xs[j]}`);
      xs[j + 1] = xs[j];
      j--;
    }

    /*
     * once we've iterated through all indices lower than the current index,
     * we've sort all values for the iteration.
     *
     * We can now assign the current value to the position after the last
     * tracked index
     */
    xs[j + 1] = current;
  }

  return xs;
};

console.log(insertionSort([4, 3, 2, 1]));

export {insertionSort};
