// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineTransform } from "../PipelineTransform.js";
import type { QueryInfo } from "../../request/ErrorResponse.js";
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
 * Creates a buffering transform that groups items by GROUP BY keys and applies aggregators.
 * Yields empty-items pages during accumulation to propagate headers, then yields the
 * final aggregated results page when the source is exhausted.
 * Mirrors GroupByEndpointComponent.fetchMore().
 * @internal
 */
export function createGroupByTransform(queryInfo: QueryInfo): PipelineTransform {
  return async function* groupByTransform(source) {
    const groupings = new Map<string, Map<string, Aggregator>>();
    const aggregateHeaders = getInitialHeader();

    for await (const page of source) {
      mergeHeaders(aggregateHeaders, page.headers);

      if (page.items.length === 0) {
        continue;
      }

      const dataToProcess = page.items as GroupByResult[];

      for (const item of dataToProcess) {
        if (item) {
          const group = item.groupByItems ? await hashObject(item.groupByItems) : emptyGroup;
          const aggregators = groupings.get(group);
          const payload = item.payload;
          if (aggregators) {
            for (const key of Object.keys(payload)) {
              const effectiveGroupByValue = payload[key]
                ? payload[key]
                : new Map().set("item2", null);
              const aggregateResult = extractAggregateResult(effectiveGroupByValue);
              aggregators.get(key)!.aggregate(aggregateResult);
            }
          } else {
            const grouping = new Map<string, Aggregator>();
            groupings.set(group, grouping);
            for (const key of Object.keys(payload)) {
              const aggregateType = queryInfo.groupByAliasToAggregateType[key];
              const aggregator = createAggregator(aggregateType);
              grouping.set(key, aggregator);
              if (aggregateType) {
                const aggregateResult = extractAggregateResult(payload[key]);
                aggregator.aggregate(aggregateResult);
              } else {
                aggregator.aggregate(payload[key]);
              }
            }
          }
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

    // Consolidate all groupings into final result
    const aggregateResultArray: any[] = [];
    for (const grouping of groupings.values()) {
      const groupResult: any = {};
      for (const [aggregateKey, aggregator] of grouping.entries()) {
        groupResult[aggregateKey] = aggregator.getResult();
      }
      aggregateResultArray.push(groupResult);
    }

    yield {
      items: aggregateResultArray,
      headers: aggregateHeaders,
      partitionKeyRangeMap: new Map(),
      hasMore: false,
    };
  };
}
