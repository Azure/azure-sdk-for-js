// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { AggregateType, QueryInfo } from "../../request/ErrorResponse";
// import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { hashObject } from "../../utils/hashObject";
import { Aggregator, createAggregator } from "../Aggregators";
import { getInitialHeader } from "../headerUtils";

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
  private aggergators: { [key: string]: Aggregator } = {};
  private aggreateResultArray: any[] = [];
  private aggregateType: AggregateType;
  private completed: boolean = false;

  constructor(private executionContext: ExecutionContext, private queryInfo: QueryInfo) {
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
      const grouping = result.groupByItems ? await hashObject(result.groupByItems) : "";
      const aggergator = this.aggergators[grouping];
      const payload = result.payload ? result.payload : result;
      if (!aggergator) {
        // This is the first time we have seen a grouping so create a new aggregator
        this.aggergators[grouping] = createAggregator(this.aggregateType);
      }
      // Iterator over all results in the payload
      if (Array.isArray(payload)) {
        const aggregateResult = payload[0].item2 ? payload[0].item2 : payload[0].item;
        this.aggergators[grouping].aggregate(aggregateResult);
      } else {
        this.aggergators[grouping].aggregate(payload);
      }
    }

    // It no results are left in the underling execution context, convert our aggregate results to an array
    if (!this.executionContext.hasMoreResults()) {
      this.aggreateResultArray = Object.values(this.aggergators).map((aggergator) => {
        return aggergator.getResult();
      });
      this.completed = true;
      return { result: this.aggreateResultArray.pop(), headers };
    }

    return { result: undefined, headers };
  }

  public async current(): Promise<Response<any>> {
    return this.executionContext.current();
  }

  public hasMoreResults() {
    return (
      this.executionContext.hasMoreResults() ||
      (this.aggreateResultArray && this.aggreateResultArray.length > 0)
    );
  }
}
