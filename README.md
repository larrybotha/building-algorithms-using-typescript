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
