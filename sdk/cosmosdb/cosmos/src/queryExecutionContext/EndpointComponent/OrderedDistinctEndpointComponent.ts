// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { createParallelQueryResult, type ParallelQueryResult } from "../parallelQueryResult.js";
import { processDistinctQueryAndUpdateRangeMap } from "../PartitionRangeUtils.js";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private _disposed = false;
  private hashedLastResult: string;

  constructor(
    private executionContext: ExecutionContext,
    hashedLastResult?: string,
  ) {
    this.hashedLastResult = hashedLastResult;
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<unknown>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    // Pipeline trust boundary: upstream returns ParallelQueryResult in Response<unknown>
    const pipelineResult = response?.result as ParallelQueryResult | undefined;
    if (
      !response ||
      !pipelineResult ||
      !Array.isArray(pipelineResult.buffer) ||
      pipelineResult.buffer.length === 0
    ) {
      return { result: response.result, headers: response.headers };
    }

    const parallelResult = pipelineResult;
    const dataToProcess: any[] = parallelResult.buffer;
    const partitionKeyRangeMap = parallelResult.partitionKeyRangeMap;
    const updatedContinuationRanges = parallelResult.updatedContinuationRanges;
    const orderByItems = parallelResult.orderByItems;

    // Process each item and maintain hashedLastResult for distinct filtering
    for (const item of dataToProcess) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (hashedResult !== this.hashedLastResult) {
          buffer.push(item);
          this.hashedLastResult = hashedResult;
        }
      }
    }

    // Process distinct query logic and update partition key range map with hashedLastResult
    const updatedPartitionKeyRangeMap = await processDistinctQueryAndUpdateRangeMap(
      dataToProcess,
      partitionKeyRangeMap,
      hashObject,
    );

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      buffer,
      updatedPartitionKeyRangeMap,
      updatedContinuationRanges,
      orderByItems,
    );

    return {
      result,
      headers: response.headers,
    };
  }

  /**
   * Releases resources held by this execution context.
   * Propagates disposal down the component chain and clears previous result tracking.
   */
  public dispose(): void {
    if (this._disposed) return;
    this._disposed = true;
    this.executionContext.dispose();
    this.hashedLastResult = undefined;
  }
}
