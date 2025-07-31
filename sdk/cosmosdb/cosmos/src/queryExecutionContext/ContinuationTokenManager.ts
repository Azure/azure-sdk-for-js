// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping, CompositeQueryContinuationToken } from "./QueryRangeMapping.js";
import { CompositeQueryContinuationToken as CompositeQueryContinuationTokenClass } from "./QueryRangeMapping.js";
import type { CosmosHeaders } from "./CosmosHeaders.js";
import { Constants } from "../common/index.js";

/**
 * Manages continuation tokens for multi-partition query execution.
 * Handles composite continuation token creation, range mapping updates, and token serialization.
 * Supports both parallel queries (multi-range aggregation) and ORDER BY queries (single-range sequential).
 * @hidden
 */
export class ContinuationTokenManager {
  private compositeContinuationToken: CompositeQueryContinuationToken;
  private partitionKeyRangeMap: Map<string, QueryRangeMapping> = new Map();
  private isOrderByQuery: boolean = false;

  constructor(
    private readonly collectionLink: string,
    initialContinuationToken?: string,
    isOrderByQuery: boolean = false
  ) {
    this.isOrderByQuery = isOrderByQuery;
    if (initialContinuationToken) {
      // Parse existing continuation token for resumption
      this.compositeContinuationToken = CompositeQueryContinuationTokenClass.fromString(initialContinuationToken);
    } else {
      // Initialize new composite continuation token
      this.compositeContinuationToken = new CompositeQueryContinuationTokenClass(
        this.collectionLink,
        [],
        undefined
      );
    }
  }

  /**
   * Gets the current composite continuation token
   */
  public getCompositeContinuationToken(): CompositeQueryContinuationToken {
    return this.compositeContinuationToken;
  }

  /**
   * Gets the partition key range map
   */
  public getPartitionKeyRangeMap(): Map<string, QueryRangeMapping> {
    return this.partitionKeyRangeMap;
  }

  /**
   * Clears all range mappings from both the composite token and the range map
   */
  public clearRangeMappings(): void {
    this.compositeContinuationToken.rangeMappings = [];
    this.partitionKeyRangeMap.clear();
  }

  /**
   * Adds or updates a range mapping in the partition key range map
   */
  public updatePartitionRangeMapping(rangeId: string, mapping: QueryRangeMapping): void {
    this.partitionKeyRangeMap.set(rangeId, mapping);
  }

  /**
   * Removes a range mapping from the partition key range map
   */
  public removePartitionRangeMapping(rangeId: string): void {
    this.partitionKeyRangeMap.delete(rangeId);
  }

  /**
   * Processes ranges for the current page and builds the continuation token.
   * For parallel queries: Implements sliding window logic with multi-range aggregation.
   * For ORDER BY queries: Uses sequential processing with single-range continuation tokens.
   * 
   * @param pageSize - Maximum number of items per page
   * @param currentBufferLength - Current buffer length for validation
   * @returns Object with endIndex and processedRanges
   */
  public processRangesForCurrentPage(
    pageSize: number, 
    currentBufferLength: number
  ): { endIndex: number; processedRanges: string[] } {
    console.log("=== ContinuationTokenManager.processRangesForCurrentPage START ===");
    console.log(`Query Type: ${this.isOrderByQuery ? 'ORDER BY (sequential)' : 'Parallel (multi-range aggregation)'}`);
    
    if (this.isOrderByQuery) {
      return this.processOrderByRanges(pageSize, currentBufferLength);
    } else {
      return this.processParallelRanges(pageSize, currentBufferLength);
    }
  }

  /**
   * Processes ranges for ORDER BY queries - sequential, single-range continuation tokens
   */
  private processOrderByRanges(
    pageSize: number, 
    currentBufferLength: number
  ): { endIndex: number; processedRanges: string[] } {
    console.log("=== Processing ORDER BY Query (Sequential Mode) ===");
    
    let endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | null = null;
    let lastRangeId: string | null = null;

    // Clear previous continuation token - ORDER BY stores only the last range
    this.compositeContinuationToken.rangeMappings = [];

    // Process ranges sequentially until page size is reached
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      console.log(`=== Processing ORDER BY Range ${rangeId} ===`);

      // Validate range data
      if (!value || !value.indexes || value.indexes.length !== 2) {
        console.warn(`Invalid range data for ${rangeId}, skipping`);
        continue;
      }

      const { indexes } = value;
      console.log(`ORDER BY Range ${rangeId}: indexes [${indexes[0]}, ${indexes[1]}]`);
      
      const startIndex = indexes[0];
      const endRangeIndex = indexes[1];
      const size = endRangeIndex - startIndex + 1; // inclusive range
          
      // Check if this complete range fits within remaining page size capacity
      if (endIndex + size <= pageSize) {
        // Store this as the potential last range before limit
        lastRangeBeforePageLimit = value;
        lastRangeId = rangeId;
        endIndex += size;
        processedRanges.push(rangeId);
        
        console.log(`✅ ORDER BY processed range ${rangeId} (size: ${size}). New endIndex: ${endIndex}`);
      } else {
        // Page limit reached - store the last complete range in continuation token
        break;
      }
    }

    // For ORDER BY: Only store the last range that was completely processed
    if (lastRangeBeforePageLimit && lastRangeId) {
      this.addOrUpdateRangeMapping(lastRangeBeforePageLimit);
      console.log(`✅ ORDER BY stored last range ${lastRangeId} in continuation token`);
    }

