/**
 * binarySearchNaive
 *
 * A naive implementation of a binary search with complexity O(n)
 *
 * This is the same as using Array.prototype.findIndex, as it implements a
 * simple loop to find the index of the specified number
 *
 * @param {number[]} xs - the array to search
 * @param {number)} num - the number to find
 * @returns {number} the index of the number in the given array, or -1 if not
 * found
 */
const binarySearchNaive = (xs: number[], num: number): number => {
  for (let i = 0; i < xs.length; i++) {
    if (xs[i] === num) {
      return i;
    }
  }

  return -1;
};

/**
 * binarySearch
 *
 * Find the index of an element in a sorted array
 *
 * @param {number[]} xs - the array to search
 * @param {number)} num - the number to find
 * @returns {number} the index of the number in the given array, or -1 if not
 * found
 */
const binarySearch = (
  xs: number[],
  num: number,
  start: number = 0,
  end: number = xs.length - 1
): number => {
  const middle = Math.floor((start + end) / 2);

  if (xs[middle] === num) {
    return middle;
  }

  if (xs[middle] > num) {
    return binarySearch(xs, num, start, middle - 1);
  }

  if (xs[middle] < num) {
    return binarySearch(xs, num, middle + 1, end);
  }

  return -1;
};

console.log(binarySearch(Array.from({length: 10}).map((_, i) => i + 1), 7));

export {binarySearch, binarySearchNaive};
