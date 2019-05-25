/*
 * generate a random integer between 0 (inclusive) and 1 (exclusive)
 */
Math.random();

/*
 * Generate a random number between 0 (inclusive) and n
 */
Math.random() * 100;

/*
 * Generate an integer between 0 and n
 */
Math.floor(Math.random() * 100);

/*
 * Generate an integer between n and m
 */
10 + Math.floor(Math.random() * (100 - 10));

/**
 * randomInt
 *
 * Generate a random integer within a range
 *
 * @param [start
 * @param {number[])} before]
 * @returns {number =>}
 */
const randomInt = ([start, before]: number[]): number => {
  return start + Math.floor(Math.random() * (before - start));
};

console.log(Array.from({length: 10}).map(() => randomInt([5, 10])));

export {randomInt};
