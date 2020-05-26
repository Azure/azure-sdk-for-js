// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalyticsError } from "./generated/models";

import { logger } from "./logger";
import { RestError } from "@azure/core-http";

export interface IdObject {
  id: string;
}

function isGenericError(o: IdObject): o is IdObject & { error: TextAnalyticsError } {
  return o.id === "";
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
 *
 * If a generic error (id = "") occurred in the response, this function will throw it
 * as an exception.
 *
 * @ignore
 * @param sortedArray An array of entries sorted by `id`
 * @param unsortedArray An array of entries that contain `id` but are not sorted
 */
export function sortResponseIdObjects<T extends IdObject, U extends IdObject>(
  sortedArray: T[],
  unsortedArray: U[]
): U[] {
  const unsortedMap = new Map<string, U>();
  for (const item of unsortedArray) {
    if (isGenericError(item)) {
      throw new RestError(item.error.message, item.error.code, 400);
    }
    unsortedMap.set(item.id, item);
  }

  if (unsortedArray.length !== sortedArray.length) {
    const ordinal = unsortedArray.length > sortedArray.length ? "more" : "fewer";
    logger.warning(
      `The service returned ${ordinal} responses than inputs. Some errors may be treated as fatal.`
    );
  }

  return sortedArray.map((item) => unsortedMap.get(item.id)!);
}
