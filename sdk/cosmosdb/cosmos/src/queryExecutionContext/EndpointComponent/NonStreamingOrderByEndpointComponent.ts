// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RUConsumedManager } from "../../common/RUConsumedManager";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { QueryOperationOptions, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { OrderByComparator } from "../orderByComparator";
import { NonStreamingOrderByResult } from "../nonStreamingOrderByResult";
import { NonStreamingOrderByPriorityQueue } from "../../utils/nonStreamingOrderByPriorityQueue";
export class NonStreamingOrderByEndpointComponent implements ExecutionContext {
  private nonStreamingOrderByPQ: NonStreamingOrderByPriorityQueue<NonStreamingOrderByResult>;

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
    if (!this.executionContext.hasMoreResults() && this.nonStreamingOrderByPQ.size() !== 0) {
      const item = this.nonStreamingOrderByPQ.dequeue()?.payload;
      return {
        result: item,
        headers: {},
      };
    }

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
    }

    return {
      result: undefined,
      headers: {},
    };
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults() || this.nonStreamingOrderByPQ.size() !== 0;
  }
}
