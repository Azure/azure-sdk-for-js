// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";
import type { ParallelQueryResult } from "../ParallelQueryResult.js";
import { createParallelQueryResult } from "../ParallelQueryResult.js";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number,
  ) {
  }

  public hasMoreResults(): boolean {
    return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const aggregateHeaders = getInitialHeader();
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    mergeHeaders(aggregateHeaders, response.headers);
    if (
      response === undefined ||
      response.result === undefined ||
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

    const initialOffset = this.offset;
    const initialLimit = this.limit;

    for (const item of dataToProcess) {
      if (this.offset > 0) {
        this.offset--;
      } else if (this.limit > 0) {
        buffer.push(item);
        this.limit--;
      }
    }

    // Process offset/limit logic and update partition key range map
    const updatedPartitionKeyRangeMap = OffsetLimitEndpointComponent.calculateOffsetLimitForEachPartitionRange(
      partitionKeyRangeMap,
      initialOffset,
      initialLimit
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
      headers: aggregateHeaders
    };
  }

  /**
   * Calculates what offset/limit values would be after completely consuming each partition range.
   * This simulates processing each partition range sequentially and tracks the remaining offset/limit.
   * 
   * Example: 
   * Initial state: offset=10, limit=10
   * Range 1: itemCount=0 -\> offset=10, limit=10 (no consumption)
   * Range 2: itemCount=5 -\> offset=5, limit=10 (5 items consumed by offset)
   * Range 3: itemCount=80 -\> offset=0, limit=0 (remaining 5 offset + 10 limit consumed)
   * Range 4: itemCount=5 -\> offset=0, limit=0 (no items left to consume)
   * 
   * @param partitionKeyRangeMap - The partition key range map to update
   * @param initialOffset - Initial offset value
   * @param initialLimit - Initial limit value  
   * @returns Updated partition key range map with offset/limit values for each range
   */
  public static calculateOffsetLimitForEachPartitionRange(
    partitionKeyRangeMap: Map<string, any>,
    initialOffset: number,
    initialLimit: number
  ): Map<string, any> {
    if (!partitionKeyRangeMap || partitionKeyRangeMap.size === 0) {
      return partitionKeyRangeMap;
    }

    const updatedMap = new Map<string, any>();
    let currentOffset = initialOffset;
    let currentLimit = initialLimit;

    // Process each partition range in order to calculate cumulative offset/limit consumption
    for (const [rangeId, rangeMapping] of partitionKeyRangeMap) {
      const { itemCount } = rangeMapping;
      
      // Calculate what offset/limit would be after completely consuming this partition range
      let offsetAfterThisRange = currentOffset;
      let limitAfterThisRange = currentLimit;
      if (itemCount > 0) {
        if (currentOffset > 0) {
          // Items from this range will be consumed by offset first
          const offsetConsumption = Math.min(currentOffset, itemCount);
          offsetAfterThisRange = currentOffset - offsetConsumption;
          
          // Calculate remaining items in this range after offset consumption
          const remainingItemsAfterOffset = itemCount - offsetConsumption;

          if (remainingItemsAfterOffset > 0 && currentLimit > 0) {
            // Remaining items will be consumed by limit
            const limitConsumption = Math.min(currentLimit, remainingItemsAfterOffset);
            limitAfterThisRange = currentLimit - limitConsumption;
          } else {
            // No remaining items or no limit left
            limitAfterThisRange = currentLimit;
          }
        } else if (currentLimit > 0) {
          // Offset is already 0, all items from this range will be consumed by limit
          const limitConsumption = Math.min(currentLimit, itemCount);
          limitAfterThisRange = currentLimit - limitConsumption;
          offsetAfterThisRange = 0; // Offset remains 0
        }
        
        // Update current values for next iteration
        currentOffset = offsetAfterThisRange;
        currentLimit = limitAfterThisRange;
      }

      // Store the calculated offset/limit values in the range mapping
      updatedMap.set(rangeId, {
        ...rangeMapping,
        offset: offsetAfterThisRange,
        limit: limitAfterThisRange,
      });
    }

    return updatedMap;
  }
}
