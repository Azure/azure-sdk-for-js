// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import { hashObject } from "../../utils/hashObject.js";
import { processDistinctQueryAndUpdateRangeMap } from "../PartitionRangeUtils.js";

/**
 * Creates a transform that deduplicates items using ordered comparison.
 * Consecutive items with the same hash are collapsed to a single item.
 * Mirrors OrderedDistinctEndpointComponent.fetchMore().
 * @internal
 */
export function createOrderedDistinctTransform(
  initialHashedLastResult?: string,
): PipelineTransform {
  let hashedLastResult: string | undefined = initialHashedLastResult;

  return async function* orderedDistinctTransform(source) {
    for await (const page of source) {
      if (page.items.length === 0) {
        yield page;
        continue;
      }

      const buffer: unknown[] = [];
      for (const item of page.items) {
        if (item) {
          const hashedResult = await hashObject(item);
          if (hashedResult !== hashedLastResult) {
            buffer.push(item);
            hashedLastResult = hashedResult;
          }
        }
      }

      const updatedPartitionKeyRangeMap = await processDistinctQueryAndUpdateRangeMap(
        page.items as any[],
        page.partitionKeyRangeMap,
        hashObject,
      );

      yield {
        ...page,
        items: buffer,
        partitionKeyRangeMap: updatedPartitionKeyRangeMap,
      };
    }
  };
}
