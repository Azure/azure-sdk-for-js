// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 * @param sortedArray An array of entries sorted by a particular `sortKey`
 * @param unsortedArray An array of entries that contain `sortKey` but are not sorted
 * @param sortKey The object property to sort on, should be 1:1 with each array entry
 */
export function sortByPreviousOrder<T, K extends keyof T>(
  sortedArray: T[],
  unsortedArray: T[],
  sortKey: K
): T[] {
  if (sortedArray.length !== unsortedArray.length) {
    throw new Error("Can't use this sort unless you have two arrays with the same length!");
  }

  const unsortedMap = new Map<T[K], T>();
  for (const item of unsortedArray) {
    unsortedMap.set(item[sortKey], item);
  }

  return sortedArray.map((item) => unsortedMap.get(item[sortKey])!);
}
