import {randomInt} from './12-create-random-items-in-given-range';

/**
 * shuffle
 *
 * shuffle an array such that every item in the original array has a 1/n
 * probability of being in any position in the shuffled array
 *
 * @param {T[])} xs - the array to shuffle
 * @returns {T[]}
 */
const shuffle = <T>(xs: T[]): T[] => {
  const arr = xs.slice();

  for (let i = 0; i < arr.length; i++) {
    /*
     * for each index, get a random index between that index and the legnth of
     * the array
     *
     * This ensures that every item (i.e. at index i) can be placed at any index
     * in the array
     */
    const randChoiceIndex = randomInt([i, arr.length]);

    /*
     * swap the value at the current location in the array with the value at the
     * randomly selected index
     */
    [arr[i], arr[randChoiceIndex]] = [arr[randChoiceIndex], arr[i]];
  }

  return arr;
};

export {shuffle};
