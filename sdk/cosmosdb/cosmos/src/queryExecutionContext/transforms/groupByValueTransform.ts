// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import type { AggregateType, QueryInfo } from "../../request/ErrorResponse.js";
import { hashObject } from "../../utils/hashObject.js";
import type { Aggregator } from "../Aggregators/index.js";
import { createAggregator } from "../Aggregators/index.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import { emptyGroup, extractAggregateResult } from "../EndpointComponent/emptyGroup.js";

interface GroupByResult {
  groupByItems: any[];
  payload: any;
}

/**
 * Creates a buffering transform for GROUP BY VALUE queries.
 * Uses a single aggregator per group (not a map of aggregators).
 * Mirrors GroupByValueEndpointComponent.fetchMore().
 * @internal
 */
export function createGroupByValueTransform(queryInfo: QueryInfo): PipelineTransform {
  return async function* groupByValueTransform(source) {
    const aggregators = new Map<string, Aggregator>();
    const aggregateHeaders = getInitialHeader();
    const aggregateType: AggregateType = queryInfo.aggregates?.[0];
    let completed = false;

    for await (const page of source) {
      if (completed) {
        break;
      }
      mergeHeaders(aggregateHeaders, page.headers);

      if (page.items.length === 0) {
        continue;
      }

      const dataToProcess = page.items as GroupByResult[];

      for (const item of dataToProcess) {
        if (item) {
          let grouping: string = emptyGroup;
          let payload: any = item;
          if (item.groupByItems) {
            payload = item.payload;
            grouping = await hashObject(item.groupByItems);
          }

          const aggregator = aggregators.get(grouping);
          if (!aggregator) {
            aggregators.set(grouping, createAggregator(aggregateType));
          }

          if (aggregateType) {
            const aggregateResult = extractAggregateResult(payload[0]);
            if (aggregateResult === null) {
              completed = true;
            }
            aggregators.get(grouping)!.aggregate(aggregateResult);
          } else {
            aggregators.get(grouping)!.aggregate(payload);
          }
        }
      }

      if (completed) {
        // Short-circuit: yield empty page
        yield {
          items: [],
          headers: aggregateHeaders,
          partitionKeyRangeMap: new Map(),
          hasMore: false,
        };
        return;
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

    // Consolidate all aggregators into final result
    const aggregateResultArray: any[] = [];
    for (const aggregator of aggregators.values()) {
      const result = aggregator.getResult();
      if (result !== undefined) {
        aggregateResultArray.push(result);
      }
    }

    yield {
      items: aggregateResultArray,
      headers: aggregateHeaders,
      partitionKeyRangeMap: new Map(),
      hasMore: false,
    };
  };
}
