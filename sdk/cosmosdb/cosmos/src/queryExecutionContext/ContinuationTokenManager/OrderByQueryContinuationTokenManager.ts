// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import type { QueryResponseResult } from "./BaseContinuationTokenManager.js";
import type { OrderByQueryContinuationToken } from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import {
  createOrderByQueryContinuationToken,
  parseOrderByQueryContinuationToken,
  serializeOrderByQueryContinuationToken,
} from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { convertRangeMappingToQueryRange } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";

/**
 * Manages continuation tokens for ORDER BY queries using single-range sequential processing.
 * Uses OrderByQueryContinuationToken for tracking ORDER BY items and skip counts.
 * @internal
 */
export class OrderByQueryContinuationTokenManager extends BaseContinuationTokenManager {
  private continuationToken: OrderByQueryContinuationToken | undefined;
  private orderByItemsArray: { orderByItems: any[]; _rid: string }[] | undefined;

  constructor(
    collectionLink: string,
    initialContinuationToken?: string,
    isUnsupportedQueryType: boolean = false,
  ) {
    super(collectionLink, isUnsupportedQueryType);

    // Handle initialization directly - no deferred complexity needed
    if (initialContinuationToken) {
      this.initializeFromToken(initialContinuationToken);
    }
  }

  protected initializeFromToken(token: string): void {
    this.continuationToken = parseOrderByQueryContinuationToken(token);
    this.ranges = this.continuationToken?.rangeMappings || [];
  }

  public setOrderByItemsArray(
    orderByItemsArray: { orderByItems: any[]; _rid: string }[] | undefined,
  ): void {
    this.orderByItemsArray = orderByItemsArray;
  }

  /**
   * Override to handle ORDER BY specific response data.
   */
  public processResponseResult(responseResult: QueryResponseResult): void {
    super.processResponseResult(responseResult);
    if (responseResult.orderByItems) {
      this.setOrderByItemsArray(responseResult.orderByItems);
    }
  }

  /**
   * Override to handle ORDER BY specific data cleanup.
   */
  public cleanProcessedData(processedRanges: string[], endIndex: number): void {
    super.cleanProcessedData(processedRanges, endIndex);
    this.sliceOrderByItemsArray(endIndex);
  }

  public getOffset(): number | undefined {
    return this.continuationToken?.offset;
  }

  public getLimit(): number | undefined {
    return this.continuationToken?.limit;
  }

  public getHashedLastResult(): string | undefined {
    return this.continuationToken?.hashedLastResult;
  }

  public sliceOrderByItemsArray(endIndex: number): void {
    if (this.orderByItemsArray) {
      if (endIndex === 0 || endIndex >= this.orderByItemsArray.length) {
        this.orderByItemsArray = [];
      } else {
        this.orderByItemsArray = this.orderByItemsArray.slice(endIndex);
      }
    }
  }

  public handleCurrentPageRanges(pageSize: number, isResponseEmpty: boolean = false): {
    endIndex: number;
    processedRanges: string[];
  } {
    this.removeExhaustedRangesFromRanges();
    return this.processRanges(pageSize, isResponseEmpty);
  }

  private processRanges(pageSize: number, isResponseEmpty: boolean = false): { endIndex: number; processedRanges: string[] } {
    // Handle empty response case - update the previous valid continuation token
    if (isResponseEmpty && this.continuationToken) {
      let rangeProcessingResult;
      
      if (this.ranges.length === 0) {
        console.log("Processing empty response with no ranges for ORDER BY query continuation token.");
        rangeProcessingResult = this.partitionRangeManager.processOrderByRanges(pageSize);
      } else {
        console.log("Processing empty response for ORDER BY query continuation token.");
        rangeProcessingResult = this.partitionRangeManager.processEmptyOrderByRanges(pageSize, this.ranges);
      }

      const { lastRangeBeforePageLimit } = rangeProcessingResult;
      if (lastRangeBeforePageLimit) {
        // Use the range matching the continuation token for empty response
        this.continuationToken.rangeMappings = [convertRangeMappingToQueryRange(lastRangeBeforePageLimit)];
        console.log("Empty response: Updated continuation token with valid range");
      } else {
        // Range is exhausted - end the query to prevent infinite loop
        console.log("Empty response: Range is exhausted (null continuation token) - ending query to prevent infinite loop");
        this.continuationToken = undefined;
      }
      return { endIndex: rangeProcessingResult.endIndex, processedRanges: rangeProcessingResult.processedRanges };
    }
    
    // Normal processing path - handle non-empty responses
    const rangeProcessingResult = this.partitionRangeManager.processOrderByRanges(pageSize);
    const { lastRangeBeforePageLimit } = rangeProcessingResult;

    // Check if we have a valid range to continue with
    if (!lastRangeBeforePageLimit) {
      this.continuationToken = undefined;
      return { endIndex: rangeProcessingResult.endIndex, processedRanges: rangeProcessingResult.processedRanges };
    }
    
    const queryRange = convertRangeMappingToQueryRange(lastRangeBeforePageLimit);

    // Extract ORDER BY items from the last item on the page
    let lastOrderByItems: any[] | undefined;
    let documentRid: string;
    let skipCount: number = 0;

    if (rangeProcessingResult.endIndex > 0 && this.orderByItemsArray) {
      const lastItemIndexOnPage = rangeProcessingResult.endIndex - 1;

      if (lastItemIndexOnPage < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastItemIndexOnPage].orderByItems;
        documentRid = this.orderByItemsArray[lastItemIndexOnPage]._rid;
        // Calculate skip count: count how many documents in the page have the same RID
        // This handles JOIN queries where multiple documents can have the same RID
        skipCount = 0;
        for (let i = 0; i <= lastItemIndexOnPage; i++) {
          if (this.orderByItemsArray[i]._rid === documentRid) {
            skipCount++;
          }
        }
      }
    }

    const rangeMappings = [queryRange];

    // Create new ORDER BY continuation token
    this.continuationToken = createOrderByQueryContinuationToken(
      rangeMappings,
      lastOrderByItems,
      this.collectionLink, // Container RID/link
      skipCount, // Number of documents with the same RID already processed
      documentRid, // Document RID from the last item in the page
      lastRangeBeforePageLimit.offset, // Current offset for OFFSET/LIMIT queries
      lastRangeBeforePageLimit.limit, // Current limit for OFFSET/LIMIT queries
      lastRangeBeforePageLimit.hashedLastResult, // Hash for distinct queries
    );

    return { endIndex: rangeProcessingResult.endIndex, processedRanges: rangeProcessingResult.processedRanges };
  }

  public getTokenString(): string | undefined {
    if (this.isUnsupportedQueryType) {
      return undefined;
    }
    return this.continuationToken
      ? serializeOrderByQueryContinuationToken(this.continuationToken)
      : undefined;
  }
}
