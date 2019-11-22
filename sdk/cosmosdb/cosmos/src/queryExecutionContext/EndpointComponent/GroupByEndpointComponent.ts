// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { QueryInfo } from "../../request/ErrorResponse";
import { hashObject } from "../../utils/hashObject";
import { Aggregator, createAggregator } from "../Aggregators";
import { getInitialHeader, mergeHeaders } from "../headerUtils";
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
export class GroupByEndpointComponent implements ExecutionContext {
  constructor(private executionContext: ExecutionContext, private queryInfo: QueryInfo) {}

  private readonly groupings: Map<string, Map<string, Aggregator>> = new Map();
  private readonly aggreateResultArray: any[] = [];
  private completed: boolean = false;

  public async nextItem(): Promise<Response<any>> {
    // If we have a full result set, begin returning results
    if (this.aggreateResultArray.length > 0) {
      return { result: this.aggreateResultArray.pop(), headers: getInitialHeader() };
    }

    if (this.completed) {
      return { result: undefined, headers: getInitialHeader() };
    }

    const aggregateHeaders = getInitialHeader();

    while (this.executionContext.hasMoreResults()) {
      // Grab the next result
      const { result, headers } = (await this.executionContext.nextItem()) as GroupByResponse;
      mergeHeaders(aggregateHeaders, headers);

      // If it exists, process it via aggreatators
      if (result) {
        const group = result.groupByItems ? await hashObject(result.groupByItems) : emptyGroup;
        const aggergators = this.groupings.get(group);
        const payload = result.payload;
        if (aggergators) {
          // Iterator over all results in the payload
          Object.keys(payload).map((key) => {
            const aggregateResult = extractAggergateResult(payload[key]);
            aggergators.get(key).aggregate(aggregateResult);
          });
        } else {
          // This is the first time we have seen a grouping. Setup the initial result without aggregate values
          const grouping = new Map();
          this.groupings.set(group, grouping);
          // Iterator over all results in the payload
          Object.keys(payload).map((key) => {
            const aggregateType = this.queryInfo.groupByAliasToAggregateType[key];
            // Create a new aggregator for this specific aggregate field
            const aggreatator = createAggregator(aggregateType);
            grouping.set(key, aggreatator);
            if (aggregateType) {
              const aggregateResult = extractAggergateResult(payload[key]);
              aggreatator.aggregate(aggregateResult);
            } else {
              aggreatator.aggregate(payload[key]);
            }
          });
        }
      }
    }

    for (const grouping of this.groupings.values()) {
      const groupResult: any = {};
      for (const [aggregateKey, aggregator] of grouping.entries()) {
        groupResult[aggregateKey] = aggregator.getResult();
      }
      this.aggreateResultArray.push(groupResult);
    }
    this.completed = true;
    return { result: this.aggreateResultArray.pop(), headers: aggregateHeaders };
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults() || this.aggreateResultArray.length > 0;
  }
}
