// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { CosmosHeaders } from "../CosmosHeaders.js";
import type { QueryInfo } from "../../request/ErrorResponse.js";
import { hashObject } from "../../utils/hashObject.js";
import type { Aggregator } from "../Aggregators/index.js";
import { createAggregator } from "../Aggregators/index.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import { emptyGroup, extractAggregateResult } from "./emptyGroup.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { QueryRangeMapping } from "../QueryRangeMapping.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

interface GroupByResult {
  groupByItems: any[];
  payload: any;
}

/** @hidden */
export class GroupByEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private queryInfo: QueryInfo,
  ) {}

  private readonly groupings: Map<string, Map<string, Aggregator>> = new Map();
  private readonly aggregateResultArray: any[] = [];
  private completed: boolean = false;

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    if (this.completed) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }
    const aggregateHeaders = getInitialHeader();
    const response = await this.executionContext.fetchMore(diagnosticNode);
    mergeHeaders(aggregateHeaders, response.headers);

    if (
      response === undefined ||
      response.result === undefined ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      // If there are any groupings, consolidate and return them
      if (this.groupings.size > 0) {
        return this.consolidateGroupResults(aggregateHeaders);
      }
      return { result: undefined, headers: aggregateHeaders };
    }

    const parallelResult = response.result as ParallelQueryResult;
    const dataToProcess: GroupByResult[] = parallelResult.buffer as GroupByResult[];

    // Process GROUP BY aggregation logic
    for (const item of dataToProcess) {
      // If it exists, process it via aggregators
      if (item) {
        const group = item.groupByItems ? await hashObject(item.groupByItems) : emptyGroup;
        const aggregators = this.groupings.get(group);
        const payload = item.payload;
        if (aggregators) {
          // Iterator over all results in the payload
          for (const key of Object.keys(payload)) {
            // in case the value of a group is null make sure we create a dummy payload with item2==null
            const effectiveGroupByValue = payload[key]
              ? payload[key]
              : new Map().set("item2", null);
            const aggregateResult = extractAggregateResult(effectiveGroupByValue);
            aggregators.get(key).aggregate(aggregateResult);
          }
        } else {
          // This is the first time we have seen a grouping. Setup the initial result without aggregate values
          const grouping = new Map();
          this.groupings.set(group, grouping);
          // Iterator over all results in the payload
          for (const key of Object.keys(payload)) {
            const aggregateType = this.queryInfo.groupByAliasToAggregateType[key];
            // Create a new aggregator for this specific aggregate field
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

    if (this.executionContext.hasMoreResults()) {
      // Return empty buffer but preserve the structure and pass-through fields
      const result = createParallelQueryResult(
        [], // empty buffer
        new Map()
      );

      return { result, headers: aggregateHeaders };
    } else {
      return this.consolidateGroupResults(
        aggregateHeaders
      );
    }
  }

  private consolidateGroupResults(
    aggregateHeaders: CosmosHeaders,
  ): Response<any> {
    for (const grouping of this.groupings.values()) {
      const groupResult: any = {};
      for (const [aggregateKey, aggregator] of grouping.entries()) {
        groupResult[aggregateKey] = aggregator.getResult();
      }
      this.aggregateResultArray.push(groupResult);
    }
    this.completed = true;

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      this.aggregateResultArray,
      new Map(),
      );

    return { result, headers: aggregateHeaders };
  }
}
