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
  private addPartitionRangeMapping(rangeId: string, mapping: QueryRangeMapping): void {
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
      if (!mapping) {
        return false;
      }
      const isExhausted = this.isPartitionExhausted(mapping.continuationToken);

      if (isExhausted) {
        return false; 
      }
      return true; 
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
    let endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | null = null;
    let rangeIndex = 0;
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      rangeIndex++;
      const { itemCount } = value;
      // Check if this complete range fits within remaining page size capacity
      if (endIndex + itemCount <= pageSize) {
        lastRangeBeforePageLimit = value;
        endIndex += itemCount;
        processedRanges.push(rangeId);
      } else {
        break;
      }
    }
    
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
      if (endIndex + itemCount <= pageSize) {
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
