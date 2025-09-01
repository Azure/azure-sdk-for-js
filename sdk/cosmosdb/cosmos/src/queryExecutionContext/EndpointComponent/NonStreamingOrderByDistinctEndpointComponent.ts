// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { QueryInfo, Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { getInitialHeader } from "../headerUtils.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { hashObject } from "../../utils/hashObject.js";
import type { NonStreamingOrderByResult } from "../nonStreamingOrderByResult.js";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue.js";
import { NonStreamingOrderByMap } from "../../utils/nonStreamingOrderByMap.js";
import { OrderByComparator } from "../orderByComparator.js";
import type { QueryRangeMapping } from "../QueryRangeMapping.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

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
    private emitRawOrderByPayload: boolean = false,
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
        if (this.emitRawOrderByPayload) {
          this.finalResultArray[count] = this.nonStreamingOrderByPQ.dequeue();
        } else {
          this.finalResultArray[count] = this.nonStreamingOrderByPQ.dequeue()?.payload;
        }
      }
    }
  }

  public hasMoreResults(): boolean {
    if (this.priorityQueueBufferSize === 0) return false;
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    if (this.isCompleted) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }
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
      const response = await this.executionContext.fetchMore(diagnosticNode);
      if (
        response === undefined ||
        response.result === undefined ||
        !Array.isArray(response.result.buffer) ||
        response.result.buffer.length === 0
      ) {
        this.isCompleted = true;
        if (this.aggregateMap.size() > 0) {
          await this.buildFinalResultArray();
          const result = createParallelQueryResult(
            this.finalResultArray,
            new Map(),
            {},
            undefined
          );
          
          return {
            result,
            headers: response.headers,
          };
        }
        return { result: undefined, headers: response.headers };
      }
      resHeaders = response.headers;
      
      // New structure: { result: { buffer: bufferedResults, partitionKeyRangeMap: ..., updatedContinuationRanges: ... } }
      const parallelResult = response.result as ParallelQueryResult;
      const dataToProcess: NonStreamingOrderByResult[] = parallelResult.buffer as NonStreamingOrderByResult[];
      const partitionKeyRangeMap = parallelResult.partitionKeyRangeMap;
      const updatedContinuationRanges = parallelResult.updatedContinuationRanges;
      const orderByItems = parallelResult.orderByItems;

      for (const item of dataToProcess) {
        if (item) {
          const key = await hashObject(item?.payload);
          this.aggregateMap.set(key, item);
        }
      }

      // return [] to signal that there are more results to fetch.
      if (this.executionContext.hasMoreResults()) {
        const result = createParallelQueryResult(
          [], // empty buffer
          partitionKeyRangeMap,
          updatedContinuationRanges,
          orderByItems
        );
        
        return {
          result,
          headers: resHeaders,
        };
      }
    }

    // If all results are fetched from backend, prepare final results
    if (!this.executionContext.hasMoreResults() && !this.isCompleted) {
      this.isCompleted = true;
      await this.buildFinalResultArray();
      const result = createParallelQueryResult(
        this.finalResultArray,
        new Map(),
        {},
        orderByItems
      );
      
      return {
        result,
        headers: resHeaders,
      };
    }
    // Signal that there are no more results.
    const result = createParallelQueryResult(
      [],
      new Map(),
      {},
      orderByItems
    );
    
    return {
      result,
      headers: resHeaders,
    };
  }
}
