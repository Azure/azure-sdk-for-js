// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import type { ParallelQueryResult } from "../parallelQueryResult.js";
import { createParallelQueryResult } from "../parallelQueryResult.js";
import type { OrderByItemWithRid } from "../parallelQueryResult.js";

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

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<unknown>> {
    const buffer: any[] = [];
    const orderByItemsArray: OrderByItemWithRid[] = []; // Store order by items for each item

    const response = await this.executionContext.fetchMore(diagnosticNode);
    // Pipeline trust boundary: upstream returns ParallelQueryResult in Response<unknown>
    const pipelineResult = response?.result as ParallelQueryResult | undefined;
    if (
      !response ||
      !pipelineResult ||
      !Array.isArray(pipelineResult.buffer) ||
      pipelineResult.buffer.length === 0
    ) {
      // Preserve the partitionKeyRangeMap and updatedContinuationRanges from the original response
      // even when the buffer is empty, as they contain continuation token information
      const result = createParallelQueryResult(
        [],
        pipelineResult?.partitionKeyRangeMap || new Map(),
        pipelineResult?.updatedContinuationRanges || {},
        [],
      );
      return { result, headers: response?.headers };
    }

    const rawBuffer = pipelineResult.buffer;
    const partitionKeyRangeMap = pipelineResult.partitionKeyRangeMap;
    const updatedContinuationRanges = pipelineResult.updatedContinuationRanges;

    // Process buffer items and collect order by items for each item
    for (let i = 0; i < rawBuffer.length; i++) {
      const item = rawBuffer[i];
      if (this.emitRawOrderByPayload) {
        buffer.push(item);
      } else {
        buffer.push(item.payload);
      }
      orderByItemsArray.push({ orderByItems: item.orderByItems, _rid: item._rid });
    }

    const result = createParallelQueryResult(
      buffer,
      partitionKeyRangeMap,
      updatedContinuationRanges,
      orderByItemsArray,
    );

    return { result, headers: response.headers };
  }

  /**
   * Releases resources held by this execution context.
   * Propagates disposal down the component chain.
   */
  public dispose(): void {
    this.executionContext.dispose();
  }
}
