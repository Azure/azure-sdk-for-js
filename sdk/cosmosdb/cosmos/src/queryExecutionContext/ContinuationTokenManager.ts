// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "./QueryRangeMapping.js";
import type { CompositeQueryContinuationToken, QueryRangeWithContinuationToken } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { 
  createCompositeQueryContinuationToken,
  serializeCompositeToken,
  parseCompositeQueryContinuationToken
} from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { OrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { PartitionRangeUpdate, PartitionRangeUpdates } from "../documents/ContinuationToken/PartitionRangeUpdate.js";
import { 
  createOrderByQueryContinuationToken,
  parseOrderByQueryContinuationToken,
  serializeOrderByQueryContinuationToken
} from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { CosmosHeaders } from "./CosmosHeaders.js";
import { Constants } from "../common/index.js";
import { PartitionRangeManager } from "./PartitionRangeManager.js";
import { QueryRange } from "../routing/QueryRange.js";

/**
 * Manages continuation tokens for multi-partition query execution.
 * Handles composite continuation token creation, range mapping updates, and token serialization.
 * Supports both parallel queries (multi-range aggregation) and ORDER BY queries (single-range sequential).
 * @internal
 */
export class ContinuationTokenManager {
  private compositeContinuationToken: CompositeQueryContinuationToken;
  private orderByQueryContinuationToken: OrderByQueryContinuationToken;
  
  private ranges: QueryRangeWithContinuationToken[] = [];

  private partitionRangeManager: PartitionRangeManager = new PartitionRangeManager();
  private isOrderByQuery: boolean = false;
  private orderByItemsArray: any[][] | undefined;
  private isUnsupportedQueryType: boolean = false;
  private collectionLink: string;

  constructor(
    collectionLink: string,
    initialContinuationToken?: string,
    isOrderByQuery: boolean = false,
  ) {
    this.isOrderByQuery = isOrderByQuery;
    this.collectionLink = collectionLink;
    if (initialContinuationToken) {
        if (this.isOrderByQuery) {
          this.orderByQueryContinuationToken = parseOrderByQueryContinuationToken(initialContinuationToken);
          this.ranges = this.orderByQueryContinuationToken.rangeMappings || [];
        } else {
          this.compositeContinuationToken =
            parseCompositeQueryContinuationToken(initialContinuationToken);
          this.ranges = this.compositeContinuationToken.rangeMappings || [];
        }
    } else {
      this.ranges = [];
    }
  }  

  /**
   * Sets the ORDER BY items array for ORDER BY continuation token creation
   * @param orderByItemsArray - Array of ORDER BY items for each document
   */
  public setOrderByItemsArray(orderByItemsArray: any[][] | undefined): void {
    this.orderByItemsArray = orderByItemsArray;
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
   * Sets whether this query type supports continuation tokens
   * @param isUnsupported - True if the query type doesn't support continuation tokens
   */
  public setUnsupportedQueryType(isUnsupported: boolean): void {
    this.isUnsupportedQueryType = isUnsupported;
  }  
  
  private isPartitionExhausted(continuationToken: string | null): boolean {
    return (
      !continuationToken ||
      continuationToken === "" ||
      continuationToken === "null" ||
      continuationToken.toLowerCase() === "null"
    );
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
   * Removes exhausted(fully drained) ranges from the common ranges array
   */
  private removeExhaustedRangesFromRanges(): void {
    // Validate ranges array
    if (!this.ranges || !Array.isArray(this.ranges)) {
      return;
    }

    // Filter out exhausted ranges from the common ranges array
    this.ranges = this.ranges.filter((mapping) => {
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
    pageResults?: any[],
  ): { endIndex: number; processedRanges: string[] } {
    this.removeExhaustedRangesFromRanges();
    if (this.isOrderByQuery) {
      return this.processOrderByRanges(pageSize, pageResults);
    } else {
      return this.processParallelRanges(pageSize);
    }
  }

  /**
   * Processes ranges for ORDER BY queries
   */
  private processOrderByRanges(
    pageSize: number,
    pageResults?: any[],
  ): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionRangeManager.processOrderByRanges(
      pageSize,
      this.orderByItemsArray
    );

    const { lastRangeBeforePageLimit } = result;

    // Store the range mapping 
    if (lastRangeBeforePageLimit) {
      this.addOrUpdateRangeMapping(lastRangeBeforePageLimit);
    }

    // Extract ORDER BY items from the last item on the page
    let lastOrderByItems: any[] | undefined;
    if (result.endIndex > 0 && this.orderByItemsArray) {
      const lastItemIndexOnPage = result.endIndex - 1;
      if (lastItemIndexOnPage < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastItemIndexOnPage];
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
      } 
    }

    // Create ORDER BY specific continuation token with resume values
    const rangeMappings = this.ranges || [];
    this.orderByQueryContinuationToken = createOrderByQueryContinuationToken(
      rangeMappings,
      lastOrderByItems,
      documentRid, // Document RID from the last item in the page
      skipCount, // Number of documents with the same RID already processed
    );

    // Update offset/limit and hashed result from the last processed range
    if (lastRangeBeforePageLimit) {
      this.orderByQueryContinuationToken.offset = lastRangeBeforePageLimit.offset;
      this.orderByQueryContinuationToken.limit = lastRangeBeforePageLimit.limit;
      this.orderByQueryContinuationToken.hashedLastResult = lastRangeBeforePageLimit.hashedLastResult;
    }

    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  private processParallelRanges(
    pageSize: number,
  ): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionRangeManager.processParallelRanges(pageSize);
    
    this.compositeContinuationToken = createCompositeQueryContinuationToken(
      this.collectionLink,
      this.ranges,
    );
    // Update internal state based on the result
    if (result.lastPartitionBeforeCutoff && result.lastPartitionBeforeCutoff.mapping) {
      this.compositeContinuationToken.offset = result.lastPartitionBeforeCutoff.mapping.offset;
      this.compositeContinuationToken.limit = result.lastPartitionBeforeCutoff.mapping.limit;
    }
    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
  }

  /**
   * Adds or updates a range mapping in the common ranges array
   * TODO: take care of split/merges
   */
  private addOrUpdateRangeMapping(rangeMapping: QueryRangeMapping): void {
    // Safety check for rangeMapping parameter
    if (!rangeMapping || !rangeMapping.partitionKeyRange) {
      return;
    }

    let existingMappingFound = false;

    for (const mapping of this.ranges) {
      if (
        mapping &&
        mapping.queryRange.min === rangeMapping.partitionKeyRange.minInclusive &&
        mapping.queryRange.max === rangeMapping.partitionKeyRange.maxExclusive
      ) {
        // Update existing mapping with new continuation token
        mapping.continuationToken = rangeMapping.continuationToken;
        existingMappingFound = true;
        break;
      }
    }

    if (!existingMappingFound) {
      // Create new QueryRangeWithContinuationToken from QueryRangeMapping
      const queryRange = new QueryRange(
        rangeMapping.partitionKeyRange.minInclusive,
        rangeMapping.partitionKeyRange.maxExclusive,
        true, // minInclusive
        false // maxInclusive (exclusive max)
      );
      
      const newRangeWithToken: QueryRangeWithContinuationToken = {
        queryRange: queryRange,
        continuationToken: rangeMapping.continuationToken
      };
      this.ranges.push(newRangeWithToken);
    }
  }

  /**
   * Gets the continuation token string representation
   * For ORDER BY queries, returns OrderByQueryContinuationToken if available
   * For parallel queries, returns CompositeQueryContinuationToken
   * For unsupported query types, returns undefined to indicate no continuation token
   */
  public getTokenString(): string | undefined {
    if (this.isUnsupportedQueryType) {
      return undefined;
    }

    if (this.isOrderByQuery && this.orderByQueryContinuationToken) {
      return serializeOrderByQueryContinuationToken(this.orderByQueryContinuationToken);
    } else if (this.compositeContinuationToken){
      return serializeCompositeToken(this.compositeContinuationToken);
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
   * Handles partition range changes (splits/merges) by updating the composite continuation token.
   * Creates new range mappings for split scenarios and updates existing mappings for merge scenarios.
   * 
   * @param updatedContinuationRanges - Map of range changes from parallel query execution context
   * @param requestContinuationToken - The original continuation token from the request
   */
  public handlePartitionRangeChanges(
    updatedContinuationRanges: PartitionRangeUpdates,
  ): void {
    if (updatedContinuationRanges && Object.keys(updatedContinuationRanges).length === 0) {
      return; // No range changes to process
    }
    // Process each range change
    Object.entries(updatedContinuationRanges).forEach(([rangeKey, rangeChange]) => {
      this.processRangeChange(rangeKey, rangeChange);
    });

  }

  /**
   * Processes a single range change (split or merge scenario).
   * Updates the composite continuation token structure accordingly.
   */
  private processRangeChange(
    _rangeKey: string, 
    rangeChange: PartitionRangeUpdate
  ): void {
    const { oldRange, newRanges, continuationToken } = rangeChange;
    if (newRanges.length === 1) {
      this.handleRangeMerge(oldRange, newRanges[0], continuationToken);
    } else {
      this.handleRangeSplit(oldRange, newRanges, continuationToken);
    }
  }

  /**
   * Handles range merge scenario by updating the existing range mapping.
   */
  private handleRangeMerge(oldRange: any, newRange: any, continuationToken: string): void {
    
    // Find existing range mapping to update in the common ranges array
    const existingMappingIndex = this.ranges.findIndex(
      mapping => mapping.queryRange.min === oldRange.minInclusive &&
                 mapping.queryRange.max === oldRange.maxExclusive
    );

    if(existingMappingIndex < 0) {
     return;
    }

    // Update existing mapping with new range properties
    const existingMapping = this.ranges[existingMappingIndex];
    
    // Create new QueryRange with updated boundaries
    const updatedQueryRange = new QueryRange(
      newRange.minInclusive,
      newRange.maxExclusive,
      true, // minInclusive
      false // maxInclusive (exclusive max)
    );

    // Update the mapping
    existingMapping.queryRange = updatedQueryRange;
    existingMapping.continuationToken = continuationToken;
  }

  /**
   * Handles range split scenario by replacing one range with multiple ranges.
   */
  private handleRangeSplit(oldRange: any, newRanges: any[], continuationToken: string): void {
    
    // Remove the old range mapping from the common ranges array
    this.ranges = this.ranges.filter(
      mapping => !(mapping.queryRange.min === oldRange.minInclusive &&
                   mapping.queryRange.max === oldRange.maxExclusive)
    );

    // Add new range mappings for each split range
    newRanges.forEach(newRange => {
      this.createNewRangeMapping(newRange, continuationToken);
    });
  }

  /**
   * Creates a new range mapping for the common ranges array.
   */
  private createNewRangeMapping(partitionKeyRange: any, continuationToken: string): void {
    // Create new QueryRange
    const queryRange = new QueryRange(
      partitionKeyRange.minInclusive,
      partitionKeyRange.maxExclusive,
      true, // minInclusive
      false // maxInclusive (exclusive max)
    );

    // Create new QueryRangeWithContinuationToken
    const newRangeWithToken: QueryRangeWithContinuationToken = {
      queryRange: queryRange,
      continuationToken: continuationToken
    };

    this.ranges.push(newRangeWithToken);
  }

  /**
   * Sets the partition key range map on the internal PartitionRangeManager
   * @param partitionKeyRangeMap - Map of range IDs to QueryRangeMapping objects
   */
  public setPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    this.partitionRangeManager.setPartitionKeyRangeMap(partitionKeyRangeMap);
  }
}
