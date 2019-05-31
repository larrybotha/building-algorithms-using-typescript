/**
 * maxItems
 *
 * Return the max items of a balanced binary tree
 *
 * @param {number)} height
 * @returns {number}
 */
const maxItems = (height: number): number => {
  /*
   * The number of items in a balanced binary tree increase exponentially
   */
  return 2 ** height - 1;
};

/**
 * maxHeight
 *
 * Get the max height of a balanced binary tree, given the number of items in
 * the tree
 *
 * max items in height (h) = 2^h - 1
 * n = 2^h - 1
 * 2^h = n + 1
 * h = log2(n + 1)
 *
 * @param {number)} numItems - number of items in the balanced binary tree
 * to evaluate
 * @returns {number} - the max height of the tree
 */
const maxHeight = (numItems: number): number => {
  /*
   * max height is logarithmic to the number of items in the tree
   */
  return Math.log2(numItems + 1);
};

export {maxHeight, maxItems};
