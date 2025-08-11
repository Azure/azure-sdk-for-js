// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { getInitialHeader, mergeHeaders } from "../headerUtils.js";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number,
  ) {}

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
      response.result.buffer === undefined
    ) {
      return { result: undefined, headers: response.headers };
    }
    const initialOffset = this.offset;
    const initialLimit = this.limit;

    for (const item of response.result.buffer) {
      if (this.offset > 0) {
        this.offset--;
      } else if (this.limit > 0) {
        buffer.push(item);
        this.limit--;
      }
    }

    // Update partition key range map based on offset/limit processing
    const removedOffset = initialOffset - this.offset;
    let updatedPartitionKeyRangeMap = this.updatePartitionKeyRangeMap(
      response.result.partitionKeyRangeMap,
      removedOffset, // items excluded
      true // exclude flag
    );

    const removedLimit = initialLimit - this.limit;
     updatedPartitionKeyRangeMap = this.updatePartitionKeyRangeMap(
      updatedPartitionKeyRangeMap,
      removedLimit,
      false
     )
     // if something remains in buffer remove it
     const remainingValue = response.result.buffer.length - (initialOffset + initialiLimit);
     if(this.limit <= 0){
       updatedPartitionKeyRangeMap = this.updatePartitionKeyRangeMap(
      updatedPartitionKeyRangeMap,
      remainingValue,
      true
     )
     }

    return { result: {buffer: buffer, partitionKeyRangeMap: updatedPartitionKeyRangeMap, offset: this.offset, limit: this.limit}, headers: aggregateHeaders };
  }

  /**
   * Helper method to update partitionKeyRangeMap based on excluded/included items
   * @param partitionKeyRangeMap - Original partition key range map
   * @param itemCount - Number of items to exclude/include
   * @param exclude - true to exclude items from start, false to include items from start
   * @returns Updated partition key range map
   */
  private updatePartitionKeyRangeMap(
    partitionKeyRangeMap: Map<string, any>,
    itemCount: number,
    exclude: boolean
  ): Map<string, any> {
    if (!partitionKeyRangeMap || partitionKeyRangeMap.size === 0 || itemCount <= 0) {
      return partitionKeyRangeMap;
    }

    const updatedMap = new Map<string, any>();
    let remainingItems = itemCount;

    for (const [patchId, patch] of partitionKeyRangeMap) {
      const [startIndex, endIndex] = patch.indexes;
      
      // Handle special case for empty result sets
      if (startIndex === -1 && endIndex === -1) {
        updatedMap.set(patchId, { ...patch });
        continue;
      }

      const rangeSize = endIndex - startIndex + 1;

      if (exclude) {
        // Exclude items from the beginning
        if (remainingItems <= 0) {
          // No more items to exclude, keep this range
        } else if (remainingItems >= rangeSize) {
          // Exclude entire range
          remainingItems -= rangeSize;
          updatedMap.set(patchId, {
            ...patch,
            indexes: [-1, -1] // Mark as completely excluded
          });
        } else {
          // Partially exclude this range
          const includedItems = rangeSize - remainingItems;
          updatedMap.set(patchId, {
            ...patch,
            indexes: [startIndex + includedItems, endIndex]
          });
          remainingItems = 0;
        }
      } else {
        // Include items from the beginning
        if (remainingItems <= 0) {
          // No more items to include, mark remaining as excluded
          updatedMap.set(patchId, {
            ...patch,
            indexes: [-1, -1]
          });
        } else if (remainingItems >= rangeSize) {
          // Include entire range
          remainingItems -= rangeSize;
        } else {
          // Partially include this range
          updatedMap.set(patchId, {
            ...patch,
            indexes: [startIndex , endIndex - remainingItems]
          });
          remainingItems = 0;
        }
      }
    }

    return updatedMap;
  }
}
