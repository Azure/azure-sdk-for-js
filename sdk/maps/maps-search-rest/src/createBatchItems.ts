// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BatchRequestItem } from "./generated";

/**
 * Create batch items for the batch request.
 *
 * @param requests - The list of queries to process.
 * @returns - The BatchRequestItem object.
 */
export function createBatchItems<T extends Record<string, any>>(
  requests: Array<T>
): Array<BatchRequestItem> {
  return requests.map((r) => ({
    query: Object.entries(r)
      .map(([k, v]) => `${k}=${v}`)
      .join("&"),
  }));
}
