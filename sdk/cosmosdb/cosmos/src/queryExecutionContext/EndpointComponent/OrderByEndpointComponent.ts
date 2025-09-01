// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { ContinuationTokenManager } from "../ContinuationTokenManager.js";
import type { FeedOptions } from "../../request/index.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

/** @hidden */
export class OrderByEndpointComponent implements ExecutionContext {
  private continuationTokenManager: ContinuationTokenManager | undefined;

  /**
   * Represents an endpoint in handling an order by query. For each processed orderby
   * result it returns 'payload' item of the result
   *
   * @param executionContext - Underlying Execution Context
   * @param emitRawOrderByPayload - Whether to emit raw order by payload
   * @param options - Feed options that may contain continuation token manager
   * @hidden
   */
  constructor(
    private executionContext: ExecutionContext,
    private emitRawOrderByPayload: boolean = false,
    options?: FeedOptions,
  ) {
    // Get the continuation token manager from options if available
    this.continuationTokenManager = (options as any)?.continuationTokenManager;
  }
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
      response === undefined ||
      response.result === undefined ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      const result = createParallelQueryResult(
        [],
        new Map(),
        {}
      );
      
      return { result, headers: response.headers };
    }

    // New structure: { result: { buffer: bufferedResults, partitionKeyRangeMap: ..., updatedContinuationRanges: ... } }
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

    // Set the orderByItemsArray directly in the continuation token manager
    if (this.continuationTokenManager && orderByItemsArray.length > 0) {
      this.continuationTokenManager.setOrderByItemsArray(orderByItemsArray);
    }

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      buffer,
      partitionKeyRangeMap,
      updatedContinuationRanges
    );

    return { result, headers: response.headers };
  }
}
