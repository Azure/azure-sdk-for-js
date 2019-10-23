// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { QueryInfo } from "../../request/ErrorResponse";
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

const emptyGroup = "__empty__";

/** @hidden */
export class GroupByEndpointComponent implements ExecutionContext {
  constructor(private executionContext: ExecutionContext, private queryInfo: QueryInfo) {}

  private groupings: { [key: string]: { [key: string]: Aggregator } } = {};
  private aggreateResultArray: any[] = [];

  public async nextItem(): Promise<Response<any>> {
    // If we have a full result set, begin returning results
    if (this.aggreateResultArray.length > 0) {
      return { result: this.aggreateResultArray.pop(), headers: getInitialHeader() };
    }

    // Grab the next result
    const { result, headers } = (await this.executionContext.nextItem()) as GroupByResponse;

    // If it exists, process it via aggreatators
    if (result) {
      const group = result.groupByItems ? await hashObject(result.groupByItems) : emptyGroup;
      const aggergators = this.groupings[group];
      const payload = result.payload;
      if (aggergators) {
        // Iterator over all results in the payload
        Object.keys(payload).map((key) => {
          // Newer API versions rewrite the query to return `item2`. It fixes some legacy issues with the original `item` result
          // Aggregatior code should use item2 when available
          const aggregateResult = payload[key].item2 ? payload[key].item2 : payload[key].item;
          aggergators[key].aggregate(aggregateResult);
        });
      } else {
        // This is the first time we have seen a grouping. Setup the initial result without aggregate values
        this.groupings[group] = {};
        // Iterator over all results in the payload
        Object.keys(payload).map((key) => {
          const aggregateType = this.queryInfo.groupByAliasToAggregateType[key];
          // Create a new aggregator for this specific aggregate field
          this.groupings[group][key] = createAggregator(aggregateType);
          // Aggregate the first value
          // Newer API versions rewrite the query to return `item2`. It fixes some legacy issues with the original `item` result
          // Aggregatior code should use item2 when available
          if (typeof payload[key] === "object") {
            const aggregateResult = payload[key].item2 ? payload[key].item2 : payload[key].item;
            this.groupings[group][key].aggregate(aggregateResult);
          } else {
            this.groupings[group][key].aggregate(payload[key]);
          }
        });
      }
    }

    // It no results are left in the underling execution context, convert our results set to an array
    if (!this.executionContext.hasMoreResults()) {
      this.aggreateResultArray = Object.keys(this.groupings).map((group) => {
        const groupResult: any = {};
        Object.keys(this.groupings[group]).map((aggregate) => {
          groupResult[aggregate] = this.groupings[group][aggregate].getResult();
        });
        return groupResult;
      });
      return { result: this.aggreateResultArray.pop(), headers };
    }

    // Return empty items until we have a full results set
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