    // Log ORDER BY specific metrics
    const orderByMetrics = {
      queryType: "ORDER BY (Sequential)",
      totalRangesProcessed: processedRanges.length,
      lastStoredRange: lastRangeId,
      finalEndIndex: endIndex,
      continuationTokenGenerated: !!this.getTokenString(),
      slidingWindowSize: this.partitionKeyRangeMap.size,
      bufferUtilization: `${endIndex}/${currentBufferLength}`,
      pageCompliance: endIndex <= pageSize,
      sequentialProcessing: "✅ Single-range continuation token"
    };
    
    console.log("=== ORDER BY Query Performance Summary ===", orderByMetrics);
    console.log("=== ORDER BY processRangesForCurrentPage END ===");
    
    return { endIndex, processedRanges };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  private processParallelRanges(
    pageSize: number, 
    currentBufferLength: number
  ): { endIndex: number; processedRanges: string[] } {
    console.log("=== Processing Parallel Query (Multi-Range Aggregation) ===");
    
    let endIndex = 0;
    const processedRanges: string[] = [];
    let rangesAggregatedInCurrentToken = 0;

    // Iterate through partition key ranges in the sliding window
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      rangesAggregatedInCurrentToken++;
      console.log(`=== Processing Parallel Range ${rangeId} (${rangesAggregatedInCurrentToken}/${this.partitionKeyRangeMap.size}) ===`);

      // Validate range data
      if (!value || !value.indexes || value.indexes.length !== 2) {
        console.warn(`Invalid range data for ${rangeId}, skipping`);
        continue;
      }

      const { indexes } = value;
      console.log(`Processing Parallel Range ${rangeId}: indexes [${indexes[0]}, ${indexes[1]}]`);
      
      const startIndex = indexes[0];
      const endRangeIndex = indexes[1];
      const size = endRangeIndex - startIndex + 1; // inclusive range
          
      // Check if this complete range fits within remaining page size capacity
      if (endIndex + size <= pageSize) {
        // Add or update this range mapping in the continuation token
        this.addOrUpdateRangeMapping(value);
        endIndex += size;
        processedRanges.push(rangeId);
        
        console.log(`✅ Aggregated complete range ${rangeId} (size: ${size}) into continuation token. New endIndex: ${endIndex}`);
      } else {
        break; // No more ranges can fit, exit loop
      }
    }

    // Log performance metrics
    const parallelMetrics = {
      queryType: "Parallel (Multi-Range Aggregation)",
      totalRangesProcessed: processedRanges.length,
      rangesAggregatedInCurrentToken: rangesAggregatedInCurrentToken,
      finalEndIndex: endIndex,
      continuationTokenGenerated: !!this.getTokenString(),
      slidingWindowSize: this.partitionKeyRangeMap.size,
      bufferUtilization: `${endIndex}/${currentBufferLength}`,
      pageCompliance: endIndex <= pageSize,
      aggregationEfficiency: `${rangesAggregatedInCurrentToken}/${this.partitionKeyRangeMap.size} ranges per token`,
      parallelismUtilization: rangesAggregatedInCurrentToken > 1 ? "✅ Multi-range aggregation" : "⚠️ Single-range processing"
    };
    
    console.log("=== Parallel Query Performance Summary ===", parallelMetrics);
    console.log("=== Parallel processRangesForCurrentPage END ===");
    
    return { endIndex, processedRanges };
  }

  /**
   * Adds or updates a range mapping in the composite continuation token
   */
  private addOrUpdateRangeMapping(rangeMapping: QueryRangeMapping): void {
    let existingMappingFound = false;
    
    for (const mapping of this.compositeContinuationToken.rangeMappings) {
      if (mapping.partitionKeyRange.minInclusive === rangeMapping.partitionKeyRange.minInclusive &&
          mapping.partitionKeyRange.maxExclusive === rangeMapping.partitionKeyRange.maxExclusive) {
        // Update existing mapping with new indexes and continuation token
        mapping.indexes = rangeMapping.indexes;
        mapping.continuationToken = rangeMapping.continuationToken;
        existingMappingFound = true;
        break;
      }
    }
    
    if (!existingMappingFound) {
      this.compositeContinuationToken.addRangeMapping(rangeMapping);
    }
  }

  /**
   * Gets the continuation token string representation
   */
  public getTokenString(): string | undefined {
    if (this.compositeContinuationToken && this.compositeContinuationToken.rangeMappings.length > 0) {
      return this.compositeContinuationToken.toString();
    }
    return undefined;
  }

  /**
   * Updates response headers with the continuation token
   */
  public updateResponseHeaders(headers: CosmosHeaders): void {
    const tokenString = this.getTokenString();
    if (tokenString) {
      (headers as any)[Constants.HttpHeaders.Continuation] = tokenString;
      console.log("Updated compositeContinuationToken:", tokenString);
    } else {
      headers[Constants.HttpHeaders.Continuation] = undefined;
      console.log("No continuation token set - no ranges with continuation tokens");
    }
  }

  /**
   * Checks if there are any unprocessed ranges in the sliding window
   */
  public hasUnprocessedRanges(): boolean {
    return this.partitionKeyRangeMap.size > 0;
  }

}
