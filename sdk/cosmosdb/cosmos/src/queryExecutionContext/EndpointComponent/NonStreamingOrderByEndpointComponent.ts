// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { OrderByComparator } from "../orderByComparator";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue";
import { getInitialHeader } from "../headerUtils";

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
  ) {
    const comparator = new OrderByComparator(this.sortOrders);
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

    // If there are more results in backend, keep filling pq.
    if (this.executionContext.hasMoreResults()) {
      const { result: item, headers } = await this.executionContext.nextItem(diagnosticNode);
      resHeaders = headers;
      if (item !== undefined) {
        this.nonStreamingOrderByPQ.enqueue(item);
      }

      // If the backend has more results to fetch, return {} to signal that there are more results to fetch.
      if (this.executionContext.hasMoreResults()) {
        return {
          result: {},
          headers: resHeaders,
        };
      }
    }
    // If all results are fetched from backend, prepare final results
    if (!this.executionContext.hasMoreResults() && !this.isCompleted) {
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
    }
    // If pq is not empty, return the result from pq.
    if (!this.nonStreamingOrderByPQ.isEmpty()) {
      const item = this.nonStreamingOrderByPQ.dequeue()?.payload;
      return {
        result: item,
        headers: resHeaders,
      };
    }
    // If pq is empty, return undefined to signal that there are no more results.
    return {
      result: undefined,
      headers: resHeaders,
    };
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the NonStreamingOrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return (
      this.priorityQueueBufferSize > 0 &&
      (this.executionContext.hasMoreResults() || !this.nonStreamingOrderByPQ.isEmpty())
    );
  }
}
