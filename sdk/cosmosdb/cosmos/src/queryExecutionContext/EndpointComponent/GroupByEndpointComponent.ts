// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { GroupByAliasToAggregateType } from "../../request/ErrorResponse";
// import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { hashObject } from "../../utils/hashObject";

interface GroupByResult {
  groupByItems: any[];
  payload: any;
}

/** @hidden */
export class GroupByEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private groupByAliasToAggregateType: GroupByAliasToAggregateType
  ) {}

  private aggregatedResultMap: any = {};
  private aggreateResultArray: any[];
  // private aggregatedHeaders: CosmosHeaders;

  public async nextItem(): Promise<Response<any>> {
    const { result, headers } = (await this.executionContext.nextItem()) as {
      result: GroupByResult;
      headers: CosmosHeaders;
    };
    if (result) {
      const groupByItemsHash = await hashObject(result.groupByItems);

      const lastResult = this.aggregatedResultMap[groupByItemsHash];
      if (lastResult) {
        this.aggregatedResultMap[groupByItemsHash] = combineResults(
          this.groupByAliasToAggregateType,
          lastResult,
          result.payload
        );
      } else {
        this.aggregatedResultMap[groupByItemsHash] = result.payload;
      }

      // const groupByAliases = Object.keys(this.groupByAliasToAggregateType);

      console.log(result, this.groupByAliasToAggregateType);
    }
    if (!this.hasMoreResults()) {
      this.aggreateResultArray = resultMapToArray(this.aggregatedResultMap, this.groupByAliasToAggregateType);
      return { result: Object.values(this.aggregatedResultMap), headers };
    }
    return { result: undefined, headers };
  }

  public async current(): Promise<Response<any>> {
    return this.executionContext.current();
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults();
  }
}

function combineResults(aggregateMap: GroupByAliasToAggregateType, current: any, payload: any) {
  console.log(current, payload);
  Object.keys(aggregateMap).map((field) => {
    const aggregateType = aggregateMap[field];
    switch (aggregateType) {
      case null:
        current[field] = current[field] || payload[field];
        break;
      case "Count":
        current[field].item += payload[field].item;
        break;
      default:
        break;
    }
  });
}
