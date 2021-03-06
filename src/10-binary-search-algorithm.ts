/**
 * linearSearch
 *
 * A linear search for an item in an array
 *
 * This is the same as using Array.prototype.findIndex, as it implements a
 * simple loop to find the index of the specified number
 *
 * @param {number[]} xs - the array to search
 * @param {number)} num - the number to find
 * @returns {number} the index of the number in the given array, or -1 if not
 * found
 */
const linearSearch = (xs: number[], num: number): number => {
  let index = -1;

  for (let i = 0; i < xs.length; i++) {
    if (xs[i] === num) {
      index = i;
      break;
    }
  }

  return index;
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

export {binarySearch, linearSearch};
