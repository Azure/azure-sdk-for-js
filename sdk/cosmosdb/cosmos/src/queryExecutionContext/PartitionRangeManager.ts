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
  public addPartitionRangeMapping(rangeId: string, mapping: QueryRangeMapping): void {
    if (!this.partitionKeyRangeMap.has(rangeId)) {
      this.partitionKeyRangeMap.set(rangeId, mapping);
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
        this.addPartitionRangeMapping(rangeId, mapping);
      }
    }
  }

  /**
   * Resets and initializes the partition key range map with new mappings
   * @param partitionKeyRangeMap - New partition key range map to set
   */
  public resetInitializePartitionKeyRangeMap(
    partitionKeyRangeMap: Map<string, QueryRangeMapping>,
  ): void {
    this.partitionKeyRangeMap = partitionKeyRangeMap;
  }

  /**
   * Checks if there are any unprocessed ranges in the sliding window
   */
  public hasUnprocessedRanges(): boolean {
    const mapSize = this.partitionKeyRangeMap.size;
    const result = mapSize > 0;
    // console.log("=== PartitionRangeManager hasUnprocessedRanges DEBUG ===");
    console.log("partitionKeyRangeMap.size:", mapSize);
    console.log("result:", result);
    if (result) {
      console.log("Range IDs in map:", Array.from(this.partitionKeyRangeMap.keys()));
    }
    // console.log("=== END PartitionRangeManager hasUnprocessedRanges DEBUG ===");
    return result;
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
  public processOrderByRanges(pageSize: number): {
    endIndex: number;
    processedRanges: string[];
    lastRangeBeforePageLimit: QueryRangeMapping | null;
  } {
    console.log("=== Processing ORDER BY Query (Sequential Mode) ===");
    console.log(`INPUT: pageSize=${pageSize}, partitionKeyRangeMap.size=${this.partitionKeyRangeMap.size}`);

    let endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | null = null;

    // Log all ranges before processing
    console.log("=== ALL RANGES BEFORE PROCESSING ===");
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      console.log(`Range ${rangeId}: itemCount=${value.itemCount}, continuationToken=${value.continuationToken ? 'EXISTS' : 'NULL'}`);
    }

    // Process ranges sequentially until page size is reached
    let rangeIndex = 0;
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      rangeIndex++;
      console.log(`=== Processing ORDER BY Range ${rangeIndex}/${this.partitionKeyRangeMap.size}: ${rangeId} ===`);

      const { itemCount } = value;
      console.log(`ORDER BY Range ${rangeId}: itemCount=${itemCount}`);
      console.log(`ORDER BY Range ${rangeId}: continuationToken=${value.continuationToken || 'NULL'}`);
      console.log(`ORDER BY Range ${rangeId}: partitionKeyRange=${JSON.stringify(value.partitionKeyRange || {})}`);
      console.log(`Current state: endIndex=${endIndex}, pageSize=${pageSize}, remaining_capacity=${pageSize - endIndex}`);

      // Check if this complete range fits within remaining page size capacity
      if (endIndex + itemCount <= pageSize) {
        // This range fits completely - consume it entirely and mark as processed
        lastRangeBeforePageLimit = value;
        endIndex += itemCount;
        processedRanges.push(rangeId);
        console.log(`✓ ORDER BY Range ${rangeId}: CONSUMED COMPLETELY (${itemCount} items)`);
        console.log(`✓ Updated endIndex=${endIndex}, processedRanges count=${processedRanges.length}`);
        console.log(`✓ Range ${rangeId} will be saved for continuation: partitionKeyRange=${JSON.stringify(value.partitionKeyRange || {})}`);
      } else {
        // Page limit reached - store the last complete range in continuation token
        const remainingCapacity = pageSize - endIndex;
        console.log(`❌ ORDER BY Range ${rangeId}: SKIPPED - Would exceed page limit`);
        console.log(`❌ Range has ${itemCount} items but only ${remainingCapacity} capacity remaining`);
        console.log(`❌ THIS IS WHERE DATA LOSS OCCURS - ${itemCount} items from this range are NEVER processed`);
        console.log(`❌ LOST Range ${rangeId} partitionKeyRange: ${JSON.stringify(value.partitionKeyRange || {})}`);
        console.log(`❌ LOST Range ${rangeId} continuationToken: ${value.continuationToken || 'NULL'}`);
        break;
      }
    }

    console.log("=== ORDER BY PROCESSING COMPLETE ===");
    console.log(`RESULT: endIndex=${endIndex}, processedRanges=${processedRanges.length}, lastRangeBeforePageLimit=${lastRangeBeforePageLimit ? 'EXISTS' : 'NULL'}`);
    console.log(`PROCESSED RANGES: [${processedRanges.join(', ')}]`);
    
    return { endIndex, processedRanges, lastRangeBeforePageLimit };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  public processParallelRanges(pageSize: number): {
    endIndex: number;
    processedRanges: string[];
    processedRangeMappings: QueryRangeMapping[];
    lastPartitionBeforeCutoff?: { rangeId: string; mapping: QueryRangeMapping };
  } {
    let endIndex = 0;
    const processedRanges: string[] = [];
    const processedRangeMappings: QueryRangeMapping[] = [];
    let rangesAggregatedInCurrentToken = 0;
    let lastPartitionBeforeCutoff: { rangeId: string; mapping: QueryRangeMapping } | undefined;

    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      rangesAggregatedInCurrentToken++;

      // Validate range data
      if (!value || value.itemCount === undefined) {
        continue;
      }

      const { itemCount } = value;
      console.log(`Processing Parallel Range ${rangeId}: itemCount ${itemCount}`);

      // Skip empty ranges (0 items)
      if (itemCount === 0) {
        processedRanges.push(rangeId);
        processedRangeMappings.push(value);
        rangesAggregatedInCurrentToken++;
        continue;
      }

      // Check if this complete range fits within remaining page size capacity
      if (endIndex + itemCount <= pageSize) {
        // Track this as the last partition before potential cutoff
        lastPartitionBeforeCutoff = { rangeId, mapping: value };
        endIndex += itemCount;
        processedRanges.push(rangeId);
        processedRangeMappings.push(value);
      } else {
        break; // No more ranges can fit, exit loop
      }
    }

    return { endIndex, processedRanges, processedRangeMappings, lastPartitionBeforeCutoff };
  }
}
