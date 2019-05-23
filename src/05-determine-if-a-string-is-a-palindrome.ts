/**
 * IsPalindrome
 *
 * @param {string} s - the string to evaluate for being a palindrome
 * @returns {boolean} - true if string is a palindrome
 */
type IsPalindrome = (s: string) => boolean;
const isPalindrome: IsPalindrome = s => {
  const normalizedStr = s.trim().replace(/ /g, '');

  return (
    normalizedStr ===
    normalizedStr
      .split('')
      .reverse()
      .join('')
  );
};

console.log(isPalindrome('madam'));

/**
 * hasAnyPermutationNaive
 *
 * Returns true if there is any permutation of a string that is a palindrome.
 * Naive implementation with complexity O(n!) due to having to generate every single
 * permutation
 *
 * @param {string} = the string to evaluate for permutations
 * @returns {boolean} - true if there is any permutation of the string which is a palindrome
 */
const hasAnyPermutationNaive: IsPalindrome = s => {
  const palindromePermutations = s
    .split('')
    .map((c, i, arr) => {
      const xsWithoutChar = arr.slice(0, i).concat(arr.slice(i + 1));
      const perms = Array.from({length: arr.length - 1})
        .map((_, j) => {
          const perm = xsWithoutChar
            .slice(0, j)
            .concat(c)
            .concat(xsWithoutChar.slice(j))
            .join('');

          return perm;
        })
        .find(isPalindrome);

      return perms;
    })
    .filter(Boolean);

  return palindromePermutations.length > 0;
};

console.log(hasAnyPermutationNaive('civil'));
console.log(hasAnyPermutationNaive('toto'));

/**
 * hasAnyPermutation
 *
 * A more performant palindrome finding function than the previous.
 *
 * Every palindrome has the following property:
 * - every character, except 1, has a matching character
 *
 * This implementation has a complexity of O(n)
 *
 * @param IsPalindrome
 * @returns {undefined}
 */
const hasAnyPermutation = (str: string): boolean => {
  const unmatched = str
    .replace(/ /g, '')
    .split('')
    .reduce((acc, c) => {
      acc.has(c) ? acc.delete(c) : acc.add(c);

      return acc;
    }, new Set<string>());

  return unmatched.size <= 1;
};

console.log(hasAnyPermutation('civil'));
console.log(hasAnyPermutation('toto'));

export {hasAnyPermutationNaive, isPalindrome};
