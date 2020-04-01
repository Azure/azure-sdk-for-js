// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface IdObject {
  id: string;
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 * @ignore
 * @param sortedArray An array of entries sorted by `id`
 * @param unsortedArray An array of entries that contain `id` but are not sorted
 */
export function sortByPreviousIdOrder<T extends IdObject, U extends IdObject>(
  sortedArray: T[],
  unsortedArray: U[]
): U[] {
  if (sortedArray.length !== unsortedArray.length) {
    throw new Error("Can't use this sort unless you have two arrays with the same length!");
  }

  const unsortedMap = new Map<string, U>();
  for (const item of unsortedArray) {
    unsortedMap.set(item.id, item);
  }

  return sortedArray.map((item) => unsortedMap.get(item.id)!);
}
