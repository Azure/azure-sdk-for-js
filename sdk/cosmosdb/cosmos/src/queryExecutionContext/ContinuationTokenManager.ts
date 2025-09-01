// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "./QueryRangeMapping.js";
import type { CompositeQueryContinuationToken } from "./CompositeQueryContinuationToken.js";
import { 
  createCompositeQueryContinuationToken,
  addRangeMappingToCompositeToken,
  compositeTokenToString,
  compositeTokenFromString
} from "./CompositeQueryContinuationToken.js";
import type { OrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { 
  createOrderByQueryContinuationToken,
  serializeOrderByQueryContinuationToken
} from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { CosmosHeaders } from "./CosmosHeaders.js";
import { Constants } from "../common/index.js";
import { PartitionRangeManager } from "./PartitionRangeManager.js";

/**
 * Manages continuation tokens for multi-partition query execution.
 * Handles composite continuation token creation, range mapping updates, and token serialization.
 * Supports both parallel queries (multi-range aggregation) and ORDER BY queries (single-range sequential).
 * @hidden
 */
export class ContinuationTokenManager {
  private compositeContinuationToken: CompositeQueryContinuationToken;
  private partitionRangeManager: PartitionRangeManager = new PartitionRangeManager();
  private isOrderByQuery: boolean = false;
  private orderByQueryContinuationToken: OrderByQueryContinuationToken | undefined;
  private orderByItemsArray: any[][] | undefined;
  private isUnsupportedQueryType: boolean = false;

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
            this.compositeContinuationToken = compositeTokenFromString(
              parsedToken.compositeToken,
            );
          }
        } else {
          // For parallel queries, expect a CompositeQueryContinuationToken directly
          console.log("Parsing parallel query continuation token as composite token");
          this.compositeContinuationToken =
            compositeTokenFromString(initialContinuationToken);
        }

        console.log(
          `Successfully parsed ${isOrderByQuery ? "ORDER BY" : "parallel"} continuation token`,
        );
      } catch (error) {
        console.warn(
          `Failed to parse continuation token: ${error.message}, initializing empty token`,
        );
        // Fallback to empty continuation token if parsing fails
        this.compositeContinuationToken = createCompositeQueryContinuationToken(
          this.collectionLink,
          [],
          undefined,
        );
      }
    } else {
      this.compositeContinuationToken = createCompositeQueryContinuationToken(
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
    return this.partitionRangeManager.getPartitionKeyRangeMap();
  }

  /**
   * Sets the ORDER BY items array for ORDER BY continuation token creation
   * @param orderByItemsArray - Array of ORDER BY items for each document
   */
  public setOrderByItemsArray(orderByItemsArray: any[][] | undefined): void {
    this.orderByItemsArray = orderByItemsArray;
  }

  
  private updateOffsetLimit(offset?: number, limit?: number): void {
    // For ORDER BY queries, update the OrderBy continuation token if it exists
    if (this.isOrderByQuery && this.orderByQueryContinuationToken) {
      // Create a new OrderBy continuation token with updated values
      this.orderByQueryContinuationToken = createOrderByQueryContinuationToken(
        this.orderByQueryContinuationToken.compositeToken,
        this.orderByQueryContinuationToken.orderByItems,
        this.orderByQueryContinuationToken.rid,
        this.orderByQueryContinuationToken.skipCount, // TODO: apply skip count during recreation of token
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
      // Create a new OrderBy continuation token with updated values
      this.orderByQueryContinuationToken = createOrderByQueryContinuationToken(
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
    this.partitionRangeManager.clearRangeMappings();
  }

  /**
   * Sets whether this query type supports continuation tokens
   * @param isUnsupported - True if the query type doesn't support continuation tokens
   */
  public setUnsupportedQueryType(isUnsupported: boolean): void {
    this.isUnsupportedQueryType = isUnsupported;
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
    this.partitionRangeManager.updatePartitionRangeMapping(rangeId, mapping);
  }

  /**
   * Removes a range mapping from the partition key range map
   */
  public removePartitionRangeMapping(rangeId: string): void {
    this.partitionRangeManager.removePartitionRangeMapping(rangeId);
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
    this.partitionRangeManager.setPartitionKeyRangeMap(partitionKeyRangeMap);
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
    const result = this.partitionRangeManager.processOrderByRanges(
      pageSize,
      currentBufferLength,
      this.orderByItemsArray
    );

    const { lastRangeBeforePageLimit } = result;

    // Store the range mapping (without order by items pollution) - only if not null
    if (lastRangeBeforePageLimit) {
      this.addOrUpdateRangeMapping(lastRangeBeforePageLimit);
    }

    // Extract ORDER BY items from the last item on the page
    let lastOrderByItems: any[] | undefined;
    if (result.endIndex > 0 && this.orderByItemsArray) {
      const lastItemIndexOnPage = result.endIndex - 1;
      if (lastItemIndexOnPage < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastItemIndexOnPage];
      } else {
        throw new Error(
          `ORDER BY processing error: orderByItemsArray length (${this.orderByItemsArray.length}) ` +
          `is insufficient for the processed page size (${result.endIndex} items)`
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
    const compositeTokenString = compositeTokenToString(this.compositeContinuationToken);
    this.orderByQueryContinuationToken = createOrderByQueryContinuationToken(
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

    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  private processParallelRanges(
    pageSize: number,
    currentBufferLength: number,
  ): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionRangeManager.processParallelRanges(pageSize, currentBufferLength);
    
    // Update internal state based on the result
    if (result.lastPartitionBeforeCutoff) {
      this.addOrUpdateRangeMapping(result.lastPartitionBeforeCutoff.mapping);
      this.updateOffsetLimit(result.lastPartitionBeforeCutoff.mapping.offset, result.lastPartitionBeforeCutoff.mapping.limit);
      this.updateHashedLastResult(result.lastPartitionBeforeCutoff.mapping.hashedLastResult);
    }

    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
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
      addRangeMappingToCompositeToken(this.compositeContinuationToken, rangeMapping);
    }
  }

  /**
   * Gets the continuation token string representation
   * For ORDER BY queries, returns OrderByQueryContinuationToken if available
   * For parallel queries, returns CompositeQueryContinuationToken
   * For unsupported query types, returns undefined to indicate no continuation token
   */
  public getTokenString(): string | undefined {
    // For unsupported query types (e.g., unordered DISTINCT), return undefined
    // This prevents continuation tokens from being generated for queries that don't support them
    if (this.isUnsupportedQueryType) {
      return undefined;
    }

    // For ORDER BY queries, prioritize the ORDER BY continuation token
    if (this.isOrderByQuery && this.orderByQueryContinuationToken) {
      return serializeOrderByQueryContinuationToken(this.orderByQueryContinuationToken);
    }
    // For parallel queries 
    if (
      !this.isOrderByQuery &&
      this.compositeContinuationToken &&
      this.compositeContinuationToken.rangeMappings.length > 0
    ) {
      return compositeTokenToString(this.compositeContinuationToken);
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
    return this.partitionRangeManager.hasUnprocessedRanges();
  }

  /**
   * Extracts and updates hashedLastResult values from partition key range map for distinct order queries
   * @param partitionKeyRangeMap - The partition key range map containing hashedLastResult values
   */
  public updateHashedLastResultFromPartitionMap(partitionKeyRangeMap: Map<string, any>): void {
    const lastHashedResult = this.partitionRangeManager.updateHashedLastResultFromPartitionMap(partitionKeyRangeMap);
    if (lastHashedResult) {
      this.updateHashedLastResult(lastHashedResult);
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
    this.partitionRangeManager.processOffsetLimitAndUpdateRangeMap(
      initialOffset,
      finalOffset,
      initialLimit,
      finalLimit,
      bufferLength
    );
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
    await this.partitionRangeManager.processDistinctQueryAndUpdateRangeMap(originalBuffer, hashObject);
  }

  /**
   * Handles partition range changes (splits/merges) by updating the composite continuation token.
   * Creates new range mappings for split scenarios and updates existing mappings for merge scenarios.
   * 
   * @param updatedContinuationRanges - Map of range changes from parallel query execution context
   * @param requestContinuationToken - The original continuation token from the request
   */
  public handlePartitionRangeChanges(
    updatedContinuationRanges: Record<string, { oldRange: any; newRanges: any[]; continuationToken: string }>,
  ): void {
    console.log("Processing partition range changes:", Object.keys(updatedContinuationRanges).length, "changes");

    if (updatedContinuationRanges && Object.keys(updatedContinuationRanges).length === 0) {
      return; // No range changes to process
    }

    // Process each range change
    Object.entries(updatedContinuationRanges).forEach(([rangeKey, rangeChange]) => {
      this.processRangeChange(rangeKey, rangeChange);
    });

    console.log("Completed processing partition range changes");
  }

  /**
   * Processes a single range change (split or merge scenario).
   * Updates the composite continuation token structure accordingly.
   */
  private processRangeChange(
    _rangeKey: string, 
    rangeChange: { oldRange: any; newRanges: any[]; continuationToken: string }
  ): void {
    const { oldRange, newRanges, continuationToken } = rangeChange;
    if (newRanges.length === 1) {
      // Merge scenario: update existing range mapping
      this.handleRangeMerge(oldRange, newRanges[0], continuationToken);
    } else {
      // Split scenario: replace one range with multiple ranges
      this.handleRangeSplit(oldRange, newRanges, continuationToken);
    }
  }

  /**
   * Handles range merge scenario by updating the existing range mapping.
   */
  private handleRangeMerge(oldRange: any, newRange: any, continuationToken: string): void {
    
    // Find existing range mapping to update
    const existingMappingIndex = this.compositeContinuationToken.rangeMappings.findIndex(
      mapping => mapping.partitionKeyRange?.id === oldRange.id ||
                 (mapping.partitionKeyRange?.minInclusive === oldRange.minInclusive &&
                  mapping.partitionKeyRange?.maxExclusive === oldRange.maxExclusive)
    );

    if(existingMappingIndex < 0) {
     return;
    }

    // Update existing mapping with new range properties
    const existingMapping = this.compositeContinuationToken.rangeMappings[existingMappingIndex];
    
    // Preserve EPK boundaries while updating logical boundaries
    const updatedRange = {
      ...newRange,
      epkMin:  oldRange.minInclusive,
      epkMax:  oldRange.maxExclusive
    };

    existingMapping.partitionKeyRange = updatedRange;
    existingMapping.continuationToken = continuationToken;
      
  }

  /**
   * Handles range split scenario by replacing one range with multiple ranges.
   */
  private handleRangeSplit(oldRange: any, newRanges: any[], continuationToken: string): void {
    
    // Remove the old range mapping
    this.compositeContinuationToken.rangeMappings = this.compositeContinuationToken.rangeMappings.filter(
      mapping => mapping.partitionKeyRange?.id !== oldRange.id &&
                 !(mapping.partitionKeyRange?.minInclusive === oldRange.minInclusive &&
                   mapping.partitionKeyRange?.maxExclusive === oldRange.maxExclusive)
    );

    // Add new range mappings for each split range
    newRanges.forEach(newRange => {
      this.createNewRangeMapping(newRange, continuationToken);
    });
  }

  /**
   * Creates a new range mapping for the composite continuation token.
   */
  private createNewRangeMapping(partitionKeyRange: any, continuationToken: string): void {
    const rangeMapping: QueryRangeMapping = {
      partitionKeyRange: partitionKeyRange,
      continuationToken: continuationToken,
      itemCount: 0 // Will be updated by partition key range map processing
    };

    addRangeMappingToCompositeToken(this.compositeContinuationToken, rangeMapping);
  }
}
