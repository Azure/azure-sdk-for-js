// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RUConsumedManager } from "../../common/RUConsumedManager";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { OrderByComparator } from "../orderByComparator";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { NonStreamingOrderByPriorityQueue } from "../../utils/nonStreamingOrderByPriorityQueue";
import { getInitialHeader } from "../headerUtils";
import { RUCapPerOperationExceededErrorCode } from "../../request/RUCapPerOperationExceededError";
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

  public async nextItem(
    diagnosticNode: DiagnosticNodeInternal,
    operationOptions?: QueryOperationOptions,
    ruConsumedManager?: RUConsumedManager,
  ): Promise<Response<any>> {
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
        headers: {},
      };
    }
    try {
      if (this.executionContext.hasMoreResults()) {
        const { result: item, headers } = await this.executionContext.nextItem(
          diagnosticNode,
          operationOptions,
          ruConsumedManager,
        );
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
        while (this.offset < this.priorityQueueBufferSize && this.offset > 0) {
          this.nonStreamingOrderByPQ.dequeue();
          this.offset--;
        }

        if (this.nonStreamingOrderByPQ.size() !== 0) {
          const item = this.nonStreamingOrderByPQ.dequeue()?.payload;
          return {
            result: item,
            headers: {},
          };
        } else {
          return {
            result: undefined,
            headers: getInitialHeader(),
          };
        }
      }
    } catch (err) {
      if (err.code === RUCapPerOperationExceededErrorCode) {
        err.fetchedResults = undefined;
      }
      throw err;
    }
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return (
      this.priorityQueueBufferSize > 0 &&
      (this.executionContext.hasMoreResults() || this.nonStreamingOrderByPQ.size() !== 0)
    );
  }
}
