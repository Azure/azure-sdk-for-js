// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { AggregateType, QueryInfo } from "../../request/ErrorResponse";
import { hashObject } from "../../utils/hashObject";
import { Aggregator, createAggregator } from "../Aggregators";
import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { emptyGroup, extractAggregateResult } from "./emptyGroup";

interface GroupByResponse {
  result: GroupByResult;
  headers: CosmosHeaders;
}

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

  constructor(private executionContext: ExecutionContext, private queryInfo: QueryInfo) {
    // VALUE queries will only every have a single grouping
    this.aggregateType = this.queryInfo.aggregates[0];
  }

  public async nextItem(): Promise<Response<any>> {
    // Start returning results if we have processed a full results set
    if (this.aggregateResultArray.length > 0) {
      return { result: this.aggregateResultArray.pop(), headers: getInitialHeader() };
    }

    if (this.completed) {
      return { result: undefined, headers: getInitialHeader() };
    }

    const aggregateHeaders = getInitialHeader();

    while (this.executionContext.hasMoreResults()) {
      // Grab the next result
      const { result, headers } = (await this.executionContext.nextItem()) as GroupByResponse;
      mergeHeaders(aggregateHeaders, headers);

      // If it exists, process it via aggregators
      if (result) {
        let grouping: string = emptyGroup;
        let payload: any = result;
        if (result.groupByItems) {
          // If the query contains a GROUP BY clause, it will have a payload property and groupByItems
          payload = result.payload;
          grouping = await hashObject(result.groupByItems);
        }

        const aggregator = this.aggregators.get(grouping);
        if (!aggregator) {
          // This is the first time we have seen a grouping so create a new aggregator
          this.aggregators.set(grouping, createAggregator(this.aggregateType));
        }

        if (this.aggregateType) {
          const aggregateResult = extractAggregateResult(payload[0]);
          this.aggregators.get(grouping).aggregate(aggregateResult);
        } else {
          // Queries with no aggregates pass the payload directly to the aggregator
          // Example: SELECT VALUE c.team FROM c GROUP BY c.team
          this.aggregators.get(grouping).aggregate(payload);
        }
      }
    }

    // It no results are left in the underling execution context, convert our aggregate results to an array
    for (const aggregator of this.aggregators.values()) {
      this.aggregateResultArray.push(aggregator.getResult());
    }
    this.completed = true;
    return { result: this.aggregateResultArray.pop(), headers: aggregateHeaders };
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults() || this.aggregateResultArray.length > 0;
  }
}
