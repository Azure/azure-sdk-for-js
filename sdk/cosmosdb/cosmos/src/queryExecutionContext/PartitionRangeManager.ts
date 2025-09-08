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
  ): { endIndex: number; processedRanges: string[]; lastPartitionBeforeCutoff?: { rangeId: string; mapping: QueryRangeMapping } } {

    let endIndex = 0;
    const processedRanges: string[] = [];
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
}
