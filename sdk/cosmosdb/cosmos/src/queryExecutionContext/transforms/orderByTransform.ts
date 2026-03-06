// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import type { OrderByItemWithRid } from "../parallelQueryResult.js";

/**
 * Creates a transform that extracts ORDER BY payloads from each item.
 * Mirrors OrderByEndpointComponent.fetchMore().
 * @param emitRawOrderByPayload - If true, pushes the whole item; otherwise pushes item.payload
 * @internal
 */
export function createOrderByTransform(emitRawOrderByPayload: boolean): PipelineTransform {
  return async function* orderByTransform(source) {
    for await (const page of source) {
      if (page.items.length === 0) {
        yield page;
        continue;
      }
      const items: unknown[] = [];
      const orderByItemsArray: OrderByItemWithRid[] = [];
      for (const item of page.items) {
        const typedItem = item as any;
        if (emitRawOrderByPayload) {
          items.push(typedItem);
        } else {
          items.push(typedItem.payload);
        }
        orderByItemsArray.push({
          orderByItems: typedItem.orderByItems,
          _rid: typedItem._rid,
        });
      }
      yield { ...page, items, orderByItems: orderByItemsArray };
    }
  };
}
