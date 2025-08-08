// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping, CompositeQueryContinuationToken } from "./QueryRangeMapping.js";
import { CompositeQueryContinuationToken as CompositeQueryContinuationTokenClass } from "./QueryRangeMapping.js";
import type { OrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { OrderByQueryContinuationToken as OrderByQueryContinuationTokenClass } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
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
  private orderByQueryContinuationToken: OrderByQueryContinuationToken | undefined;
  private orderByItemsArray: any[][] | undefined;

  constructor(
    private readonly collectionLink: string,
    initialContinuationToken?: string,
    isOrderByQuery: boolean = false,
  ) {
    this.isOrderByQuery = isOrderByQuery;
    if (initialContinuationToken) {
      try {
        // Parse existing continuation token for resumption
        console.log(
          `Parsing continuation token for ${isOrderByQuery ? "ORDER BY" : "parallel"} query`,
        );

        if (this.isOrderByQuery) {
          // For ORDER BY queries, the continuation token might be an OrderByQueryContinuationToken
          const parsedToken = JSON.parse(initialContinuationToken);

          // Check if this is an ORDER BY continuation token with compositeToken
          if (parsedToken.compositeToken && parsedToken.orderByItems !== undefined) {
            console.log("Detected ORDER BY continuation token with composite token");
            this.orderByQueryContinuationToken = parsedToken as OrderByQueryContinuationToken;

            // Extract the inner composite token
            this.compositeContinuationToken = CompositeQueryContinuationTokenClass.fromString(
              parsedToken.compositeToken,
            );
          }
        } else {
          // For parallel queries, expect a CompositeQueryContinuationToken directly
          console.log("Parsing parallel query continuation token as composite token");
          this.compositeContinuationToken =
            CompositeQueryContinuationTokenClass.fromString(initialContinuationToken);
        }

        console.log(
          `Successfully parsed ${isOrderByQuery ? "ORDER BY" : "parallel"} continuation token`,
        );
      } catch (error) {
        console.warn(
          `Failed to parse continuation token: ${error.message}, initializing empty token`,
        );
        // Fallback to empty continuation token if parsing fails
        this.compositeContinuationToken = new CompositeQueryContinuationTokenClass(
          this.collectionLink,
          [],
          undefined,
        );
      }
    } else {
      // Initialize new composite continuation token
      this.compositeContinuationToken = new CompositeQueryContinuationTokenClass(
        this.collectionLink,
        [],
        undefined,
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
   * Sets the ORDER BY items array for ORDER BY continuation token creation
   * @param orderByItemsArray - Array of ORDER BY items for each document
   */
  public setOrderByItemsArray(orderByItemsArray: any[][] | undefined): void {
    this.orderByItemsArray = orderByItemsArray;
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
   * Removes exhausted(fully drained) ranges from the composite continuation token range mappings
   */
  private removeExhaustedRangesFromCompositeContinuationToken(): void {
    // Validate composite continuation token and range mappings array
    if (!this.compositeContinuationToken?.rangeMappings?.length) {
      return;
    }

    // Filter out exhausted ranges from the composite continuation token
    this.compositeContinuationToken.rangeMappings =
      this.compositeContinuationToken.rangeMappings.filter((mapping) => {
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
   * Processes ranges for the current page and builds the continuation token.
   * For parallel queries: Implements sliding window logic with multi-range aggregation.
   * For ORDER BY queries: Uses sequential processing with single-range continuation tokens.
   *
   * @param pageSize - Maximum number of items per page
   * @param currentBufferLength - Current buffer length for validation
   * @param pageResults - The actual page results being returned (for RID extraction and skip count calculation)
   * @returns Object with endIndex and processedRanges
   */
  public processRangesForCurrentPage(
    pageSize: number,
    currentBufferLength: number,
    pageResults?: any[],
  ): { endIndex: number; processedRanges: string[] } {
    this.removeExhaustedRangesFromCompositeContinuationToken();

    if (this.isOrderByQuery) {
      return this.processOrderByRanges(pageSize, currentBufferLength, pageResults);
    } else {
      return this.processParallelRanges(pageSize, currentBufferLength);
    }
  }

  /**
   * Processes ranges for ORDER BY queries - sequential, single-range continuation tokens
   */
  private processOrderByRanges(
    pageSize: number,
    currentBufferLength: number,
    pageResults?: any[],
  ): { endIndex: number; processedRanges: string[] } {
    console.log("=== Processing ORDER BY Query (Sequential Mode) ===");

    let endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | null = null;
    let lastRangeId: string | null = null;

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

        console.log(
          `✅ ORDER BY processed range ${rangeId} (size: ${size}). New endIndex: ${endIndex}`,
        );
      } else {
        // Page limit reached - store the last complete range in continuation token
        break;
      }
    }

    // For ORDER BY: Create dedicated OrderByQueryContinuationToken with resume values
    // Store the range mapping (without order by items pollution)
    this.addOrUpdateRangeMapping(lastRangeBeforePageLimit);

    // Extract ORDER BY items from the last item on the page if available
    let lastOrderByItems: any[] | undefined;
    if (this.orderByItemsArray && endIndex > 0) {
      const lastItemIndexOnPage = endIndex - 1;
      if (lastItemIndexOnPage < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastItemIndexOnPage];
        console.log(
          `✅ ORDER BY extracted order by items for last item at index ${lastItemIndexOnPage}`,
        );
      }
    }

    // Extract RID and calculate skip count from the actual page results
    let documentRid: string = this.collectionLink; // fallback to collection link
    let skipCount: number = 0;

    if (pageResults && pageResults.length > 0) {
      // Get the last document in the page
      const lastDocument = pageResults[pageResults.length - 1];

      // Extract RID from the last document (document's _rid property)
      if (lastDocument && lastDocument._rid) {
        documentRid = lastDocument._rid;

        // Calculate skip count: count how many documents in the page have the same RID
        // This handles JOIN queries where multiple documents can have the same RID
        skipCount = pageResults.filter((doc) => doc && doc._rid === documentRid).length;
        // Exclude the last document from the skip count
        skipCount -= 1;

        console.log(
          `✅ ORDER BY extracted document RID: ${documentRid}, skip count: ${skipCount} (from ${pageResults.length} page results)`,
        );
      } else {
        console.warn(
          `⚠️ ORDER BY could not extract RID from last document, using collection link as fallback`,
        );
      }
    } else {
      console.warn(
        `⚠️ ORDER BY no page results available for RID extraction, using collection link as fallback`,
      );
    }

    // Create ORDER BY specific continuation token with resume values
    const compositeTokenString = this.compositeContinuationToken.toString();
    this.orderByQueryContinuationToken = new OrderByQueryContinuationTokenClass(
      compositeTokenString,
      lastOrderByItems,
      documentRid, // Document RID from the last item in the page
      skipCount, // Number of documents with the same RID already processed
    );

    console.log(
      `✅ ORDER BY stored last range ${lastRangeId} and created OrderByQueryContinuationToken with document RID and skip count`,
    );

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
      sequentialProcessing: "✅ Single-range continuation token",
      orderByResumeValues: lastOrderByItems ? "✅ Included" : "❌ Not available",
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
    currentBufferLength: number,
  ): { endIndex: number; processedRanges: string[] } {
    console.log("=== Processing Parallel Query (Multi-Range Aggregation) ===");

    let endIndex = 0;
    const processedRanges: string[] = [];
    let rangesAggregatedInCurrentToken = 0;

    // Iterate through partition key ranges in the sliding window
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      rangesAggregatedInCurrentToken++;
      console.log(
        `=== Processing Parallel Range ${rangeId} (${rangesAggregatedInCurrentToken}/${this.partitionKeyRangeMap.size}) ===`,
      );

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

        console.log(
          `✅ Aggregated complete range ${rangeId} (size: ${size}) into continuation token. New endIndex: ${endIndex}`,
        );
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
      parallelismUtilization:
        rangesAggregatedInCurrentToken > 1
          ? "✅ Multi-range aggregation"
          : "⚠️ Single-range processing",
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
      if (
        mapping.partitionKeyRange.minInclusive === rangeMapping.partitionKeyRange.minInclusive &&
        mapping.partitionKeyRange.maxExclusive === rangeMapping.partitionKeyRange.maxExclusive
      ) {
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
   * For ORDER BY queries, returns OrderByQueryContinuationToken if available
   * For parallel queries, returns CompositeQueryContinuationToken
   */
  public getTokenString(): string | undefined {
    // For ORDER BY queries, prioritize the ORDER BY continuation token
    if (this.isOrderByQuery && this.orderByQueryContinuationToken) {
      return JSON.stringify(this.orderByQueryContinuationToken);
    }
    // For parallel queries or ORDER BY fallback
    if (
      this.compositeContinuationToken &&
      this.compositeContinuationToken.rangeMappings.length > 0
    ) {
      return this.compositeContinuationToken.toString();
    }
    return undefined;
  }

  /**
   * Updates response headers with the continuation token
   */
  public setContinuationTokenInHeaders(headers: CosmosHeaders): void {
    const tokenString = this.getTokenString();
    if (tokenString) {
      (headers as any)[Constants.HttpHeaders.Continuation] = tokenString;
    }
  }

  /**
   * Checks if there are any unprocessed ranges in the sliding window
   */
  public hasUnprocessedRanges(): boolean {
    console.log("partition Key range Map", JSON.stringify(this.partitionKeyRangeMap));
    return this.partitionKeyRangeMap.size > 0;
  }
}
