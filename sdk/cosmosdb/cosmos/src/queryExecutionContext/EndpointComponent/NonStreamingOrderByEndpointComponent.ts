// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { OrderByComparator } from "../orderByComparator.js";
import type { NonStreamingOrderByResult } from "../nonStreamingOrderByResult.js";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue.js";
import type { CosmosHeaders } from "../headerUtils.js";
import { getInitialHeader } from "../headerUtils.js";
import type { QueryRangeMapping } from "../queryRangeMapping.js";
import type { ParallelQueryResult } from "../parallelQueryResult.js";
import { createParallelQueryResult } from "../parallelQueryResult.js";

/**
 * @hidden
 * Represents an endpoint in handling an non-streaming order by query.
 */
export class NonStreamingOrderByEndpointComponent implements ExecutionContext {
  /**
   * A priority queue to store the final sorted results.
   */
  private nonStreamingOrderByPQ: FixedSizePriorityQueue<NonStreamingOrderByResult>;
  /**
   * Flag to determine if all results are fetched from backend and results can be returned from priority queue.
   */
  private isCompleted: boolean = false;
  /**
   * Represents an endpoint in handling an non-streaming order by query. For each processed orderby
   * result it returns 'payload' item of the result
   *
   * @param executionContext - Underlying Execution Context
   * @hidden
   */
  constructor(
    private executionContext: ExecutionContext,
    private sortOrders: any[],
    private priorityQueueBufferSize: number,
    private offset: number = 0,
    private emitRawOrderByPayload: boolean = false,
  ) {
    const comparator = new OrderByComparator(this.sortOrders);
    this.nonStreamingOrderByPQ = new FixedSizePriorityQueue<NonStreamingOrderByResult>(
      (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
        return comparator.compareItems(b, a);
      },
      this.priorityQueueBufferSize,
    );
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the NonStreamingOrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.priorityQueueBufferSize > 0 && this.executionContext.hasMoreResults();
  }

  /**
   * Fetches the next batch of the result from the target container.
   * @param diagnosticNode - The diagnostic information for the request.
   */
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
    // If there are more results in backend, keep filling pq.
    if (this.executionContext.hasMoreResults()) {
      const response = await this.executionContext.fetchMore(diagnosticNode);

      if (!response) {
        this.isCompleted = true;
        if (!this.nonStreamingOrderByPQ.isEmpty()) {
          return this.buildFinalResultArray(resHeaders);
        }
        return { result: undefined, headers: resHeaders };
      }

      resHeaders = response.headers;
      if (
        response.result === undefined ||
        !response.result.buffer ||
        response.result.buffer.length === 0
      ) {
        this.isCompleted = true;
        if (!this.nonStreamingOrderByPQ.isEmpty()) {
          return this.buildFinalResultArray(resHeaders);
        }
        return { result: undefined, headers: resHeaders };
      }

      const parallelResult = response.result as ParallelQueryResult;
      const dataToProcess: NonStreamingOrderByResult[] =
        parallelResult.buffer as NonStreamingOrderByResult[];

      for (const item of dataToProcess) {
        if (item !== undefined) {
          this.nonStreamingOrderByPQ.enqueue(item);
        }
      }
    }

    // If the backend has more results to fetch, return [] to signal that there are more results to fetch.
    if (this.executionContext.hasMoreResults()) {
      const result = createParallelQueryResult(
        [], // empty buffer
        new Map(),
        {},
      );

      return {
        result,
        headers: resHeaders,
      };
    }

    // If all results are fetched from backend, prepare final results
    if (!this.executionContext.hasMoreResults() && !this.isCompleted) {
      this.isCompleted = true;
      return this.buildFinalResultArray(resHeaders, new Map(), {});
    }

    // If pq is empty, return undefined to signal that there are no more results.
    const result = createParallelQueryResult([], new Map(), {});

    return {
      result,
      headers: resHeaders,
    };
  }

  private async buildFinalResultArray(
    resHeaders: CosmosHeaders,
    partitionKeyRangeMap?: Map<string, QueryRangeMapping>,
    updatedContinuationRanges?: Record<string, any>,
  ): Promise<Response<any>> {
    // Set isCompleted to true.
    this.isCompleted = true;
    // Reverse the priority queue to get the results in the correct order
    this.nonStreamingOrderByPQ = this.nonStreamingOrderByPQ.reverse();
    // For offset limit case we set the size of priority queue to offset + limit
    // and we drain offset number of items from the priority queue
    while (
      this.offset < this.priorityQueueBufferSize &&
      this.offset > 0 &&
      !this.nonStreamingOrderByPQ.isEmpty()
    ) {
      this.nonStreamingOrderByPQ.dequeue();
      this.offset--;
    }

    // If pq is not empty, return the result from pq.
    if (!this.nonStreamingOrderByPQ.isEmpty()) {
      const buffer: any[] = [];
      if (this.emitRawOrderByPayload) {
        while (!this.nonStreamingOrderByPQ.isEmpty()) {
          buffer.push(this.nonStreamingOrderByPQ.dequeue());
        }
      } else {
        while (!this.nonStreamingOrderByPQ.isEmpty()) {
          buffer.push(this.nonStreamingOrderByPQ.dequeue()?.payload);
        }
      }
      const result = createParallelQueryResult(
        buffer,
        partitionKeyRangeMap || new Map(),
        updatedContinuationRanges || {},
        undefined,
      );

      return {
        result,
        headers: resHeaders,
      };
    }
  }
}
