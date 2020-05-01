// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalyticsError } from "./generated/models";

import { logger } from "./logger";

export interface IdObject {
  id: string;
}

function isGenericError(o: IdObject): o is IdObject & { error: TextAnalyticsError } {
  return o.id === "";
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
  const unsortedMap = new Map<string, U>();
  for (const item of unsortedArray) {
    if (isGenericError(item)) {
      // This item is a generic error, so we will throw it
      throw item.error;
    }
    unsortedMap.set(item.id, item);
  }

  if (unsortedArray.length !== sortedArray.length) {
    const ordinal = unsortedArray.length > sortedArray.length ? "more" : "fewer";
    logger.warning(
      `The service returned ${ordinal} responses than inputs. Some errors may be treated as fatal. Proceeding.`
    );
  }

  return sortedArray.map((item) => unsortedMap.get(item.id)!);
}
