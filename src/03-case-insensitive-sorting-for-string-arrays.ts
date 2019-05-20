const xs = [
  'Alpha',
  'beta',
  'Gamma',
  'delta'
];

/*
 * Capital leters come before lower-case letters. If our algorithm doesn't
 * account for this, we can get unexpected results:
 */

console.log(xs.slice().sort())

// String.localeCompare is one method of determining sequences of strings
// despite differences in case
console.log(xs.slice().sort((a, b) => a.localeCompare(b)))
