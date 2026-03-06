// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import type { QueryInfo } from "../../request/ErrorResponse.js";
import type { NonStreamingOrderByResult } from "../nonStreamingOrderByResult.js";
import { OrderByComparator } from "../orderByComparator.js";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue.js";
import { NonStreamingOrderByMap } from "../../utils/nonStreamingOrderByMap.js";
import { hashObject } from "../../utils/hashObject.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";

/**
 * Creates a buffering transform for non-streaming ORDER BY DISTINCT queries.
 * Uses a NonStreamingOrderByMap for deduplication, then enqueues into a priority queue,
 * and drains sorted distinct results.
 * Mirrors NonStreamingOrderByDistinctEndpointComponent.fetchMore().
 * @internal
 */
export function createNonStreamingOrderByDistinctTransform(
  queryInfo: QueryInfo,
  priorityQueueBufferSize: number,
  emitRawOrderByPayload: boolean = false,
): PipelineTransform {
  return async function* nonStreamingOrderByDistinctTransform(source) {
    if (priorityQueueBufferSize <= 0) {
      return;
    }

    const sortOrders = queryInfo.orderBy || [];
    const comparator = new OrderByComparator(sortOrders);

    const aggregateMap = new NonStreamingOrderByMap<NonStreamingOrderByResult>(
      (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
        return comparator.compareItems(a, b);
      },
    );

    const pq = new FixedSizePriorityQueue<NonStreamingOrderByResult>(
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
        if (item) {
          const key = await hashObject(item?.payload);
          aggregateMap.set(key, item);
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

    // Move all distinct values into the priority queue
    const allValues = aggregateMap.getAllValuesAndReset();
    for (const value of allValues) {
      pq.enqueue(value);
    }

    // Compute final result array respecting offset
    const queryOffset = queryInfo.offset ?? 0;
    const queueSize = pq.size();
    const finalArraySize = queueSize - queryOffset;

    if (finalArraySize <= 0) {
      yield {
        items: [],
        headers: aggregateHeaders,
        partitionKeyRangeMap: new Map(),
        hasMore: false,
      };
      return;
    }

    const finalResultArray = new Array(finalArraySize);
    for (let count = finalArraySize - 1; count >= 0; count--) {
      if (emitRawOrderByPayload) {
        finalResultArray[count] = pq.dequeue();
      } else {
        finalResultArray[count] = pq.dequeue()?.payload;
      }
    }

    yield {
      items: finalResultArray,
      headers: aggregateHeaders,
      partitionKeyRangeMap: new Map(),
      hasMore: false,
    };
  };
}
