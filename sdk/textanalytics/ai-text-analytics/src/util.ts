// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logger } from "./logger";

export interface IdObject {
  id: string;
}

/**
 * Given a sorted array of input objects (with a unique ID) and an unsorted array of results,
 * return a sorted array of results.
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

export interface OpinionIndex {
  document: number;
  sentence: number;
  opinion: number;
}

export function findOpinionIndex(pointer: string): OpinionIndex {
  const regex = new RegExp(/#\/documents\/(\d+)\/sentences\/(\d+)\/opinions\/(\d+)/);
  const res = regex.exec(pointer);
  if (res !== null) {
    const opinionIndex: OpinionIndex = {
      document: parseInt(res[1]),
      sentence: parseInt(res[2]),
      opinion: parseInt(res[3])
    };
    return opinionIndex;
  } else {
    throw new Error(`Pointer "${pointer}" is not a valid opinion pointer`);
  }
}
