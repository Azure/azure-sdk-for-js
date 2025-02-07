// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request";
import type { ExecutionContext } from "../ExecutionContext";
import type { CosmosHeaders } from "../CosmosHeaders";
import type { AggregateType, QueryInfo } from "../../request/ErrorResponse";
import { hashObject } from "../../utils/hashObject";
import type { Aggregator } from "../Aggregators";
import { createAggregator } from "../Aggregators";
import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { emptyGroup, extractAggregateResult } from "./emptyGroup";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";

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

    if (response === undefined || response.result === undefined) {
      if (this.aggregators.size > 0) {
        return this.generateAggregateResponse(aggregateHeaders);
      }
      return { result: undefined, headers: aggregateHeaders };
    }

    for (const item of response.result as GroupByResult[]) {
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
      return {
        result: undefined,
        headers: aggregateHeaders,
      };
    }

    if (this.executionContext.hasMoreResults()) {
      return { result: [], headers: aggregateHeaders };
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
    return {
      result: this.aggregateResultArray,
      headers: aggregateHeaders,
    };
  }
}
