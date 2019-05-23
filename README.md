# Building algorithms using Typescript

Notes and annotations for the [Building algorithms using Typescript]() course on
egghead.io.

## ReadonlyArray

[01-understand-fizzbuzz-coding-problems-and-solutions.ts](./src/01-understand-fizzbuzz-coding-problems-and-solutions.ts)

### `sort` mutates arrays

`[].sort()` mutates arrays in plays.

Using Typescript's `ReadonlyArray` one can ensure that arrays are not mutated by
methods that may not be known to mutate:

```typescript
const arr: ReadonlyArray<number> = [2, 1]

// invalid
const copy1 = arr.sort();

// valid
const copy2 = arr.slice().sort();
```

### default `sort` algorithm

By default, `[].sort` will treat all arrays as if they contain strings:

```javascript
const arr = [1, 22, 3]

arr.slice().sort()
// => [1, 22, 3]
```

Always provide a compare function when sorting anything other than a `string[]`.

### `[].sort` Big-O

[02-sort-arrays-in-typescript.ts](./src/02-sort-arrays-in-typescript.ts)
[03-case-insensitive-sorting-for-string-arrays.ts](./src/03-case-insensitive-sorting-for-string-arrays.ts)

The sorting algorithm is left up to the implementing runtime.

All browsers use an implementation that has a `O(n logn)` asymptotic run time /
complexity.

## Sorting anagrams

[04-determine-if-two-strings-are-an-anagram.ts](./src/04-determine-if-two-strings-are-an-anagram.ts)

The following implementation has a complexity of `O(n logn)` because it uses
`[].slice`:

```typescript
const areAnagrams1: AreAnagrams = (s1, s2) => {
  const [sorted1, sorted2] = [s1, s2]
    .map(s => s.toLocaleLowerCase())
    .map(s => s.split('').sort().join(''))

  return sorted1 === sorted2;
}
```

By using `Map` to count the occurrences of characters, we can improve on our
implementation with a complexity of `O(n)`, where `n` is the number of
characters in the strings:

```typescript
const areAnagrams2: AreAnagrams = (s1, s2) => {
  const charCount = new Map<string, number>();

  s1.split('')
    .map(c => charCount.set(c, (charCount.get(c) || 0) + 1));
  s2.split('')
    .filter(c => charCount.has(c))
    .map(c => charCount.set(c, charCount.get(c) - 1));

  return Array.from(charCount.values()).every(v => v === 0);
}
```

## Palindromes

[05-determine-if-a-string-is-a-palindrome.ts](./src/05-determine-if-a-string-is-a-palindrome.ts)

A naive solution to determining if any string contains at least one palindrome
would be to create a permutation of all possible character combinations.

Because this uses permutations, it would have a complexity of `n!`.

An alternative solution is to evaluate the properties of a palindrome:

- for a palindrome with an even number of characters, every character has a
    matching character
- for a palindrome that has an odd number of characters, 1 character will not
    have a match

Thus, we can reduce the problem to finding only the characters that do not
match, and determning if the string has 0 or 1 unmatched pairs to determine if
the string contains a palindrome:


```typescript
const hasAnyPalindrome = (str: string): boolean => {
  const unmatchedChars = str.split('').reduce((acc, c) => {
    // ugly, but Set.delete returns the deleted value, not an updated Set
    acc.has(c) ? acc.delete(c) : acc.add(c);

    return acc;
  }, new Set<string>())

  return acc.size <= 2;
}
```

`Set`s are convenient as they contain only unique values. If a character in the
string is evaluated, it's either in the `Set` or not. If it's already in the
`Set`, then we know we have a match, and remove it from the `Set`. Otherwise add
it to the set.

This implementation has an order of `O(n)` as we only iterate over the length of
the string once.

## Bubble sort

[06-bubble-sorting.ts](./src/06-bubble-sorting.ts)

- iterate over a list, doing the following for each value:
  - for the current value, iterate over all other items in the list, doing the
      following:
    - if the current item is greater than the value it is being compared
        to, place the compared value before the current value in the array
    - if the current item is less than the compared value, do nothing

Buuble sort is best used when sorting small lists of values.

Bubble sort has complexity `O(n^2)` since we loop over a nested array.

Bubble sort can be optimised by breaking out of the loop once the list is
sorted.

## Quicksort

[07-quicksort-algorithm.ts](./src/07-quicksort-algorithm.ts)

Quicksort has complexity `O(n logn)`. It is called _quick_ because of its low
memory overhead as a result of updating the array in place. It's also known as
Pivot Sort.

Quicksort works by recursively sorting partitions of an array until all the
partitions are themselves sorted.

This is achieved by taking a pivot point, and splitting the array at that pivot
point. The array is sorted in place; i.e. mutating the array ends up being a
pragmatic compromise.

Steps:

1. provide the full array for partition, with start at 0, and evaluate until
   the end of the array
2. during the partition, generate a pivot index between the start index and
   length of the full array
3. swap the value at the pivot index with the value at the start index

    This simplifies the algorithm, as we don't need to keep moving the position
    of the pivot value when values are sorted
4. get the pivot value from the start of the partition
5. set the pivotRank to the start index
6. loop over the partition, starting after the pivot value (now at index 0 of
   the partition), doing the following for each value:
    - if the current value is smaller than the pivot value:
        -  increment the pivotRank
        -  assign the current index of the loop to the value at the incremented
            pivotRank index of the array
        - assign the value at the pivotRank index to the value at the curret
            index
        - this ensures we move values smaller than the pivot to the beginning of
            the partition, but after the pivot value
        - we know now that the order of the partition is incorrect, because the
            pivot should be placed after the update, but we can do this once
            this loop is complete
7. once the loop is complete, if our pivotRank is different from the start
   value, we know that at least one value was lower than our pivot, so we do the
   following:

   - assign array position at the pivotRank index to the value at the start
       position - which at the beginning of this partition we made the pivot
       value
   - assign the array position at the start index the value at the pivotRank
   - we have now guaranteed that all values in the partition less than the pivot
       value precede the pivot value
8. pass the array into 2 more partition sub-routines, using the pivotRank as
   reference for the start and before indexes

  - a partition containing values from the previous start index up until just
      before the pivotRank
  - a partition containing values from after the pivotRank until the previous
      before value

## Insertion sort

[08-insertion-sort-algorithm.ts](./src/08-insertion-sort-algorithm.ts)

```bash
insertSort([4,3,2,1])

# steps in evaluation
{ section: [ 4 ], current: 3 }
{ section: [ 3, 4 ], current: 2 }
{ section: [ 2, 3, 4 ], current: 1 }

# result
[ 1, 2, 3, 4 ]
```

1. assume the first element of an array is sorted
2. loop over the array, evaluating all elements preceding the value at the
   current index

    - if the value in the previous position is greater than the current value,
        then place that value one position forward in the array
    - this will overwrite the current value, but we get to that in the next step
3. assign the current value at the position one after the tracked position

    - if there was no insertion, this will be at the current index
    - if there was insertion, this will be at the last position that was
        assigned, i.e. addressing the same value being written twice into the
        array in step 2

In the worst case, the loop will run as many times as the elements in the
left-hand sorted side of the array.

This can be represented by the sum of:

```
[1,2,3, ..., n - 1] = n * (n - 1) / 2 = O(n^2)
```

which is the complexity we'd expect from a nested loop.
