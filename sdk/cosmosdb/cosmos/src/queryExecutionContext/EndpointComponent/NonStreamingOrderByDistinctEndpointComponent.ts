// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryInfo, QueryOperationOptions, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { getInitialHeader } from "../headerUtils";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { hashObject } from "../../utils/hashObject";
import { RUConsumedManager } from "../../common";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { NonStreamingOrderByResponse } from "../nonStreamingOrderByResponse";
import { NonStreamingOrderByPriorityQueue } from "../../utils/nonStreamingOrderByPriorityQueue";
import { OrderByComparator } from "../orderByComparator";

/** @hidden */
export class NonStreamingOrderByDistinctEndpointComponent implements ExecutionContext {
  private aggregateMap: Map<string, NonStreamingOrderByResult>; //map to store distinct values before storing in pq.
  private nonStreamingOrderByPQ: NonStreamingOrderByPriorityQueue<NonStreamingOrderByResult>; // pq to compute final orderBy results
  private finalResultArray: NonStreamingOrderByResult[]; //result array to store final sorted and orderBy results.
  private sortOrders: string[];
  private isInitialized: boolean = false;
  private isCompleted: boolean = false;
  private comparator: OrderByComparator;

  constructor(
    private executionContext: ExecutionContext,
    private queryInfo: QueryInfo,
    private priorityQueueBufferSize: number,
  ) {}

  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
    if (!this.isInitialized) {
      // initialize all the internal components
      this.aggregateMap = new Map();
      this.sortOrders = this.queryInfo.orderBy;
      this.comparator = new OrderByComparator(this.sortOrders);
      this.nonStreamingOrderByPQ = new NonStreamingOrderByPriorityQueue<NonStreamingOrderByResult>(
        (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
          return this.comparator.compareItems(b, a);
        },
        this.priorityQueueBufferSize,
      );
      this.isInitialized = true;
    }
    // if size is 0, just return undefined. Valid if query is TOP 0 or LIMIT 0
    if (this.priorityQueueBufferSize === 0) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
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
        // make hash of result object and update the map if required.
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
        await this.buildFinalResultArray();
      }
    }
    if (this.isCompleted) {
      // start returning the results if final result is computed.
      if (this.finalResultArray.length > 0) {
        return {
          result: this.finalResultArray.shift(),
          headers: resHeaders,
        };
      } else {
        return {
          result: undefined,
          headers: getInitialHeader(),
        };
      }
    } else {
      // keep returning empty till final results are getting computed.
      return {
        result: {},
        headers: resHeaders,
      };
    }
  }
  /**
   * Build final sorted result array from which responses will be served.
   */
  private async buildFinalResultArray(): Promise<void> {
    for (const [key, value] of this.aggregateMap) {
      this.nonStreamingOrderByPQ.enqueue(value);
      this.aggregateMap.delete(key);
    }

    const offSet = this.queryInfo.offset ? this.queryInfo.offset : 0;
    const queueSize = this.nonStreamingOrderByPQ.size();
    const finalArraySize = queueSize - offSet;
    this.finalResultArray = new Array(finalArraySize);

    for (let count = finalArraySize - 1; count >= 0; count--) {
      this.finalResultArray[count] = this.nonStreamingOrderByPQ.dequeue().payload;
    }
  }
  /**
   * Compare results inside the map and update based on comparator
   */
  private replaceResults(
    res1: NonStreamingOrderByResult,
    res2: NonStreamingOrderByResult,
  ): boolean {
    const res = this.comparator.compareItems(res1, res2);
    if (res < 0) return true;

    return false;
  }

  public hasMoreResults(): boolean {
    if (this.priorityQueueBufferSize === 0) return false;
    return this.executionContext.hasMoreResults() || this.finalResultArray.length > 0;
  }
}
