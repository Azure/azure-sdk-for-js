// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { createParallelQueryResult, type ParallelQueryResult } from "../ParallelQueryResult.js";
import { processDistinctQueryAndUpdateRangeMap } from "../PartitionRangeUtils.js";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  // TODO: pass on hashedLast result from outside
  private hashedLastResult: string;

  constructor(
    private executionContext: ExecutionContext,
  ) {
    
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (
      !response ||
      !response.result ||
      !Array.isArray(response.result.buffer) ||
      response.result.buffer.length === 0
    ) {
      const result = createParallelQueryResult(
        [],
        new Map(),
        {},
        undefined
      );
      
      return { result, headers: response.headers };
    }

    // New structure: { result: { buffer: bufferedResults, partitionKeyRangeMap: ..., updatedContinuationRanges: ... } }
    const parallelResult = response.result as ParallelQueryResult;
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
      hashObject
    );

    // Return in the new structure format using the utility function
    const result = createParallelQueryResult(
      buffer,
      updatedPartitionKeyRangeMap,
      updatedContinuationRanges,
      orderByItems
    );

    return {
      result,
      headers: response.headers
    };
  }
}
