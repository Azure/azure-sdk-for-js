// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import { CompositeQueryContinuationToken } from "./QueryRangeMapping.js";

/**
 * Strategy for filtering partition ranges in parallel query execution context
 * Supports resuming from composite continuation tokens with multi-range aggregation
 * @hidden
 */
export class ParallelQueryRangeStrategy implements TargetPartitionRangeStrategy {
  getStrategyType(): string {
    return "ParallelQuery";
  }

  validateContinuationToken(continuationToken: string): boolean {
    // Check for null, undefined, or empty string inputs
    if (!continuationToken) {
      return false;
    }
    
    try {
      const parsed = JSON.parse(continuationToken);
      // Check if it's a composite continuation token (has rangeMappings)
      if (!parsed || !Array.isArray(parsed.rangeMappings)) {
        return false;
      }
      
      // Validate each range mapping has a non-null partitionKeyRange
      for (const rangeMapping of parsed.rangeMappings) {
        if (!rangeMapping || !rangeMapping.partitionKeyRange) {
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string
  ): PartitionRangeFilterResult {
    console.log("=== ParallelQueryRangeStrategy.filterPartitionRanges START ===")

    if(!targetRanges || targetRanges.length === 0) {
      return { filteredRanges: [] };
    }

    // If no continuation token, return all ranges
    if (!continuationToken) {
      return {
        filteredRanges: targetRanges,
      };
    }

    // Validate and parse continuation token
    if (!this.validateContinuationToken(continuationToken)) {
      throw new Error(
        `Invalid continuation token format for parallel query strategy: ${continuationToken}`,
      );
    }

    let compositeContinuationToken: CompositeQueryContinuationToken;
    try {
      compositeContinuationToken = CompositeQueryContinuationToken.fromString(continuationToken);
    } catch (error) {
      throw new Error(`Failed to parse composite continuation token: ${error.message}`);
    }

    console.log(
      `Parsed composite continuation token with ${compositeContinuationToken.rangeMappings.length} range mappings`,
    );

    const filteredRanges: PartitionKeyRange[] = [];
    const continuationTokens: string[] = [];
    let lastProcessedRange: PartitionKeyRange | null = null;
    
    // sort compositeContinuationToken.rangeMappings in ascending order using their minInclusive values
    compositeContinuationToken.rangeMappings = compositeContinuationToken.rangeMappings.sort(
      (a, b) => {
        return a.partitionKeyRange.minInclusive.localeCompare(b.partitionKeyRange.minInclusive);
      },
    );

    for (const rangeMapping of compositeContinuationToken.rangeMappings) {
      const { partitionKeyRange, continuationToken: rangeContinuationToken } = rangeMapping;
      // Always track the last processed range, even if it's exhausted
      lastProcessedRange = partitionKeyRange;
      
      if (partitionKeyRange && !this.isPartitionExhausted(rangeContinuationToken)) {
        // Create a partition range structure similar to target ranges using the continuation token data
        // Preserve EPK boundaries if they exist in the extended partition key range
        const partitionRangeFromToken: PartitionKeyRange = {
          id: partitionKeyRange.id,
          minInclusive: partitionKeyRange.minInclusive,
          maxExclusive: partitionKeyRange.maxExclusive,
          ridPrefix: partitionKeyRange.ridPrefix ,
          throughputFraction: partitionKeyRange.throughputFraction ,
          status: partitionKeyRange.status ,
          parents: partitionKeyRange.parents ,
          // Preserve EPK boundaries from continuation token if available
          ...(partitionKeyRange.epkMin && { epkMin: partitionKeyRange.epkMin }),
          ...(partitionKeyRange.epkMax && { epkMax: partitionKeyRange.epkMax }),
        };
        
        filteredRanges.push(partitionRangeFromToken);
        continuationTokens.push(rangeContinuationToken);
        
        console.log(
          `Added range from continuation token: ${partitionKeyRange.id} [${partitionKeyRange.minInclusive}, ${partitionKeyRange.maxExclusive})` +
          (partitionKeyRange.epkMin && partitionKeyRange.epkMax ? ` with EPK [${partitionKeyRange.epkMin}, ${partitionKeyRange.epkMax})` : '')
        );
      } else {
        console.log(
          `Skipping exhausted range: ${partitionKeyRange?.id} [${partitionKeyRange?.minInclusive}, ${partitionKeyRange?.maxExclusive})`
        );
      }
    }

    // Add any new target ranges that come after the last processed range
    if (lastProcessedRange) {
      for (const targetRange of targetRanges) {
        // Only include ranges whose minInclusive value is greater than or equal to maxExclusive of lastProcessedRange
        if (targetRange.minInclusive >= lastProcessedRange.maxExclusive) {
          filteredRanges.push(targetRange);
          continuationTokens.push(undefined);
          console.log(
            `Added new range (after last processed range): ${targetRange.id} [${targetRange.minInclusive}, ${targetRange.maxExclusive})`,
          );
        }
      }
    } else {
      // If no ranges were processed from continuation token, add all target ranges
      filteredRanges.push(...targetRanges);
      continuationTokens.push(...targetRanges.map((): undefined => undefined));
      console.log("No ranges found in continuation token - returning all target ranges");
    }

    console.log(`=== ParallelQueryRangeStrategy Summary ===`);
    console.log(`Total filtered ranges: ${filteredRanges.length}`);
    console.log("=== ParallelQueryRangeStrategy.filterPartitionRanges END ===");

    return {
      filteredRanges,
      continuationToken: continuationTokens,
    };
  }

  /**
   * Checks if a partition is exhausted based on its continuation token
   */
  private isPartitionExhausted(continuationToken: string | null): boolean {
    return (
      !continuationToken ||
      continuationToken === "" ||
      continuationToken === null ||
      continuationToken.toLowerCase() === "null"
    );
  }
}
