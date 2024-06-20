// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { QueryInfo, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { getInitialHeader } from "../headerUtils";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { hashObject } from "../../utils/hashObject";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { NonStreamingOrderByResponse } from "../nonStreamingOrderByResponse";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue";
import { NonStreamingOrderByMap } from "../../utils/nonStreamingOrderByMap";
import { OrderByComparator } from "../orderByComparator";

/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by distinct query.
 */
export class NonStreamingOrderByDistinctEndpointComponent implements ExecutionContext {
  /**
   * A Map that holds the distinct values of the items before storing in priority queue.
   */
  private aggregateMap: NonStreamingOrderByMap<NonStreamingOrderByResult>;
  /**
   * A priority queue to compute the final sorted results.
   */
  private nonStreamingOrderByPQ: FixedSizePriorityQueue<NonStreamingOrderByResult>;
  /**
   * Array to store the final sorted results.
   */
  private finalResultArray: NonStreamingOrderByResult[];

  private sortOrders: string[];
  /**
   * Flag to determine if all results are fetched from backend and results can be returned.
   */
  private isCompleted: boolean = false;

  constructor(
    private executionContext: ExecutionContext,
    private queryInfo: QueryInfo,
    private priorityQueueBufferSize: number,
  ) {
    this.sortOrders = this.queryInfo.orderBy;
    const comparator = new OrderByComparator(this.sortOrders);
    this.aggregateMap = new NonStreamingOrderByMap<NonStreamingOrderByResult>(
      (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
        return comparator.compareItems(a, b);
      },
    );
    this.nonStreamingOrderByPQ = new FixedSizePriorityQueue<NonStreamingOrderByResult>(
      (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
        return comparator.compareItems(b, a);
      },
      this.priorityQueueBufferSize,
    );
  }

  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    let resHeaders = getInitialHeader();
    // if size is 0, just return undefined to signal to more results. Valid if query is TOP 0 or LIMIT 0
    if (this.priorityQueueBufferSize <= 0) {
      return {
        result: undefined,
        headers: resHeaders,
      };
    }

    // If there are more results in backend, keep filling map.
    if (this.executionContext.hasMoreResults()) {
      // Grab the next result
      const { result, headers } = (await this.executionContext.nextItem(
        diagnosticNode,
      )) as NonStreamingOrderByResponse;
      resHeaders = headers;
      if (result) {
        // make hash of result object and update the map if required.
        const key = await hashObject(result?.payload);
        this.aggregateMap.set(key, result);
      }

      // return {} to signal that there are more results to fetch.
      if (this.executionContext.hasMoreResults()) {
        return {
          result: {},
          headers: resHeaders,
        };
      }
    }

    // If all results are fetched from backend, prepare final results
    if (!this.executionContext.hasMoreResults() && !this.isCompleted) {
      this.isCompleted = true;
      await this.buildFinalResultArray();
    }

    // Return results from final array.
    if (this.finalResultArray.length > 0) {
      return {
        result: this.finalResultArray.shift(),
        headers: resHeaders,
      };
    }
    // Signal that there are no more results.
    return {
      result: undefined,
      headers: resHeaders,
    };
  }

  /**
   * Build final sorted result array from which responses will be served.
   */
  private async buildFinalResultArray(): Promise<void> {
    // Fetch all distinct values from the map and store in priority queue.
    const allValues = this.aggregateMap.getAllValuesAndReset();
    for (const value of allValues) {
      this.nonStreamingOrderByPQ.enqueue(value);
    }

    // Compute the final result array size based on offset and limit.
    const offSet = this.queryInfo.offset ? this.queryInfo.offset : 0;
    const queueSize = this.nonStreamingOrderByPQ.size();
    const finalArraySize = queueSize - offSet;

    if (finalArraySize <= 0) {
      this.finalResultArray = [];
    } else {
      this.finalResultArray = new Array(finalArraySize);
      // Only keep the final result array size number of items in the final result array and discard the rest.
      for (let count = finalArraySize - 1; count >= 0; count--) {
        this.finalResultArray[count] = this.nonStreamingOrderByPQ.dequeue()?.payload;
      }
    }
  }

  public hasMoreResults(): boolean {
    if (this.priorityQueueBufferSize === 0) return false;
    return this.executionContext.hasMoreResults() || this.finalResultArray.length > 0;
  }
}
