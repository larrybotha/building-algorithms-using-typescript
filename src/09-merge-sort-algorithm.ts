/**
 * merge
 *
 * Merges two sorted arrays, sorting them
 *
 * @param {number[]} xs - first sorted array
 * @param {number[])} ys - second sorted array
 * @returns {number[]} merged sorted arrays
 */
const merge = (leftXs: number[], rightXs: number[]): number[] => {
  const xs: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  /*
   * loop while the sum of the left and right indexes is less than the sum of
   * the lengths of each array
   */
  while (leftIndex + rightIndex < leftXs.length + rightXs.length) {
    /*
     * get the current values from each sorted array for their respective
     * indices
     */
    const leftItem = leftXs[leftIndex];
    const rightItem = rightXs[rightIndex];

    /*
     * if we have no more items on the left:
     *
     * - push the item from hhe right onto the array
     * - increment the index for the right
     */
    if (leftItem === null) {
      xs.push(rightItem);
      rightIndex++;
    } else if (rightItem == null) {
      /*
       * if we have no more items on the right:
       *
       * - push the item from hhe right onto the array
       * - increment the index for the left
       */
      xs.push(leftItem);
      leftIndex++;
    } else if (leftItem < rightItem) {
      /*
       * if the item on the left is less than the item on the right:
       *
       * - push the left item onto the array
       * - increment the left index
       */
      xs.push(leftItem);
      leftIndex++;
    } else {
      /*
       * otherwise:
       *
       * - push the right item onto the array
       * - increment the right index
       */
      xs.push(rightItem);
      rightIndex++;
    }
  }

  console.log('\nmerge result: ');
  console.log(xs);

  return xs;
};

/**
 * mergeSort
 *
 * Sort an array using the merge sort algorithm
 *
 * @param {number[])} xs - the array to sort
 * @returns {number[]} - the sorted array
 */
const mergeSort = (xs: number[]): number[] => {
  if (xs.length <= 1) return xs;

  console.log('\n=================');
  console.log('run mergeSort on:');
  console.log(xs);

  /*
   * Merge sort divides an array in two before sorting
   */
  const middleIndex = Math.floor(xs.length / 2);
  const leftXs = xs.slice(0, middleIndex);
  const rightXs = xs.slice(middleIndex);

  console.log('\nmerge:');
  console.log({left: leftXs, right: rightXs});
  return merge(mergeSort(leftXs), mergeSort(rightXs));
};

console.log(
  mergeSort(
    Array.from({length: 5})
      .map((_, i) => i)
      .slice()
      .reverse()
  )
);

export {mergeSort};
