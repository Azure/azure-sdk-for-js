// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { AggregateType, QueryInfo } from "../../request/ErrorResponse";
import { hashObject } from "../../utils/hashObject";
import { Aggregator, createAggregator } from "../Aggregators";
import { getInitialHeader } from "../headerUtils";
import { emptyGroup, extractAggergateResult } from "./emptyGroup";

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
  private readonly aggergators: Map<string, Aggregator> = new Map();
  private readonly aggreateResultArray: any[] = [];
  private aggregateType: AggregateType;
  private completed: boolean = false;

  constructor(private executionContext: ExecutionContext, private queryInfo: QueryInfo) {
    // VALUE queries will only every have a single grouping
    this.aggregateType = this.queryInfo.aggregates[0];
  }

  public async nextItem(): Promise<Response<any>> {
    // Start returning results if we have processed a full results set
    if (this.aggreateResultArray.length > 0) {
      return { result: this.aggreateResultArray.pop(), headers: getInitialHeader() };
    }

    if (this.completed) {
      return { result: undefined, headers: getInitialHeader() };
    }

    // Grab the next result
    const { result, headers } = (await this.executionContext.nextItem()) as GroupByResponse;
    // If it exists, process it via aggreatators
    if (result) {
      let grouping: string = emptyGroup;
      let payload: any = result;
      if (result.groupByItems) {
        // If the query contains a GROUP BY clause, it will have a payload property and groupByItems
        payload = result.payload;
        grouping = await hashObject(result.groupByItems);
      }

      const aggergator = this.aggergators.get(grouping);
      if (!aggergator) {
        // This is the first time we have seen a grouping so create a new aggregator
        this.aggergators.set(grouping, createAggregator(this.aggregateType));
      }

      if (this.aggregateType) {
        const aggregateResult = extractAggergateResult(payload[0]);
        this.aggergators.get(grouping).aggregate(aggregateResult);
      } else {
        // Queries with no aggregates pass the payload directly to the aggregator
        // Example: SELECT VALUE c.team FROM c GROUP BY c.team
        this.aggergators.get(grouping).aggregate(payload);
      }
    }

    // It no results are left in the underling execution context, convert our aggregate results to an array
    if (!this.executionContext.hasMoreResults()) {
      for (const aggergator of this.aggergators.values()) {
        this.aggreateResultArray.push(aggergator.getResult());
      }
      this.completed = true;
      return { result: this.aggreateResultArray.pop(), headers };
    }

    return { result: undefined, headers };
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults() || this.aggreateResultArray.length > 0;
  }
}
