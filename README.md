# Building algorithms using Typescript

Notes and annotations for the [Building algorithms using Typescript]() course on
egghead.io.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [ReadonlyArray](#readonlyarray)
  - [`sort` mutates arrays](#sort-mutates-arrays)
  - [default `sort` algorithm](#default-sort-algorithm)
  - [`[].sort` Big-O](#sort-big-o)
- [Sorting anagrams](#sorting-anagrams)
- [Palindromes](#palindromes)
- [Bubble sort](#bubble-sort)
- [Quicksort](#quicksort)
- [Insertion sort](#insertion-sort)
- [Merge sort](#merge-sort)
- [Binary search](#binary-search)
- [Find repeated item in array](#find-repeated-item-in-array)
- [Create random integers in a given range](#create-random-integers-in-a-given-range)
- [Stack](#stack)
- [Queue](#queue)
- [Linked List](#linked-list)
- [Doubly-linked list](#doubly-linked-list)
- [Parse string with an integer](#parse-string-with-an-integer)
- [Shuffle an array](#shuffle-an-array)
- [Heap data structure implementation](#heap-data-structure-implementation)
  - [Multiple arrangements](#multiple-arrangements)
  - [Heaps represented by arrays](#heaps-represented-by-arrays)
- [Max items and height in a complete binary tree](#max-items-and-height-in-a-complete-binary-tree)
- [Heapsort algorithm implementation](#heapsort-algorithm-implementation)
- [Minimum and maximum maintenance algorithm implementation](#minimum-and-maximum-maintenance-algorithm-implementation)
- [Median maintenance algorithm implementaton](#median-maintenance-algorithm-implementaton)
- [Maximm contiguous sub-array](#maximm-contiguous-sub-array)
  - [Dynamic programming](#dynamic-programming)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## ReadonlyArray

[01-understand-fizzbuzz-coding-problems-and-solutions.ts](./src/01-understand-fizzbuzz-coding-problems-and-solutions.ts)

### `sort` mutates arrays

`[].sort()` mutates arrays in place.

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

- [02-sort-arrays-in-typescript.ts](./src/02-sort-arrays-in-typescript.ts)
- [03-case-insensitive-sorting-for-string-arrays.ts](./src/03-case-insensitive-sorting-for-string-arrays.ts)

The sorting algorithm is left up to the implementing runtime.

All browsers use an implementation that has a `O(nlogn)` asymptotic run time /
complexity.

## Sorting anagrams

[04-determine-if-two-strings-are-an-anagram.ts](./src/04-determine-if-two-strings-are-an-anagram.ts)

The following implementation has a time complexity of `O(nlogn)` because it uses
`[].sort`:

```typescript
const areAnagrams1: AreAnagrams = (s1, s2) => {
  const [sorted1, sorted2] = [s1, s2]
    .map(s => s.toLocaleLowerCase())
    .map(s => s.split('').sort().join(''))

  return sorted1 === sorted2;
}
```

By using `Map` to count the occurrences of characters, we can improve on our
implementation with a time complexity of `O(n)`, where `n` is the number of
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

Because this uses permutations, it would have a time complexity of `n!`.

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

*Summary:* Sort values in a list by 'bubbling' through the list repeatedly,
swapping values until the entires list is sorted.

- iterate over a list, doing the following for each value:
  - for the current value, iterate over all other items in the list, doing the
      following:
    - if the current item is greater than the value it is being compared
        to, place the compared value before the current value in the array
    - if the current item is less than the compared value, do nothing

Buuble sort is best used when sorting small lists of values.

Bubble sort has time complexity `O(n^2)` since we loop over a nested array.

Bubble sort can be optimised by breaking out of the loop once the list is
sorted.

## Quicksort

[07-quicksort-algorithm.ts](./src/07-quicksort-algorithm.ts)

*Summary:* Sort a list by using a pivot value to recursively partition and sort
each partition.

Quicksort has time complexity `O(nlogn)`. It is called _quick_ because of its low
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

*Summary:* Sort a list by building a sorted list from an unsorted list by
inserting values in order after evaluating the new value against all already
sorted values.

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

which is the time complexity we'd expect from a nested loop.

## Merge sort

[09-merge-sort-algorithm.ts](./src/09-merge-sort-algorithm.ts)

Merge sort has a time complexity of `O(nlogn)` because:

```
T(n) = 2 * T(n / 2) + O(n) ≈ O(nlogn)
[1]        [2]        [3]

[1] - time complexity given an array of length n
[2] - splitting the array in 2, and recursively calling mergeSort on each array
[3] - using merge to run through each value once to sort partitions
```

e.g.:

```
run mergeSort on:
[ 4, 3, 2, 1, 0 ]

merge:
{ left: [ 4, 3 ], right: [ 2, 1, 0 ] }

=================
run mergeSort on:
[ 4, 3 ]

merge:
{ left: [ 4 ], right: [ 3 ] }

merge result:
[ 3, 4 ]

=================
run mergeSort on:
[ 2, 1, 0 ]

merge:
{ left: [ 2 ], right: [ 1, 0 ] }

=================
run mergeSort on:
[ 1, 0 ]

merge:
{ left: [ 1 ], right: [ 0 ] }

merge result:
[ 0, 1 ]

merge result:
[ 0, 1, 2 ]

merge result:
[ 0, 1, 2, 3, 4 ]
[ 0, 1, 2, 3, 4 ]
```

*Summary:* Sort an array by splitting the array in 2, and recursively applying
the same algorithm to each partition to sort each partition, finally merging each
partition using a merge sub-routine which compares and sorts values from each
partitions.

Arrays sorted with merge sort are partitioned until two arrays of length one are
compared, sorted, and returned. The resulting array is a merge of all the arrays
built from sorting the single-item arrays.

## Binary search

[10-binary-search-algorithm.ts](./src/10-binary-search-algorithm.ts)

*Summary:* Find a value in a sorted array by splitting the array in 2,
evaluating the element at the middle, and then performing a new binary search on
the applicable partition of the array if the middle element doesn't match the
element being searched.

Binary search reduces the time complexity of a linear search from `O(n)` to
`O(logn)`.

## Find repeated item in array

[11-find-repeated-item-in-array.ts](./src/11-find-repeated-item-in-array.ts)

*Summary:* Use a `Set` to iterate through an iterable object a maximum number of
times of the length of the iterable to return the first repeated item.

A naive implementation would nest a loop within a loop to evaluate each item
against each other item. This would result in a time complexity of O(n^2).

We can improve on this by using a set to add items if they are not in the set,
or return an item if it is already in the set. Using this strategy we have a
time complexity of O(n).

## Create random integers in a given range

[12-create-random-items-in-given-range.ts](./src/12-create-random-items-in-given-range.ts)

1. generate a random integer between 0 (inclusive) and 1 (exclusive)

    ```javascript
    Math.random();
    ```

2. Generate a random number between 0 (inclusive) and n

    ```javascript
    Math.random() * 100;
    ```

3. Generate an integer between 0 and n

    ```javascript
    Math.floor(Math.random() * n);
    ```

4. Generate an integer between n and m

    ```javascript
    m + Math.floor(Math.random() * (n - m));

    // e.g. between 10 and 90
    10 + Math.floor(Math.random() * (90 - 10));
    ```

## Stack

[13-stack-implementation.ts](./src/13-stack-implementation.ts)

*Summary:* A last-in-first-out (LIFO) structure which allows for adding, removing,
and getting the size of the structure with time complexity `O(1)`

This structure can be modeled using arrays, since the array operations we
require (`push` and `pop`) don't require any evaluation of element order and
have a time complexity of `O(1)`.

## Queue

[14-queue-implementation.ts ](./src/14-queue-implementation.ts )

*Summary:* A Queue is a structure that allows for first-in-first-out operations
on keys, and has a time complexity of `O(1)` for key operators. A Queue
implements a `enqueue` method for adding items to the end of the queue, a
`dequeue` method for removing items from the beginning of the queue, and a
`size` method for getting the number of items in the queue.

In a naive implementation, one may be tempted to model queue on Javascript's
`Array`. This will result in an invalid implementation, as in order to remove
the first item in the array `[].shift` is required. Using `[].shift` will
require all elements in the array to have their indices updated, resulting in a
time complexity of `O(n)`.

Instead, a map can be used with an index for the key, and items can be added and
removed to the queue using these indices as reference, updating and referencing
an internal state of the position in the queue where items are to be added, and
where items should be removed from.

## Linked List

[15-singly-linked-list-implementation.ts](./src/15-singly-linked-list-implementation.ts)

*Summary:* A linked list is a structure where each node points to the following
node, and items can be added, dequeued in a FIFO strategy, and read from the linked
list with time complexity `O(1)`.

Every implementation of a linked list begins with a definition of a node. The
first node in a singly linked list is the head, while the most recently added
node is the tail.

Any operation that only requires a constant number of next value manipulations
can always be implemented with time complexity O(1)

## Doubly-linked list

[16-doubly-linked-list-implementation.ts](./src/16-doubly-linked-list-implementation.ts)

*Summary*: A doubly-linked list is a linked list with the additional property
that each node has a reference to both the subsequent and previous item. This
allows for items to be popped off of the end of the list, in addition to being
dequeued from the front of the list.

To create a doubly-linked list with node operations of time complexity `O(1)`
one can create a `pop` method on the list that replaces the tail with the
previous value.

Because the next and previous values are constant, we can implement linked lists
and doubly linked lists with time complexity of `O(1)`.

## Parse string with an integer

[17-parse-a-string-to-an-integer.ts](./src/17-parse-a-string-to-an-integer.ts)

*Summary:* This is a common question in code interviews, and is useful in
demonstrating an understanding of digits being powers of 10, and that code
points can be used to determine relations between characters without referring
to the characters specifically.

Javascript's `parseInt` only parses strings that begin with a digit, otherwise
it returns `NaN`.

- Code points are the numeric representations of characters
- Code points can be thought of as id's in a database for every character
- Each character's code point can be obtained using `String.prototype.charCodeAt`
- By obtaining the code point for 0, we can determine whether any other
    character is a numeric digit or not be evaluating the difference of the two
    code points.

## Shuffle an array

[18-shuffle-an-array.ts](./src/18-shuffle-an-array.ts)

*Summary:* Shuffling an array requires implementing a function that has the
property that for every item in the original array (of length n), each item has
a 1/n probability of being at any position in the shuffled array. Using the
Fisher-Yates algorithm, we can achieve a time complexity of `O(n)`.

We will implement the Fisher-Yates shuffle:

```
a b c d e

c
[1]
c a
[2]
c a d
 [3]
c a d e
  [4]
c a d e b
   [5]

[1] - pick an item at random, and place it in position 0
    - for an item to be at position 0:
      => 1/n probability
[2] - pick any of the remaining items, and place it at position 1
    - for an item to be at position 1:
      => (n-1)/n * 1/(n-1) = prob. of not making it into pos 0, times prob. of
      making it into position 1
      = 1/n
[3] - for an item to be at position 2:
      => (n-1)/n * (n - 2)/(n-1) * 1/(n - 2)
      = 1/n
...
[x] - 1/n
```

- loop over every item in the array
- randomly select an index for an item from the current index until the the end of
    the array
- swap the value at the current loop index position with the value at the
    randomly selected index position

## Heap data structure implementation

[19-heap-data-structure-implementation.ts](./src/19-heap-data-structure-implementation.ts)

It's useful having a mental model of a heap as a binary tree:

```
        A
      /   \
    B      C
  /   \
 D     E
```

The tree would satisfy the heap property if the value of every node is less than
its children:

```
A < B
A < C
B < D
B < E
```

Subsequently, any descendants of a node will satisfy the same property.

This proprety implies that smallest element in the tree has to be the root node.
This is what defines the heap property.

Because in this instance we are working with a complete binary tree, the maximum
number of levels in the tree will be `logn`, where `n` is the number of items in
the tree.

### Multiple arrangements

An array of values can be represented in multiple ways to satisfy the heap
property:

```
4,4,5,6,9

        4
      /   \
    5      4
  /   \
 6     9


        4
      /   \
    4      5
  /   \
 9     6
```

The only value guaranteed for different variations of a heap is the root node;
i.e. the smallest value.

### Heaps represented by arrays

```
# given an array of indices
[] = 0,1,2,3,4,5,6,7,8,9,10,11,12,13

# conceptualised as a tree:

                  0
                /   \
              /       \
            /           \
          /               \
         1                 2
       /   \             /   \
      /     \           /     \
     3       4         5       6
   /  \     /  \     /   \    /
  7    8   9    10  11   12  13
```

Given a node at index `n`, how can we generically determine the value of it's
left child node?

```
# left values of child node at indexes:
left(0) = 1
left(1) = 3
left(3) = 7

# from this we can see that to get the left child node of the current node, we
# need to skip (n + 1) spaces to the right
left(n) -> self + n items to the right + 1

left(n) = n + n + 1 = 2n + 1

left(0) = 2 * 0 + 1 = 1
left(1) = 2 * 1 + 1 = 3
left(3) = 2 * 3 + 1 = 7

# the right child node is 1 index further than the left child node
right(n) = 2n + 2

# so we have
left(n) = 2n + 1
right(n) = 2n + 2

# now that we have left and right child nodes, we can traverse the tree in the
# opposite direction to find parent nodes:
parentLeft(n) = (n - 1) / 2
parentRight(n) = (n - 2) / 2

2n + 1 => always odd
2n + 2 => always even

parent(n) =>
  n is even => (n - 2) / 2
       else => (n - 1) / 2
```

## Max items and height in a complete binary tree

[20-max-items-and-height-complete-binary-tree.ts](./src/20-max-items-and-height-complete-binary-tree.ts)

*Summary:* A complete binary tree is a tree that new levels are only filled once
all previous levels are filled.

```
                  O
                /   \
              /       \
            /           \
          /               \
         O                 O
       /   \             /   \
      /     \           /     \
     O       O         O       O
    / \     / \       / \     / \
   O   O   O   O     O   O   O   O
```

The number of items at any given level can be determined as a power of 2:

```
level 0: 2^0 = 1
level 1: 2^1 = 2
level 2: 2^2 = 4
level 3: 2^3 = 8
...
level n: 2^n

total nodes = 2^0 + 2^1 + ... + 2^n
```

We could use a divergent geometric series to find the total number of nodes:

```javascript
const n = 3;
let total = 0;

for (let i = 0; i <= n; i++) {
  total += 2 ** (n);
}

// => total === 15
```

This can also be visualised using a table:

```
| height of tree | level | num items in level | total |
| 1              | 0     | 1 (+1 lie)         | 2     |
| 2              | 1     | 2                  | 4     |
| 3              | 2     | 4                  | 8     |
| 4              | 3     | 8                  | 16    |
```

For the 0th node, we add a phantom additional item to the level so that every
level total can be calculated by multiplying the previous level's total by two.

This gives us the following (accounting for the additional item by subtracting 1
from the total):

```
2 * (2 ^ level) - 1
=> 2 ^ (level + 1) - 1
=> 2 ^ h - 1
```

## Heapsort algorithm implementation

[21-heapsort-algorithm-implementation.ts](./src/21-heapsort-algorithm-implementation.ts)

*Summary:* Sort an array using a heap and a comparison function. The resulting
time complexity is `O(nlogn)`.

Task: sort the following in ascending order:

```
9 4 2 7 5 3
```

Using the compare function of a heap, we know that we can create a heap of
ascending / descending items.

We need to:

1. create a heap with a compare function that will ensure added items are added
   in ascending order
2. add all the numbers to the heap
3. extract the root of the heap until the heap is empty

Heapsort provides the best performance for sorting using a comparison.

## Minimum and maximum maintenance algorithm implementation

[22-minimum-and-maximum-maintenance-algorithm-implementation.ts](./src/22-minimum-and-maximum-maintenance-algorithm-implementation.ts)

*Summary:* Given values over time, extract the minimum / maximum number from the
set. This can be implemented by using a heap, since a heap keeps items in order.
The resulting time complexity of using a heap to perform this work is `O(nlogn)`

## Median maintenance algorithm implementaton

[23-median-maintenance-algorithm-implementation.ts](./src/23-median-maintenance-algorithm-implementation.ts)

*Summary:*

1. sort the list
2. if the list is odd in length, the middle value is the median
3. if the list is even in length, find the average of the two middle values

The median maintenance problem is also called the continuous median problem. The
median of the list needs to be maintained continuously as new items are added to
the list:

```
4
# => 4

4 6
# => 5

4 6 3
# => 4

...
```

A naive implementation would simply loop over an array, resulting in a time
complexity of `O(n)`.

We can improve on this by splitting the items internally using twp Heaps. One
heap will maintain a list of the small values up until halfway, and the other
Heap will maintain a list of the large values from halfway.

By using two Heaps, we can simply extract the root of the max heap, or pop the
end of the minimum heap, while always adding items with a time complexity of
`O(logn)`.

If either heap is larger than the other, then we return respsective value from
that heap. Otherwise, the root and tail of the respective Heaps can be averaged.

## Maximm contiguous sub-array

[24-maximum-contiguous-sub-array.ts](./src/24-maximum-contiguous-sub-array.ts)

*Summary:* Given an array of numbers, return the sub array that has the largest
contiguous sum. A naive solution can be implemented with nested loops, resulting
in a time complexity of `O(n^2)`, but by evaluating the properties of sub-arrays
and tracking indices, we need only pass over the array once, resulting in a time
complexity of `O(n)`.

```
[-2, 1, -3, 4, -1, 2, 1, -5, 4]
          [4, -1, 2, 1]
          => with a sum of 6
```

A naive solution could use a nested for loop, tracking every start index with
every end index:

```
for (evert start index) {
  for (every end index > start index) {
    evaluateIfMaxSum(start index, end index)
  }
}
```

We can improve on this by making two observations:

*Observation 1*

For the maximum sum for any sub array in the range from `0` to `i` when the element
at `i` must be included

- `maxSumIncluding(i) = maxSumIncluding(i - 1) + val(i)`
- We can improve on the above by eliminating the sum before the current value if
    it's less than 0:

  ```
    maxSumIncluding(i) = maxSumIncluding(i - 1) < 0
      ? val(i)
      : maxSumIncluding(i - 1) + val(i)
  ```

*Observation 2*

For the max sum from `0` to `i`, regardless of whether `i` is included or not:

```
maxSum(i) = maxSumIncluding(i) > maxSum(i - 1) ? maxSumIncluding(i) : maxSum(i - 1)
```

Combining these two observations, we have:

- `maxSumIncluding(i) = maxSumIncluding(i - 1) > 0 ? maxSumIncluding(i - 1) + val(i)` : val(i)``
- `maxSum(i) = maxSumIncluding(i) > maxSum(i - 1) ? maxSumIncluding(i) : maxSum(i - 1)`

We have the answer for `maxSum(i)` when:

`maxSumIncluding(i - 1) == maxSum(i - 1)`

### Dynamic programming

The answer up until `i` depends only on values earlier in the array.

When a pre-solved solution to a subset of the problem is provided the
problem-solving approach is dynamic programming.

The optimal answer at `i` depends on optimal answers for `i - k` where `k` is
some constant. The problem is then said to have an optimal sub-structure.

Dynamic programming problems can be solved with a table:

```
o1: maxSumIncluding(i) = maxSumIncluding(i - 1) > 0
      ? maxSumIncluding(i - 1) + val(i)
      : val(i)
o2: maxSum(i) = maxSumIncluding(i) > maxSum(i - 1)
      ? maxSumIncluding(i)
      : maxSum(i - 1)

[-2, 1, -3, 4, -1, 2, 1, -5, 4]

| Step | Element | maxSumIncluding | maxSum |
| [1]  | -2      | -2              | -2     |
| [2]  | 1       | 1               | 1      |
| [3]  | -3      | -2              | 1      |
| [4]  | 4       | 4               | 4      |
| [5]  | -1      | 3               | 4      |
| [6]  | 2       | 5               | 5      |
| [7]  | 1       | 6               | 6      |
| [8]  | -5      | -1              | 6      |
| [9]  | 4       | 5               | 6      |

[1] - o1: false => -2, o2: true  => -2
[2] - o1: false => 1,  o2: true  => 1
[3] - o1: true  => -2, o2: false => 1
[4] - o1: false => 4,  o2: true  => 4
[5] - o1: true  => 3,  o2: false => 4
[6] - o1: true  => 5,  o2: true  => 5
[7] - o1: true  => 6,  o2: true  => 6
[8] - o1: true  => 1,  o2: false => 6
[9] - o1: false => 3,  o2: true  => 6
```

- The max sum of a contiguous sub-array is the `maxSum` value in the last row, i.e. 6 for this array.
- The start index of the max sub-array changes whenever `val(i) === maxSum(i)`
- The end index of the max sub-array changes when `maxSumIncluding(i) === maxSum(i)`

Thus, we can track the `maxStartIndex` and `maxEndIndex`.

Another feature of dynamic programming problems is that one usually favours iteration
over recursion.
