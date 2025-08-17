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
          const parsedToken = JSON.parse(initialContinuationToken);
          if (parsedToken && parsedToken.compositeToken && parsedToken.orderByItems) {
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
   * Updates the offset and limit values in the continuation tokens
   * @param offset - Current offset value
   * @param limit - Current limit value
   */
  public updateOffsetLimit(offset?: number, limit?: number): void {
    // For ORDER BY queries, also update the OrderBy continuation token if it exists
    if (this.isOrderByQuery && this.orderByQueryContinuationToken) {
      // Since OrderByQueryContinuationToken properties are readonly, we need to recreate it
      this.orderByQueryContinuationToken = new OrderByQueryContinuationTokenClass(
        this.orderByQueryContinuationToken.compositeToken,
        this.orderByQueryContinuationToken.orderByItems,
        this.orderByQueryContinuationToken.rid,
        this.orderByQueryContinuationToken.skipCount,
        offset,
        limit,
        this.orderByQueryContinuationToken.hashedLastResult,
      );
      return;
    }
    // Update composite continuation token
    if (this.compositeContinuationToken) {
      (this.compositeContinuationToken as any).offset = offset;
      (this.compositeContinuationToken as any).limit = limit;
    }  
  }

  /**
   * Gets the current offset value from the continuation token
   * @returns Current offset value or undefined
   */
  public getOffset(): number | undefined {
    // For ORDER BY queries, check OrderBy token first, then fall back to composite token
    if (this.isOrderByQuery && this.orderByQueryContinuationToken?.offset !== undefined) {
      return this.orderByQueryContinuationToken.offset;
    }
    return this.compositeContinuationToken?.offset;
  }

  /**
   * Gets the current limit value from the continuation token
   * @returns Current limit value or undefined
   */
  public getLimit(): number | undefined {
    // For ORDER BY queries, check OrderBy token first, then fall back to composite token
    if (this.isOrderByQuery && this.orderByQueryContinuationToken?.limit !== undefined) {
      return this.orderByQueryContinuationToken.limit;
    }
    return this.compositeContinuationToken?.limit;
  }

  /**
   * Gets the hashed last result for distinct order queries
   * @returns Hashed last result or undefined
   */
  public getHashedLastResult(): string | undefined {
    return this.orderByQueryContinuationToken?.hashedLastResult;
  }

  /**
   * Updates the hashed last result for distinct order queries
   * @param hashedLastResult - Hash of the last document result
   */
  public updateHashedLastResult(hashedLastResult?: string): void {
    if (this.isOrderByQuery && this.orderByQueryContinuationToken) {
      // Since OrderByQueryContinuationToken properties are readonly, we need to recreate it
      this.orderByQueryContinuationToken = new OrderByQueryContinuationTokenClass(
        this.orderByQueryContinuationToken.compositeToken,
        this.orderByQueryContinuationToken.orderByItems,
        this.orderByQueryContinuationToken.rid,
        this.orderByQueryContinuationToken.skipCount,
        this.orderByQueryContinuationToken.offset,
        this.orderByQueryContinuationToken.limit,
        hashedLastResult,
      );
    }
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
   * Slices the ORDER BY items array to maintain alignment with the fetch buffer
   * This should be called after slicing the fetch buffer to keep items in sync
   * @param endIndex - The end index used to slice the fetch buffer
   */
  public sliceOrderByItemsArray(endIndex: number): void {
    if (this.orderByItemsArray) {
      if (endIndex === 0 || endIndex >= this.orderByItemsArray.length) {
        // Clear the entire array when endIndex is 0 or beyond array bounds
        this.orderByItemsArray = [];
      } else {
        // Slice from endIndex onwards
        this.orderByItemsArray = this.orderByItemsArray.slice(endIndex);
      }
    }
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
    if (!this.compositeContinuationToken?.rangeMappings || !Array.isArray(this.compositeContinuationToken.rangeMappings)) {
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
   * Processes ranges for ORDER BY queries
   */
  private processOrderByRanges(
    pageSize: number,
    currentBufferLength: number,
    pageResults?: any[],
  ): { endIndex: number; processedRanges: string[] } {
    console.log("=== Processing ORDER BY Query (Sequential Mode) ===");

    // ORDER BY queries require orderByItemsArray to be present and non-empty
    if (!this.orderByItemsArray || this.orderByItemsArray.length === 0) {
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

    // Store the range mapping (without order by items pollution) - only if not null
    if (lastRangeBeforePageLimit) {
      this.addOrUpdateRangeMapping(lastRangeBeforePageLimit);
    }

    // Extract ORDER BY items from the last item on the page
    let lastOrderByItems: any[] | undefined;
    if (endIndex > 0) {
      const lastItemIndexOnPage = endIndex - 1;
      if (lastItemIndexOnPage < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastItemIndexOnPage];
        console.log(
          `✅ ORDER BY extracted order by items for last item at index ${lastItemIndexOnPage}`,
        );
      } else {
        throw new Error(
          `ORDER BY processing error: orderByItemsArray length (${this.orderByItemsArray.length}) ` +
          `is insufficient for the processed page size (${endIndex} items)`
        );
      }
    }

    // Extract RID and calculate skip count from the actual page results
    let documentRid: string; // fallback to collection link
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
          `ORDER BY extracted document RID: ${documentRid}, skip count: ${skipCount} (from ${pageResults.length} page results)`,
        );
      } 
    }

    // Create ORDER BY specific continuation token with resume values
    const compositeTokenString = this.compositeContinuationToken.toString();
    this.orderByQueryContinuationToken = new OrderByQueryContinuationTokenClass(
      compositeTokenString,
      lastOrderByItems,
      documentRid, // Document RID from the last item in the page
      skipCount, // Number of documents with the same RID already processed
      this.getOffset(), // Current offset value
      this.getLimit(),  // Current limit value
      undefined, // hashedLastResult - to be set separately for distinct queries
    );


    // TODO: removeLog ORDER BY specific metrics
    const orderByMetrics = {
      queryType: "ORDER BY (Sequential)",
      totalRangesProcessed: processedRanges.length,
      finalEndIndex: endIndex,
      continuationTokenGenerated: !!this.getTokenString(),
      slidingWindowSize: this.partitionKeyRangeMap.size,
      bufferUtilization: `${endIndex}/${currentBufferLength}`,
      pageCompliance: endIndex <= pageSize,
      sequentialProcessing: "✅ Single-range continuation token",
      orderByResumeValues: lastOrderByItems ? "✅ Included" : "❌ Not available",
    };

    console.log("=== ORDER BY Query Performance Summary ===", orderByMetrics);
    return { endIndex, processedRanges };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  private processParallelRanges(
    pageSize: number,
    currentBufferLength: number,
  ): { endIndex: number; processedRanges: string[] } {

    let endIndex = 0;
    const processedRanges: string[] = [];
    let rangesAggregatedInCurrentToken = 0;

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
        // Add or update this range mapping in the continuation token
        this.addOrUpdateRangeMapping(value);
        endIndex += itemCount;
        processedRanges.push(rangeId);
      } else {
        break; // No more ranges can fit, exit loop
      }
    }

    // TODO: remove it. Log performance metrics
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

    return { endIndex, processedRanges };
  }

  /**
   * Adds or updates a range mapping in the composite continuation token
   * TODO: take care of split/merges
   */
  private addOrUpdateRangeMapping(rangeMapping: QueryRangeMapping): void {
    // Safety check for rangeMapping parameter
    if (!rangeMapping || !rangeMapping.partitionKeyRange) {
      return;
    }

    let existingMappingFound = false;

    for (const mapping of this.compositeContinuationToken.rangeMappings) {
      if (
        mapping &&
        mapping.partitionKeyRange &&
        mapping.partitionKeyRange.minInclusive === rangeMapping.partitionKeyRange.minInclusive &&
        mapping.partitionKeyRange.maxExclusive === rangeMapping.partitionKeyRange.maxExclusive
      ) {
        // Update existing mapping with new itemCount and continuation token
        mapping.itemCount = rangeMapping.itemCount;
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
    // For parallel queries 
    if (
      !this.isOrderByQuery &&
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
    return this.partitionKeyRangeMap.size > 0;
  }

  /**
   * Extracts and updates hashedLastResult values from partition key range map for distinct order queries
   * @param partitionKeyRangeMap - The partition key range map containing hashedLastResult values
   */
  public updateHashedLastResultFromPartitionMap(partitionKeyRangeMap: Map<string, any>): void {
    // For distinct order queries, extract hashedLastResult from each partition range
    // and determine the overall last hash for continuation token purposes
    for (const [_rangeId, rangeMapping] of partitionKeyRangeMap) {
      if (rangeMapping.hashedLastResult) {
        // Update the continuation token with the hashed result for this range
        // This allows proper resumption of distinct queries across partitions
        this.updateHashedLastResult(rangeMapping.hashedLastResult);
      }
    }
  }
}
