const arrToSort = [1, 2, 4, 3];

/**
 * bubbleSortNaive
 *
 * Naive bubble sort implementation
 *
 * Has complexity O(n^2) because we have to loop over a nested for loop, and
 * will always run n^2 times, regardless of whether the array is sorted or not
 *
 * @param {number[])} xs - array of numbers
 * @returns {number[]} sorted array
 */
const bubbleSortNaive = (xs: number[]): number[] => {
  const arrLength = xs.length;
  let sorted = xs.slice();

  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        // switch the positions of the values in the array
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }

      console.log(`iteration: ${i} ${j}`);
    }
  }

  return sorted;
};

console.log(bubbleSortNaive(arrToSort));

/**
 * bubbleSort
 *
 * An optimised version that will break out of the loop once values are swapped,
 * instead of running through every iteration.
 *
 * At worst, this will run n^2 times (i.e. still O(n^2)
 *
 * @param {number[])} xs
 * @returns {number[]} sorted array
 */
const bubbleSort = (xs: number[]): number[] => {
  let sorted = xs.slice();

  while (true) {
    let swapped = false;

    for (let i = 0; i < xs.length - 1; i++) {
      if (sorted[i] > sorted[i + 1]) {
        // switch the positions of the values in the array
        [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
        swapped = true;
      }

      console.log(`iteration: ${i}`);
    }

    if (!swapped) break;
  }

  return sorted;
};

console.log(bubbleSort(arrToSort));

export {bubbleSort, bubbleSortNaive};
