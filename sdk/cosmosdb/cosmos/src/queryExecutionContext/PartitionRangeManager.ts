// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "./QueryRangeMapping.js";

/**
 * Manages partition key range mappings for query execution.
 * Handles range operations, offset/limit processing, and distinct query logic.
 * @hidden
 */
export class PartitionRangeManager {
  private partitionKeyRangeMap: Map<string, QueryRangeMapping> = new Map();

  /**
   * Gets the partition key range map
   */
  public getPartitionKeyRangeMap(): Map<string, QueryRangeMapping> {
    return this.partitionKeyRangeMap;
  }

  /**
   * Clears the range map
   */
  public clearRangeMappings(): void {
    this.partitionKeyRangeMap.clear();
  }

  /**
   * Checks if a continuation token indicates an exhausted partition
   * @param continuationToken - The continuation token to check
   * @returns true if the partition is exhausted (null, empty, or "null" string)
   */
  private isPartitionExhausted(continuationToken: string | null): boolean {
    return (
      !continuationToken ||
      continuationToken === "" ||
      continuationToken === "null" ||
      continuationToken.toLowerCase() === "null"
    );
  }

  /**
   * Adds a range mapping to the partition key range map
   * Does not allow updates to existing keys - only new additions
   * @param rangeId - Unique identifier for the partition range
   * @param mapping - The QueryRangeMapping to add
   */
  public updatePartitionRangeMapping(rangeId: string, mapping: QueryRangeMapping): void {
    if (!this.partitionKeyRangeMap.has(rangeId)) {
      this.partitionKeyRangeMap.set(rangeId, mapping);
    } else {
      console.warn(
        ` Attempted to update existing range mapping for rangeId: ${rangeId}. ` +
          `Updates are not allowed - only new additions. The existing mapping will be preserved.`,
      );
    }
  }

  /**
   * Removes a range mapping from the partition key range map
   */
  public removePartitionRangeMapping(rangeId: string): void {
    this.partitionKeyRangeMap.delete(rangeId);
  }

