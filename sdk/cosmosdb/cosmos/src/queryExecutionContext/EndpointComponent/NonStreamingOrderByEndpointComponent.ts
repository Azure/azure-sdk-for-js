// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext, ExecutionContextOptions } from "../ExecutionContext";
import { OrderByComparator } from "../orderByComparator";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { FixedSizePriorityQueue } from "../../utils/fixedSizePriorityQueue";
import { getInitialHeader } from "../headerUtils";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";

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

  public async nextItem(
    options: ExecutionContextOptions,
  ): Promise<Response<any>> {
    if (
      this.priorityQueueBufferSize <= 0
    ) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }
    try {
      if (this.executionContext.hasMoreResults()) {
        const { result: item, headers } = await this.executionContext.nextItem(
          {
            diagnosticNode: options.diagnosticNode,
            operationOptions: options.operationOptions,
            ruConsumed: options.ruConsumed,
          }
        );
        if (item !== undefined) {
          this.nonStreamingOrderByPQ.enqueue(item);
        }
        if (this.executionContext.hasMoreResults()) {
          return {
            result: {},
            headers: headers,
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
        let item;
        if (this.emitRawOrderByPayload) {
          item = this.nonStreamingOrderByPQ.dequeue();
        } else {
          item = this.nonStreamingOrderByPQ.dequeue()?.payload;
        }
        return {
          result: item,
          headers: getInitialHeader(),
        };
      }
      // If pq is empty, return undefined to signal that there are no more results.
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    } catch (err) {
      if (err.code === RUCapPerOperationExceededErrorCode) {
        err.fetchedResults = undefined;
      }
      throw err;
    }
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
