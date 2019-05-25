/**
 * findRepeatedNaive
 *
 * A naive implementation to return the first repeated item in an array
 *
 * Because we have a nested loop, we have a time complexity of O(n^2)
 *
 * @param {Array<T>)} xs - the array in which to find a repeated item
 * @returns {T} - the item in the array which was repeated
 */
const findRepeatedNaive = <T>(xs: Array<T>): T => {
  for (let i = 0; i < xs.length; i++) {
    for (let j = i + 1; j < xs.length; j++) {
      if (xs[i] === xs[j]) {
        return xs[j];
      }
    }
  }

  throw new Error('no repeated item found');
};

console.log(findRepeatedNaive([1, 2, 3, 4, 2]));

/**
 * findRepeated
 *
 * An implementation that uses a Set to find a repeated item in an array
 *
 * Using a set allows one to iterate through an array with the worst case being the
 * length of the array, giving us a time complexity of O(n)
 *
 * @param {Array<T>} xs - the array to search for a repeated item
 * @returns {T} - the first repeated item in the array
 */
const findRepeated = <T>(xs: Array<T>): T => {
  const s = new Set<T>();

  // for (let i = 0; i < xs.length; i++) {
  //   if (s.has(xs[i])) {
  //     return xs[i];
  //   } else {
  //     s.add(xs[i]);
  //   }
  // }

  for (const item of xs) {
    if (s.has(item)) {
      return item;
    } else {
      s.add(item);
    }
  }

  throw new Error('no repeated item found');
};

console.log(findRepeated([1, 2, 3, 4, 2]));

export {findRepeatedNaive};
