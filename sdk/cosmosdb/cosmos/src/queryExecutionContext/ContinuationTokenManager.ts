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

  
  private updateOffsetLimit(offset?: number, limit?: number): void {
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
    return this.orderByQueryContinuationToken?.hashedLastResult || undefined;
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

  private resetInitializePartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    this.partitionKeyRangeMap = partitionKeyRangeMap;
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
    );

    // Update offset/limit and hashed result from the last processed range
    if (lastRangeBeforePageLimit) {
      this.updateOffsetLimit(lastRangeBeforePageLimit.offset, lastRangeBeforePageLimit.limit);
      this.updateHashedLastResult(lastRangeBeforePageLimit.hashedLastResult);
    }

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
    let lastPartitionBeforeCutoff: { rangeId: string; mapping: QueryRangeMapping };

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
        
        // Add or update this range mapping in the continuation token
        this.addOrUpdateRangeMapping(value);
        endIndex += itemCount;
        processedRanges.push(rangeId);
      } else {
        break; // No more ranges can fit, exit loop
      }
    }

    // Update offset/limit and hashed result from the last processed range
    if (lastPartitionBeforeCutoff) {
      const { mapping } = lastPartitionBeforeCutoff;
      this.updateOffsetLimit(mapping.offset, mapping.limit);
      this.updateHashedLastResult(mapping.hashedLastResult);
    }

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
  private calculateOffsetLimitForEachPartitionRange(
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
  private updatePartitionKeyRangeMapForOffsetLimit(
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
}
