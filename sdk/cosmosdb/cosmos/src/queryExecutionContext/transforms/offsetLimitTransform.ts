// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import { calculateOffsetLimitForPartitionRanges } from "../PartitionRangeUtils.js";

/**
 * Creates a transform that skips the first `offset` items then takes the next `limit` items.
 * Mirrors OffsetLimitEndpointComponent.fetchMore().
 * @internal
 */
export function createOffsetLimitTransform(offset: number, limit: number): PipelineTransform {
  let currentOffset = offset;
  let currentLimit = limit;

  return async function* offsetLimitTransform(source) {
    for await (const page of source) {
      if (currentLimit <= 0) {
        return;
      }
      if (page.items.length === 0) {
        yield page;
        continue;
      }

      const initialOffset = currentOffset;
      const initialLimit = currentLimit;
      const buffer: unknown[] = [];
      const filteredOrderByItems: any[] = [];
      let itemIndex = 0;

      for (const item of page.items) {
        if (currentOffset > 0) {
          currentOffset--;
        } else if (currentLimit > 0) {
          buffer.push(item);
          if (page.orderByItems && itemIndex < page.orderByItems.length) {
            filteredOrderByItems.push(page.orderByItems[itemIndex]);
          }
          currentLimit--;
        }
        itemIndex++;
      }

      const updatedPartitionKeyRangeMap = calculateOffsetLimitForPartitionRanges(
        page.partitionKeyRangeMap,
        initialOffset,
        initialLimit,
      );

      yield {
        ...page,
        items: buffer,
        partitionKeyRangeMap: updatedPartitionKeyRangeMap,
        orderByItems: filteredOrderByItems.length > 0 ? filteredOrderByItems : undefined,
        hasMore: currentLimit > 0 && page.hasMore,
      };

      if (currentLimit <= 0) {
        return;
      }
    }
  };
}
