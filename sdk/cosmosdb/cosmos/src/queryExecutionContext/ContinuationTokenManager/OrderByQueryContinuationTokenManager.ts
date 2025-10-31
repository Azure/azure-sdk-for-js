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

  private setOrderByItemsArray(
    orderByItemsArray: { orderByItems: any[]; _rid: string }[] | undefined,
  ): void {
    this.orderByItemsArray = orderByItemsArray;
  }

  /**
   * Override to handle ORDER BY specific response data.
   */
  protected processResponseResult(responseResult: QueryResponseResult): void {
    super.processResponseResult(responseResult);
    if (responseResult.orderByItems) {
      this.setOrderByItemsArray(responseResult.orderByItems);
    }
  }

  /**
   * Override to handle ORDER BY specific data cleanup.
   */
  protected cleanProcessedData(processedRanges: string[], endIndex: number): void {
    super.cleanProcessedData(processedRanges, endIndex);
    this.sliceOrderByItemsArray(endIndex);
  }

  private sliceOrderByItemsArray(endIndex: number): void {
    if (this.orderByItemsArray) {
      if (endIndex === 0 || endIndex >= this.orderByItemsArray.length) {
        this.orderByItemsArray = [];
      } else {
        this.orderByItemsArray = this.orderByItemsArray.slice(endIndex);
      }
    }
  }

  public createContinuationToken(
    pageSize: number,
    isResponseEmpty: boolean = false,
    responseResult?: QueryResponseResult,
  ): {
    endIndex: number;
    processedRanges: string[];
    continuationToken?: string;
  } {
    // Process response data first if provided
    if (responseResult) {
      this.processResponseResult(responseResult);
    }

    this.removeExhaustedRangesFromRanges();
    const result = this.processRanges(pageSize, isResponseEmpty);

    // Clean up processed data automatically
    this.cleanProcessedData(result.processedRanges, result.endIndex);

    // Add the continuation token string to the result
    const tokenString = this.isUnsupportedQueryType
      ? undefined
      : this.continuationToken
        ? serializeOrderByQueryContinuationToken(this.continuationToken)
        : undefined;

    return {
      ...result,
      continuationToken: tokenString,
    };
  }

  private processRanges(
    pageSize: number,
    isResponseEmpty: boolean = false,
  ): { endIndex: number; processedRanges: string[] } {
    // Handle empty response case - update the previous valid continuation token
    if (isResponseEmpty && this.continuationToken) {
      let rangeProcessingResult;

      if (this.ranges.length === 0) {
        rangeProcessingResult = this.partitionRangeManager.processOrderByRanges(pageSize);
      } else {
        console.log("Processing empty response for ORDER BY query continuation token.");
        rangeProcessingResult = this.partitionRangeManager.processEmptyOrderByRanges(this.ranges);
      }

      const { lastRangeBeforePageLimit } = rangeProcessingResult;
      if (lastRangeBeforePageLimit) {
        // Use the range matching the continuation token for empty response
        this.continuationToken.rangeMappings = [
          convertRangeMappingToQueryRange(lastRangeBeforePageLimit),
        ];
        console.log("Empty response: Updated continuation token with valid range");
      } else {
        // Range is exhausted - clear the continuation token
        this.continuationToken = undefined;
      }
      return {
        endIndex: rangeProcessingResult.endIndex,
        processedRanges: rangeProcessingResult.processedRanges,
      };
    }

    // Normal processing path - handle non-empty responses
    const rangeProcessingResult = this.partitionRangeManager.processOrderByRanges(pageSize);
    const { lastRangeBeforePageLimit } = rangeProcessingResult;

    // Check if we have a valid range to continue with
    if (!lastRangeBeforePageLimit) {
      this.continuationToken = undefined;
      return {
        endIndex: rangeProcessingResult.endIndex,
        processedRanges: rangeProcessingResult.processedRanges,
      };
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

    return {
      endIndex: rangeProcessingResult.endIndex,
      processedRanges: rangeProcessingResult.processedRanges,
    };
  }
}
