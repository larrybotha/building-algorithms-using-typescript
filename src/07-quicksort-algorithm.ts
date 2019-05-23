/**
 * partition
 *
 * The sub-routine used by quickSort to sort an array recursively
 *
 * @param {number[]} xs - the array to sort
 * @param {number} start - the start index for the sorting
 * @param {number} before - the index until where sorting should occur
 * @returns {void}
 */
const partition = (xs: number[], start: number, before: number): void => {
  const length = before - start;

  /*
   * Abort partitioning the array if the array is of length 1;
   * an array of length 1 is already sorted
   *
   * This is the base case for recursion
   */
  if (length <= 1) return;

  /*
   * The objective for each iteration is to select a pivot element, and move the
   * items either side of the pivot such that they satisfy the following result:
   *
   * [
   *    items less than the pivot,
   *    pivot.
   *    items greater than the pivot
   * ]
   *
   * There are different ways to select a pivot, but we'll just use a random
   * number, which gives us a .5 probability of splitting the array in half
   */
  const pivotIndex = start + Math.floor(Math.random() * length);

  /*
   * Move the item at the pivot index to the start of the array
   *
   * This prevents us from having to keep moving the pivot every time we iterate
   * over the array
   */
  [xs[start], xs[pivotIndex]] = [xs[pivotIndex], xs[start]];

  const pivot = xs[start];
  let pivotRank = start;

  /*
   * Loop over the array, starting at the provided start index, and looping
   * until we get to the bebfore index
   *
   * The array will be sorted against the following criteria:
   * [
   *    items less than pivot value appear before index of pivot rank,
   *    items greater than pivot rank appear after index of the current item,
   *    remaining items that not been since
   * ]
   *
   * The loop has the following properties:
   * - starts at start + 1 because our pivot is already at the start position
   * - end the loop before the index reaches the before point
   */
  for (let index = start + 1; index < before; index++) {
    /*
     * if the value at the current index is less than our pivot value:
     * - increase our pivotRank
     * - move the current item before the item at the new pivot rank
     *
     * The item at the incremented pivot rank should be greater than the value
     * of the pivot.
     */

    if (xs[index] < pivot) {
      pivotRank++;
      [xs[index], xs[pivotRank]] = [xs[pivotRank], xs[index]];
    }
  }

  /*
   * If the pivotRank didn't change, then it is in the correct place, adn at the
   * beginning of the partition of the array we're dealing with.
   *
   * If the pivotRank has changed:
   *
   * - set the value at the pivotRank to the value at the start
   * - set the value at the start to the value at the pivotRank
   *
   * Any item at the pivotRank is smaller than the pivot because of the above
   * loop
   */
  if (pivotRank !== start) {
    [xs[pivotRank], xs[start]] = [xs[start], xs[pivotRank]];
  }

  /*
   * At this point our array subsection now looks like this:
   *
   * [
   *    items less than pivot,
   *    pivot,
   *    items greater than pivot
   * ]
   */

  /*
   * recursively sort each partition of the array separately
   *
   * Partition the first from the start until the pivotRank
   * Partition the second from after the pivotRank until the before index
   */
  partition(xs, start, pivotRank);
  partition(xs, pivotRank + 1, before);
};

/**
 * quickSort
 *
 * QuickSort implementation that uses a sub-routine to modify an array in-place,
 * returning a sorted array
 *
 * @param {number[])} xs - the array to sort
 * @returns {number[]} - the sorted array
 */
const quickSort = (xs: number[]): number[] => {
  let sortedArr = xs.slice();

  partition(sortedArr, 0, sortedArr.length);

  return sortedArr;
};

console.log(quickSort([5, 2, 3, 1, 4]));

export {quickSort};
