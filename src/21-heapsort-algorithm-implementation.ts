import {CompareFn, Heap} from './19-heap-data-structure-implementation';

/**
 * heapSort
 *
 * Sort an array of numbers using a heap
 *
 * @param {number[])} xs
 * @returns {number[] =>}
 */
const heapSort = (xs: number[], compareFn: CompareFn<number>): number[] => {
  const heap = new Heap<number>(compareFn);
  let sortedXs: number[] = [];

  /*
   * The loop has time complexity O(n)
   * Adding items to the heap has time cimplexity O(logn)
   *
   * The time complexity of this statement, is thus O(nlogn)
   */
  for (const item of xs) {
    heap.add(item);
  }

  /*
   * Looping over the size of the heap has time complexity O(n)
   * Extracting the root of the heap has time complexity O(logn) because of the
   * mechanism used to sort the heap after extracting the root
   *
   * The time complexity of this statement, is thus O(nlogn)
   */
  while (heap.size() > 0) {
    sortedXs.push(heap.extractRoot());
  }

  return sortedXs;
};

const xsToSort = [9, 4, 2, 7, 5, 3];
const sortAscending: CompareFn<number> = (a, b) => (a - b > 0 ? 1 : -1);
const sortedXs = heapSort(xsToSort, sortAscending);

console.log(sortedXs);

export {heapSort};