  /**
   * Updates the partition key range map with new mappings from the endpoint response
   * @param partitionKeyRangeMap - Map of range IDs to QueryRangeMapping objects
   */
  public setPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    if (partitionKeyRangeMap) {
      for (const [rangeId, mapping] of partitionKeyRangeMap) {
        this.updatePartitionRangeMapping(rangeId, mapping);
      }
    }
  }

  /**
   * Resets and initializes the partition key range map with new mappings
   * @param partitionKeyRangeMap - New partition key range map to set
   */
  public resetInitializePartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    this.partitionKeyRangeMap = partitionKeyRangeMap;
  }

  /**
   * Checks if there are any unprocessed ranges in the sliding window
   */
  public hasUnprocessedRanges(): boolean {
    return this.partitionKeyRangeMap.size > 0;
  }

  /**
   * Removes exhausted(fully drained) ranges from the given range mappings
   * @param rangeMappings - Array of range mappings to filter
   * @returns Filtered array without exhausted ranges
   */
  public removeExhaustedRanges(rangeMappings: QueryRangeMapping[]): QueryRangeMapping[] {
    if (!rangeMappings || !Array.isArray(rangeMappings)) {
      return [];
    }

    return rangeMappings.filter((mapping) => {
      // Check if mapping is valid
      if (!mapping) {
        return false;
      }
      // Check if this mapping has an exhausted continuation token
      const isExhausted = this.isPartitionExhausted(mapping.continuationToken);

      if (isExhausted) {
        return false; // Filter out exhausted mappings
      }
      return true; // Keep non-exhausted mappings
    });
  }

  /**
   * Processes ranges for ORDER BY queries
   */
  public processOrderByRanges(
    pageSize: number,
    currentBufferLength: number,
    orderByItemsArray?: any[][],
  ): { endIndex: number; processedRanges: string[]; lastRangeBeforePageLimit: QueryRangeMapping | null } {
    console.log("=== Processing ORDER BY Query (Sequential Mode) ===");

    // ORDER BY queries require orderByItemsArray to be present and non-empty
    if (!orderByItemsArray || orderByItemsArray.length === 0) {
      throw new Error(
        "ORDER BY query processing failed: orderByItemsArray is required but was not provided or is empty"
      );
    }

    let endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | null = null;

    // Process ranges sequentially until page size is reached
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      console.log(`=== Processing ORDER BY Range ${rangeId} ===`);

      // Validate range data
      if (!value || value.itemCount === undefined) {
        continue;
      }

      const { itemCount } = value;
      console.log(`ORDER BY Range ${rangeId}: itemCount ${itemCount}`);

      // Skip empty ranges (0 items)
      if (itemCount === 0) {
        processedRanges.push(rangeId);
        continue;
      }

      // Check if this complete range fits within remaining page size capacity
      if (endIndex + itemCount <= pageSize) {
        // Store this as the potential last range before limit
        lastRangeBeforePageLimit = value;
        endIndex += itemCount;
        processedRanges.push(rangeId);

        console.log(
          `✅ ORDER BY processed range ${rangeId} (itemCount: ${itemCount}). New endIndex: ${endIndex}`,
        );
      } else {
        // Page limit reached - store the last complete range in continuation token
        break;
      }
    }

    return { endIndex, processedRanges, lastRangeBeforePageLimit };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  public processParallelRanges(
    pageSize: number,
    currentBufferLength: number,
  ): { endIndex: number; processedRanges: string[]; lastPartitionBeforeCutoff?: { rangeId: string; mapping: QueryRangeMapping } } {

    let endIndex = 0;
    const processedRanges: string[] = [];
    let rangesAggregatedInCurrentToken = 0;
    let lastPartitionBeforeCutoff: { rangeId: string; mapping: QueryRangeMapping } | undefined;

    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      rangesAggregatedInCurrentToken++;
      console.log(
        `=== Processing Parallel Range ${rangeId} (${rangesAggregatedInCurrentToken}/${this.partitionKeyRangeMap.size}) ===`,
      );

      // Validate range data
      if (!value || value.itemCount === undefined) {
        continue;
      }

      const { itemCount } = value;
      console.log(`Processing Parallel Range ${rangeId}: itemCount ${itemCount}`);

      // Skip empty ranges (0 items)
      if (itemCount === 0) {
        processedRanges.push(rangeId);
        rangesAggregatedInCurrentToken++;
        continue;
      }

      // Check if this complete range fits within remaining page size capacity
      if (endIndex + itemCount <= pageSize) {
        // Track this as the last partition before potential cutoff
        lastPartitionBeforeCutoff = { rangeId, mapping: value };
        endIndex += itemCount;
        processedRanges.push(rangeId);
      } else {
        break; // No more ranges can fit, exit loop
      }
    }

    return { endIndex, processedRanges, lastPartitionBeforeCutoff };
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
  public calculateOffsetLimitForEachPartitionRange(
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
          // TODO: Updat itemCount when offset actually utilises that range during slicing 

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

  /**
   * Helper method to update partitionKeyRangeMap based on excluded/included items.
   * This maintains the precise tracking of which partition ranges have been consumed
   * by offset/limit operations, essential for accurate continuation token generation.
   * 
   * @param partitionKeyRangeMap - Original partition key range map
   * @param itemCount - Number of items to exclude/include
   * @param exclude - true to exclude items from start, false to include items from start
   * @returns Updated partition key range map
   */
  public updatePartitionKeyRangeMapForOffsetLimit(
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
      const rangeItemCount = patch.itemCount || 0;
      
      // Handle special case for empty result sets
      if (rangeItemCount === 0) {
        updatedMap.set(patchId, { ...patch });
        continue;
      }

      if (exclude) {
        // Exclude items from the beginning
        if (remainingItems <= 0) {
          // No more items to exclude, keep this range with original item count
          updatedMap.set(patchId, { ...patch });
        } else if (remainingItems >= rangeItemCount) {
          // Exclude entire range
          remainingItems -= rangeItemCount;
          updatedMap.set(patchId, {
            ...patch,
            itemCount: 0 // Mark as completely excluded
          });
        } else {
          // Partially exclude this range
          const includedItems = rangeItemCount - remainingItems;
          updatedMap.set(patchId, {
            ...patch,
            itemCount: includedItems
          });
          remainingItems = 0;
        }
      } else {
        // Include items from the beginning
        if (remainingItems <= 0) {
          // No more items to include, mark remaining as excluded
          updatedMap.set(patchId, {
            ...patch,
            itemCount: 0
          });
        } else if (remainingItems >= rangeItemCount) {
          // Include entire range
          remainingItems -= rangeItemCount;
          updatedMap.set(patchId, { ...patch });
        } else {
          // Partially include this range
          updatedMap.set(patchId, {
            ...patch,
            itemCount: remainingItems
          });
          remainingItems = 0;
        }
      }
    }

    return updatedMap;
  }

  /**
   * Processes offset/limit logic and updates partition key range map accordingly.
   * This method handles the logic of tracking which items from which partitions
   * have been consumed by offset/limit operations, maintaining accurate continuation state.
   * Also calculates what offset/limit would be after completely consuming each partition range.
   * 
   * @param initialOffset - Initial offset value before processing
   * @param finalOffset - Final offset value after processing
   * @param initialLimit - Initial limit value before processing
   * @param finalLimit - Final limit value after processing
   * @param bufferLength - Total length of the buffer that was processed
   */
  public processOffsetLimitAndUpdateRangeMap(
    initialOffset: number,
    finalOffset: number,
    initialLimit: number,
    finalLimit: number,
    bufferLength: number
  ): void {
    if (!this.partitionKeyRangeMap || this.partitionKeyRangeMap.size === 0) {
      return;
    }

    // Calculate and store offset/limit values for each partition range after complete consumption
    const updatedPartitionKeyRangeMap = this.calculateOffsetLimitForEachPartitionRange(
      this.partitionKeyRangeMap,
      initialOffset,
      initialLimit
    );

    // Update the internal partition key range map with the processed mappings
    this.resetInitializePartitionKeyRangeMap(updatedPartitionKeyRangeMap);
  }

  /**
   * Processes distinct query logic and updates partition key range map with hashedLastResult.
   * This method handles the complex logic of tracking the last hash value for each partition range
   * in distinct queries, essential for proper continuation token generation.
   * 
   * @param originalBuffer - Original buffer from execution context before distinct filtering
   * @param hashObject - Hash function to compute hash of items
   */
  public async processDistinctQueryAndUpdateRangeMap(
    originalBuffer: any[],
    hashObject: (item: any) => Promise<string>
  ): Promise<void> {
    if (!this.partitionKeyRangeMap || this.partitionKeyRangeMap.size === 0) {
      return;
    }

    // Update partition key range map with hashedLastResult for each range
    let bufferIndex = 0;
    for (const [rangeId, rangeMapping] of this.partitionKeyRangeMap) {
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
          lastHashForThisRange = await hashObject(lastItem);
        }
        // Move buffer index to start of next range
        bufferIndex = rangeEndIndex;
      }
      // Update the range mapping directly in the instance's partition key range map
      const updatedMapping = {
        ...rangeMapping,
        hashedLastResult: lastHashForThisRange,
      };
      this.partitionKeyRangeMap.set(rangeId, updatedMapping);
    }
  }

  /**
   * Extracts and updates hashedLastResult values from partition key range map for distinct order queries
   * @param partitionKeyRangeMap - The partition key range map containing hashedLastResult values
   * @returns The last hashed result found, if any
   */
  public updateHashedLastResultFromPartitionMap(partitionKeyRangeMap: Map<string, any>): string | undefined {
    let lastHashedResult: string | undefined;
    // For distinct order queries, extract hashedLastResult from each partition range
    // and determine the overall last hash for continuation token purposes
    for (const [_rangeId, rangeMapping] of partitionKeyRangeMap) {
      if (rangeMapping.hashedLastResult) {
        lastHashedResult = rangeMapping.hashedLastResult;
      }
    }
    return lastHashedResult;
  }
}
