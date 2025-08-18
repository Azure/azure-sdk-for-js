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
    try {
      const parsed = JSON.parse(continuationToken);
      // Check if it's a composite continuation token (has rangeMappings)
      return parsed && Array.isArray(parsed.rangeMappings);
    } catch {
      return false;
    }
  }

  async filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string
  ): Promise<PartitionRangeFilterResult> {
    console.log("=== ParallelQueryRangeStrategy.filterPartitionRanges START ===");
    console.log(
      `Input ranges: ${targetRanges.length}, Continuation token: ${continuationToken ? "Present" : "None"}`,
    );

    // If no continuation token, return all ranges
    if (!continuationToken) {
      console.log("No continuation token - returning all ranges");

      console.log("=== ParallelQueryRangeStrategy.filterPartitionRanges END ===");
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
    // sort compositeContinuationToken.rangeMappings in ascending order using their minInclusive values
    compositeContinuationToken.rangeMappings = compositeContinuationToken.rangeMappings.sort(
      (a, b) => {
        return a.partitionKeyRange.minInclusive.localeCompare(b.partitionKeyRange.minInclusive);
      },
    );
    // find the corresponding match of range mappings in targetRanges, we are looking for exact match using minInclusive and maxExclusive values

    for (const rangeMapping of compositeContinuationToken.rangeMappings) {
      const { partitionKeyRange, continuationToken: rangeContinuationToken } = rangeMapping;
      // rangeContinuationToken should be present otherwise partition will be considered exhausted and not
      // considered further
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
      }
    }

    // Add any new ranges whose value is greater than last element of filteredRanges
    if (filteredRanges.length === 0) {
      // If filteredRanges is empty, add all remaining target ranges
      filteredRanges.push(...targetRanges);
      continuationTokens.push(...targetRanges.map((): undefined => undefined));
      console.log("No matching ranges found - returning all target ranges");
      console.log(`Total filtered ranges: ${filteredRanges.length}`);
      console.log("=== ParallelQueryRangeStrategy.filterPartitionRanges END ===");
      return {
        filteredRanges,
        continuationToken: continuationTokens,
      };
    }
    const lastFilteredRange = filteredRanges[filteredRanges.length - 1];
    for (const targetRange of targetRanges) {
      // Only include ranges whose minInclusive value is greater than maxExclusive of lastFilteredRange
      if (targetRange.minInclusive >= lastFilteredRange.maxExclusive) {
        filteredRanges.push(targetRange);
        continuationTokens.push(undefined);
        console.log(
          `Added new range (after last filtered range): ${targetRange.id} [${targetRange.minInclusive}, ${targetRange.maxExclusive})`,
        );
      }
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
      continuationToken === "null" ||
      continuationToken.toLowerCase() === "null"
    );
  }
}
