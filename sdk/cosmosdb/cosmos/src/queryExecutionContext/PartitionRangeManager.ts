// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeWithContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";

/**
 * Checks if a continuation token indicates an exhausted partition.
 * @param continuationToken - The continuation token to check
 * @returns true if the partition is exhausted (null, empty, or "null" string)
 * @hidden
 */
export function isPartitionExhausted(continuationToken: string | undefined): boolean {
  return (
    !continuationToken ||
    continuationToken === "" ||
    continuationToken === "null" ||
    continuationToken.toLowerCase() === "null"
  );
}

export function isPartitionRangeActive(
  continuationToken: string | undefined,
  isActive?: boolean,
): boolean {
  return isActive ?? !isPartitionExhausted(continuationToken);
}

/**
 * Manages partition key range mappings for query execution.
 * Handles range operations, offset/limit processing, and distinct query logic.
 * @hidden
 */
export class PartitionRangeManager {
  private partitionKeyRangeMap: Map<string, QueryRangeMapping> = new Map();

  constructor(initialPartitionKeyRangeMap?: Map<string, QueryRangeMapping>) {
    if (initialPartitionKeyRangeMap) {
      this.partitionKeyRangeMap = new Map(initialPartitionKeyRangeMap);
    }
  }

  /**
   * Gets a copy of the current partition key range map for constructor pattern
   */
  public getPartitionKeyRangeMap(): Map<string, QueryRangeMapping> {
    return new Map(this.partitionKeyRangeMap);
  }

  public clear(): void {
    this.partitionKeyRangeMap.clear();
  }

  /**
   * Adds or replaces a response-local range mapping.
   * Mapping keys are response-local numeric or composite logical-range identifiers. The latest
   * observation for the same key is authoritative within the current response.
   * @param mappingKey - Response-local key for the range mapping
   * @param mapping - The QueryRangeMapping to add
   */
  private addPartitionRangeMapping(mappingKey: string, mapping: QueryRangeMapping): void {
    this.partitionKeyRangeMap.set(mappingKey, mapping);
  }

  /**
   * Removes a range mapping from the partition key range map
   */
  public removePartitionRangeMapping(mappingKey: string): void {
    this.partitionKeyRangeMap.delete(mappingKey);
  }

  /**
   * Updates the partition key range map with new mappings from the endpoint response
   * @param partitionKeyRangeMap - Map of response-local keys to QueryRangeMapping objects
   */
  public addPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    if (partitionKeyRangeMap) {
      for (const [mappingKey, mapping] of partitionKeyRangeMap) {
        this.addPartitionRangeMapping(mappingKey, mapping);
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
      const isExhausted = isPartitionExhausted(mapping.continuationToken);

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
    for (const [mappingKey, value] of this.partitionKeyRangeMap) {
      rangeIndex++;
      const { itemCount } = value;
      // Check if this complete range fits within remaining page size capacity
      if (endIndex + itemCount <= pageSize) {
        lastRangeBeforePageLimit = value;
        endIndex += itemCount;
        processedRanges.push(mappingKey);
      } else {
        break;
      }
    }

    return { endIndex, processedRanges, lastRangeBeforePageLimit };
  }

  public processEmptyOrderByRanges(ranges: QueryRangeWithContinuationToken[]): {
    endIndex: number;
    processedRanges: string[];
    lastRangeBeforePageLimit: QueryRangeMapping | undefined;
  } {
    const endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | undefined;

    // since there is no data returned add all the ids to processed ranges
    for (const [mappingKey, _] of this.partitionKeyRangeMap) {
      processedRanges.push(mappingKey);
    }
    // search for matching range in the map(min max value exact match) and return that as lastRangeBeforePageLimit
    for (const [_, mapping] of this.partitionKeyRangeMap) {
      if (
        mapping.partitionKeyRange!.minInclusive === ranges[0].queryRange.min &&
        mapping.partitionKeyRange!.maxExclusive === ranges[0].queryRange.max
      ) {
        lastRangeBeforePageLimit = mapping;
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

    for (const [mappingKey, value] of this.partitionKeyRangeMap) {
      rangesAggregatedInCurrentToken++;

      // Validate range data
      if (!value || value.itemCount === undefined) {
        continue;
      }

      const { itemCount } = value;

      // ASSUMPTION: Backend should respect maxItemCount and return pageSize or fewer items per partition.
      // The logic below expects itemCount (items from a partition) to be <= pageSize.
      // KNOWN ISSUE: Backend currently violates this contract for non-streaming queries (e.g., hybrid queries),
      // returning more items per partition than maxItemCount specified. This causes pagination logic to fail,
      // as ranges with itemCount > pageSize cannot fit and result in endIndex=0.
      if (endIndex + itemCount <= pageSize) {
        lastPartitionBeforeCutoff = { rangeId: mappingKey, mapping: value };
        endIndex += itemCount;
        processedRanges.push(mappingKey);
        processedRangeMappings.push(value);
      } else {
        break; // No more ranges can fit, exit loop
      }
    }

    return { endIndex, processedRanges, processedRangeMappings, lastPartitionBeforeCutoff };
  }
}
