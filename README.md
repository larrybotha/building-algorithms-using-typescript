# Building algorithms using Typescript

Notes and annotations for the [Building algorithms using Typescript]() course on
egghead.io.

## ReadonlyArray

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

The sorting algorithm is left up to the implementing runtime.

All browsers use an implementation that has a `O(n logn)` asymptotic run time /
complexity.

## Sorting anagrams

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

  return acc.size < 2;
}
```

`Set`s are convenient as they contain only unique values. If a character in the
string is evaluated, it's either in the `Set` or not. If it's already in the
`Set`, then we know we have a match, and remove it from the `Set`. Otherwise add
it to the set.
