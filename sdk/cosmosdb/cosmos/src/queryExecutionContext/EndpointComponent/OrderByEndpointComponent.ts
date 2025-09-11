// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

/** @hidden */
export class OrderByEndpointComponent implements ExecutionContext {
  /**
   * Represents an endpoint in handling an order by query. For each processed orderby
   * result it returns 'payload' item of the result
   *
   * @param executionContext - Underlying Execution Context
   * @param emitRawOrderByPayload - Whether to emit raw order by payload
   * @hidden
   */
  constructor(
    private executionContext: ExecutionContext,
    private emitRawOrderByPayload: boolean = false,
  ) {}
  /**
   * Determine if there are still remaining resources to processs.
   * @returns true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const orderByItemsArray: any[][] = []; // Store order by items for each item

    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (
      !response ||
      !response.result ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      const result = createParallelQueryResult([], new Map(), {}, []);
      return { result, headers: response.headers };
    }

    const parallelResult = response.result as ParallelQueryResult;
    const rawBuffer = parallelResult.buffer;
    const partitionKeyRangeMap = parallelResult.partitionKeyRangeMap;
    const updatedContinuationRanges = parallelResult.updatedContinuationRanges;

    // Process buffer items and collect order by items for each item
    for (let i = 0; i < rawBuffer.length; i++) {
      const item = rawBuffer[i];

      if (this.emitRawOrderByPayload) {
        buffer.push(item);
      } else {
        buffer.push(item.payload);
      }
      orderByItemsArray.push(item.orderByItems);
    }

    const result = createParallelQueryResult(
      buffer,
      partitionKeyRangeMap,
      updatedContinuationRanges,
      orderByItemsArray,
    );

    return { result, headers: response.headers };
  }
}
