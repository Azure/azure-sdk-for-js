// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import type { NonStreamingOrderByResult } from "../nonStreamingOrderByResult.js";
import { OrderByComparator } from "../orderByComparator.js";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";

/**
 * Creates a buffering transform for non-streaming ORDER BY queries.
 * Enqueues all items into a FixedSizePriorityQueue, then reverses, skips offset items,
 * and drains the rest as the final result page.
 * Mirrors NonStreamingOrderByEndpointComponent.fetchMore().
 * @internal
 */
export function createNonStreamingOrderByTransform(
  sortOrders: any[],
  priorityQueueBufferSize: number,
  offset: number = 0,
  emitRawOrderByPayload: boolean = false,
): PipelineTransform {
  return async function* nonStreamingOrderByTransform(source) {
    if (priorityQueueBufferSize <= 0) {
      return;
    }

    const comparator = new OrderByComparator(sortOrders);
    let pq = new FixedSizePriorityQueue<NonStreamingOrderByResult>(
      (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
        return comparator.compareItems(b, a);
      },
      priorityQueueBufferSize,
    );

    const aggregateHeaders = getInitialHeader();

    for await (const page of source) {
      mergeHeaders(aggregateHeaders, page.headers);

      if (page.items.length === 0) {
        continue;
      }

      const dataToProcess = page.items as NonStreamingOrderByResult[];
      for (const item of dataToProcess) {
        if (item !== undefined) {
          pq.enqueue(item);
        }
      }

      // Yield empty page to propagate headers while still buffering
      if (page.hasMore) {
        yield {
          ...page,
          items: [],
          partitionKeyRangeMap: new Map(),
          hasMore: true,
        };
      }
    }

    // Reverse the priority queue to get results in the correct order
    pq = pq.reverse();

    // Skip offset items
    let remainingOffset = offset;
    while (
      remainingOffset < priorityQueueBufferSize &&
      remainingOffset > 0 &&
      !pq.isEmpty()
    ) {
      pq.dequeue();
      remainingOffset--;
    }

    // Drain the rest into the final buffer
    const buffer: unknown[] = [];
    if (emitRawOrderByPayload) {
      while (!pq.isEmpty()) {
        buffer.push(pq.dequeue());
      }
    } else {
      while (!pq.isEmpty()) {
        buffer.push(pq.dequeue()?.payload);
      }
    }

    if (buffer.length > 0) {
      yield {
        items: buffer,
        headers: aggregateHeaders,
        partitionKeyRangeMap: new Map(),
        hasMore: false,
      };
    }
  };
}
