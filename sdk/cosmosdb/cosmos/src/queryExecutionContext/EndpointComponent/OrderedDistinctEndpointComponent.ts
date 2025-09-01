// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { createParallelQueryResult, type ParallelQueryResult } from "../ParallelQueryResult.js";

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
    const updatedPartitionKeyRangeMap = await OrderedDistinctEndpointComponent.processDistinctQueryAndUpdateRangeMap(
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

  /**
   * Static method to process distinct query and update partition range map
   * @param originalBuffer - Original buffer containing query results
   * @param partitionKeyRangeMap - Map of partition key ranges  
   * @param hashFunction - Hash function for items
   * @returns Updated partition key range map
   */
  public static async processDistinctQueryAndUpdateRangeMap(
    originalBuffer: any[],
    partitionKeyRangeMap: Map<string, any>,
    hashFunction: (item: any) => Promise<string>
  ): Promise<Map<string, any>> {
    if (!partitionKeyRangeMap || partitionKeyRangeMap.size === 0) {
      return partitionKeyRangeMap;
    }

    // Create a new map to avoid mutating the original
    const updatedMap = new Map<string, any>();

    // Update partition key range map with hashedLastResult for each range
    let bufferIndex = 0;
    for (const [rangeId, rangeMapping] of partitionKeyRangeMap) {
      const { itemCount } = rangeMapping;
      
      // Find the last document in this partition range that made it to the final buffer
      let lastHashForThisRange: string | undefined;
      
      if (itemCount > 0 && bufferIndex < originalBuffer.length) {
        // Calculate the index of the last item from this range
        const rangeEndIndex = Math.min(bufferIndex + itemCount, originalBuffer.length);
        const lastItemIndex = rangeEndIndex - 1;
        
        // Get the hash of the last item from this range
        const lastItem = originalBuffer[lastItemIndex];
        if (lastItem) {
          lastHashForThisRange = await hashFunction(lastItem);
        }
        // Move buffer index to start of next range
        bufferIndex = rangeEndIndex;
      }
      
      // Update the range mapping with hashedLastResult
      const updatedMapping = {
        ...rangeMapping,
        hashedLastResult: lastHashForThisRange,
      };
      updatedMap.set(rangeId, updatedMapping);
    }

    return updatedMap;
  }
}
