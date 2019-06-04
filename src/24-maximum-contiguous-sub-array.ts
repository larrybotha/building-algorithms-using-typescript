/**
 * maxContiguousSubarray
 *
 * Because we pass through the array only once, we have a time complexity of O(n)
 *
 * @param {number[])} xs - the array to evaluate
 * @returns {number[]} = the sub-array containing the max sum
 */
const maxContiguousSubarray = (xs: number[]): number[] => {
  if (!xs.length) {
    return [];
  }

  let maxSumInclusive = xs[0];
  let maxSum = xs[0];
  let maxStartIndex = 0;
  let maxEndIndex = 0;

  for (let i = 0; i < xs.length; i++) {
    const val = xs[i];

    maxSumInclusive = Math.max(maxSumInclusive + val, val);
    maxSum = Math.max(maxSum, maxSumInclusive);

    /*
     * if the current value is the same as the maxSum, we have a new startIndex
     */
    if (val === maxSum) {
      maxStartIndex = i;
    }

    /*
     * if maxSumInclusive is equal to maxSum, we have a new endIndex
     */
    if (maxSumInclusive === maxSum) {
      maxEndIndex = i;
    }
  }

  return xs.slice(maxStartIndex, maxEndIndex + 1);
};

console.log(maxContiguousSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

export {maxContiguousSubarray};
