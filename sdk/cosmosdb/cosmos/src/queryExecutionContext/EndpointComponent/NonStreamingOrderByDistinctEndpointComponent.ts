// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryInfo, QueryOperationOptions, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { getInitialHeader } from "../headerUtils";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import PriorityQueue from "priorityqueuejs";
import { hashObject } from "../../utils/hashObject";
import { RUConsumedManager } from "../../common";
// import { nonStreamingEndpointEmptyResult } from "../../request/ErrorResponse";

interface NonStreamingOrderByResponse {
  result: NonStreamingOrderByResult;
  headers: CosmosHeaders;
}

interface NonStreamingOrderByResult {
  orderByItems: [];
  payload: any;
}

/** @hidden */
export class NonStreamingOrderByDistinctEndpointComponent implements ExecutionContext {
  private aggregateMap: Map<string, NonStreamingOrderByResult>;
  private resultsPQ: PriorityQueue<NonStreamingOrderByResult>;
  private sortOrder: string;
  private isInitialized: boolean = false;
  private isCompleted: boolean = false;

  constructor(
    private executionContext: ExecutionContext,
    private queryInfo: QueryInfo,
    private pqMaxSize: number,
  ) {}

  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    if (!this.isInitialized) {
      this.aggregateMap = new Map();
      this.sortOrder = this.queryInfo.orderBy[0];
      this.resultsPQ = new PriorityQueue<NonStreamingOrderByResult>(this.compare);
      this.isInitialized = true;
    }

    let resHeaders = getInitialHeader();

    if (!this.isCompleted && this.executionContext.hasMoreResults()) {
      // Grab the next result
      const { result, headers } = (await this.executionContext.nextItem(
        diagnosticNode,
        operationOptions,
        ruConsumedManager,
      )) as NonStreamingOrderByResponse;
      resHeaders = headers;

      if (result) {
        const key = await hashObject(result.payload);
        if (!this.aggregateMap.has(key)) {
          this.aggregateMap.set(key, result);
        } else {
          const oldRes = this.aggregateMap.get(key);
          if (this.replaceResults(oldRes, result)) {
            this.aggregateMap.set(key, result);
          }
        }
      }

      if (!this.executionContext.hasMoreResults()) {
        this.isCompleted = true;
        await this.buildResultPQ();
      }
    }

    if (this.isCompleted) {
      if (this.resultsPQ.size() > 0) {
        return {
          result: this.resultsPQ.deq().payload,
          headers: resHeaders,
        };
      } else {
        return {
          result: undefined,
          headers: getInitialHeader(),
        };
      }
    } else {
      return {
        result: {},
        headers: resHeaders,
      };
    }
  }

  private async buildResultPQ(): Promise<void> {
    for (const [key, value] of this.aggregateMap) {
      await this.updateResultPQ(value);
      this.aggregateMap.delete(key);
    }
  }

  private async updateResultPQ(result: NonStreamingOrderByResult) {
    if (this.resultsPQ.size() < this.pqMaxSize) {
      this.resultsPQ.enq(result);
    } else {
      const top = this.resultsPQ.peek();
      const compare = this.compare(top, result);
      if (compare <= 0) {
        this.resultsPQ.deq();
        this.resultsPQ.enq(result);
      }
    }
  }

  private compare(doc1: NonStreamingOrderByResult, doc2: NonStreamingOrderByResult): number {
    let firstOrder: any = doc1?.orderByItems.find((x) => x !== undefined);
    let secondOrder: any = doc2?.orderByItems.find((x) => x !== undefined);

    firstOrder = firstOrder ? firstOrder : { item: 0 };
    secondOrder = secondOrder ? secondOrder : { item: 0 };
    const order = firstOrder["item"] - secondOrder["item"];
    if (this.sortOrder === "Ascending") return -1 * order;
    else return order;
  }

  private replaceResults(
    res1: NonStreamingOrderByResult,
    res2: NonStreamingOrderByResult,
  ): boolean {
    const firstOrder = res1.orderByItems.find((x) => x !== undefined)["item"];
    const secondOrder = res2.orderByItems.find((x) => x !== undefined)["item"];
    if (this.sortOrder === "Ascending") {
      Math.abs(firstOrder) > Math.abs(secondOrder) ? true : false;
    } else {
      Math.abs(firstOrder) > Math.abs(secondOrder) ? false : true;
    }
    return false;
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults() || this.resultsPQ.size() > 0;
  }
}
