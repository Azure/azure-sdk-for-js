// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { OrderByComparator } from "../orderByComparator";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { NonStreamingOrderByPriorityQueue } from "../../utils/nonStreamingOrderByPriorityQueue";
import { getInitialHeader } from "../headerUtils";
export class NonStreamingOrderByEndpointComponent implements ExecutionContext {
  private nonStreamingOrderByPQ: NonStreamingOrderByPriorityQueue<NonStreamingOrderByResult>;
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
    private priorityQueueBufferSize: number = 2000,
    private offset: number = 0,
  ) {
    const comparator = new OrderByComparator(this.sortOrders);
    this.nonStreamingOrderByPQ = new NonStreamingOrderByPriorityQueue<NonStreamingOrderByResult>(
      (a: NonStreamingOrderByResult, b: NonStreamingOrderByResult) => {
        return comparator.compareItems(b, a);
      },
      this.priorityQueueBufferSize,
    );
  }

  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    if (
      this.priorityQueueBufferSize <= 0 ||
      (this.isCompleted && this.nonStreamingOrderByPQ.isEmpty())
    ) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }

    if (this.isCompleted && !this.nonStreamingOrderByPQ.isEmpty()) {
      const item = this.nonStreamingOrderByPQ.dequeue()?.payload;
      return {
        result: item,
        headers: getInitialHeader(),
      };
    }
    if (this.executionContext.hasMoreResults()) {
      const { result: item, headers } = await this.executionContext.nextItem(diagnosticNode);
      if (item !== undefined) {
        this.nonStreamingOrderByPQ.enqueue(item);
      }
      return {
        result: {},
        headers,
      };
    } else {
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

      if (!this.nonStreamingOrderByPQ.isEmpty()) {
        const item = this.nonStreamingOrderByPQ.dequeue()?.payload;
        return {
          result: item,
          headers: getInitialHeader(),
        };
      } else {
        return {
          result: undefined,
          headers: getInitialHeader(),
        };
      }
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
