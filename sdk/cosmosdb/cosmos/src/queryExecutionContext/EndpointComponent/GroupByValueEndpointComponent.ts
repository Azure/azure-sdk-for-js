// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { CosmosHeaders } from "../CosmosHeaders.js";
import type { AggregateType, QueryInfo } from "../../request/ErrorResponse.js";
import { hashObject } from "../../utils/hashObject.js";
import type { Aggregator } from "../Aggregators/index.js";
import { createAggregator } from "../Aggregators/index.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import { emptyGroup, extractAggregateResult } from "./emptyGroup.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { ParallelQueryResult } from "../parallelQueryResult.js";
import { createParallelQueryResult } from "../parallelQueryResult.js";

interface GroupByResult {
  groupByItems: any[];
  payload: any;
}

/** @hidden */
export class GroupByValueEndpointComponent implements ExecutionContext {
  private readonly aggregators: Map<string, Aggregator> = new Map();
  private readonly aggregateResultArray: any[] = [];
  private aggregateType: AggregateType;
  private completed: boolean = false;

  constructor(
    private executionContext: ExecutionContext,
    private queryInfo: QueryInfo,
  ) {
    // VALUE queries will only every have a single grouping
    this.aggregateType = this.queryInfo.aggregates[0];
  }

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
      if (this.aggregators.size > 0) {
        return this.generateAggregateResponse(aggregateHeaders);
      }
      return { result: undefined, headers: aggregateHeaders };
    }

    const parallelResult = response.result as ParallelQueryResult;
    const dataToProcess: GroupByResult[] = parallelResult.buffer as GroupByResult[];

    for (const item of dataToProcess) {
      if (item) {
        let grouping: string = emptyGroup;
        let payload: any = item;
        if (item.groupByItems) {
          // If the query contains a GROUP BY clause, it will have a payload property and groupByItems
          payload = item.payload;
          grouping = await hashObject(item.groupByItems);
        }

        const aggregator = this.aggregators.get(grouping);
        if (!aggregator) {
          // This is the first time we have seen a grouping so create a new aggregator
          this.aggregators.set(grouping, createAggregator(this.aggregateType));
        }

        if (this.aggregateType) {
          const aggregateResult = extractAggregateResult(payload[0]);
          // if aggregate result is null, we need to short circuit aggregation and return undefined
          if (aggregateResult === null) {
            this.completed = true;
          }
          this.aggregators.get(grouping).aggregate(aggregateResult);
        } else {
          // Queries with no aggregates pass the payload directly to the aggregator
          // Example: SELECT VALUE c.team FROM c GROUP BY c.team
          this.aggregators.get(grouping).aggregate(payload);
        }
      }
    }

    // We bail early since we got an undefined result back `[{}]`
    if (this.completed) {
      const result = createParallelQueryResult([], new Map());

      return {
        result,
        headers: aggregateHeaders,
      };
    }

    if (this.executionContext.hasMoreResults()) {
      // Return empty buffer but preserve the structure and pass-through fields
      const result = createParallelQueryResult(
        [], // empty buffer
        new Map(),
      );

      return { result, headers: aggregateHeaders };
    } else {
      // If no results are left in the underlying execution context, convert our aggregate results to an array
      return this.generateAggregateResponse(aggregateHeaders);
    }
  }

  private generateAggregateResponse(aggregateHeaders: CosmosHeaders): Response<any> {
    for (const aggregator of this.aggregators.values()) {
      const result = aggregator.getResult();
      if (result !== undefined) {
        this.aggregateResultArray.push(result);
      }
    }
    this.completed = true;

    const result = createParallelQueryResult(this.aggregateResultArray, new Map());

    return {
      result,
      headers: aggregateHeaders,
    };
  }
}
