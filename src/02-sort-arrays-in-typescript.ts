/*
 * [].sort mutates the array
 *
 * To fix this, one can indicate that an array should not be nutated
 */
const arr: ReadonlyArray<string> = ['foo', 'bar'];

// invalid
// const copy = arr.sort()

// valid
const copy = arr.slice().sort();

/*
 * [].sort treats arrays as string[] by default
 *
 * Always provide a compare function when sorting anything other than string
 */
const numArr: number[] = [1, 22, 3];
console.log(numArr.slice().sort());

const movies = [
  {
    name: 'Shawshank Redemption',
    year: 1994,
  },
  {
    name: 'The Godfather',
    year: 1972,
  },
  {
    name: 'The Godfather: Part II',
    year: 1974,
  },
  {
    name: 'The Dark Knight',
    year: 2008,
  },
];

// sort ascending
console.log(movies.slice().sort((a, b) => (a.year - b.year > 0 ? 1 : -1)));

// sort descending
console.log(movies.slice().sort((a, b) => (b.year - a.year > 0 ? 1 : -1)));
