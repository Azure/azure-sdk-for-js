// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import type { ParallelQueryResult, OrderByItemWithRid } from "../parallelQueryResult.js";
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
  private readonly orderByItemsArray: OrderByItemWithRid[];
  private readonly collectionLink: string;

  constructor(collectionLink: string, initialContinuationToken?: string) {
    super(initialContinuationToken);
    this.collectionLink = collectionLink;
    this.orderByItemsArray = [];
    if (initialContinuationToken) {
      this.continuationToken = parseOrderByQueryContinuationToken(initialContinuationToken);
    }
  }

  protected processQuerySpecificResponse(responseResult: ParallelQueryResult): void {
    // Clear existing items and add new ones without reassigning the array reference
    this.orderByItemsArray.length = 0;
    if (responseResult.orderByItems) {
      this.orderByItemsArray.push(...responseResult.orderByItems);
    }
  }

  protected performQuerySpecificDataTrim(_processedRanges: string[], endIndex: number): void {
    this.sliceOrderByItemsArray(endIndex);
  }

  private sliceOrderByItemsArray(endIndex: number): void {
    if (endIndex === 0 || endIndex >= this.orderByItemsArray.length) {
      // Clear the array without reassigning
      this.orderByItemsArray.length = 0;
    } else {
      // Remove items from 0 to endIndex-1, keeping items from endIndex onwards
      this.orderByItemsArray.splice(0, endIndex);
    }
  }

  protected processRangesForPagination(
    pageSize: number,
    isResponseEmpty: boolean = false,
  ): { endIndex: number; processedRanges: string[] } {
    // Handle empty response case - update the previous valid continuation token
    if (isResponseEmpty && this.continuationToken) {
      let rangeProcessingResult;

      if (this.rangeList.length === 0) {
        rangeProcessingResult = this.partitionManager.processOrderByRanges(pageSize);
      } else {
        rangeProcessingResult = this.partitionManager.processEmptyOrderByRanges(this.rangeList);
      }

      const { lastRangeBeforePageLimit } = rangeProcessingResult;
      if (lastRangeBeforePageLimit) {
        // Use the range matching the continuation token for empty response
        this.continuationToken.rangeMappings = [
          convertRangeMappingToQueryRange(lastRangeBeforePageLimit),
        ];
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
    const rangeProcessingResult = this.partitionManager.processOrderByRanges(pageSize);
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
    if (rangeProcessingResult.endIndex > 0 && this.orderByItemsArray.length > 0) {
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

    // If we don't have valid ORDER BY items, we cannot create a proper continuation token
    // This can happen when the response doesn't contain ORDER BY metadata or when there are no results
    if (!lastOrderByItems || lastOrderByItems.length === 0) {
      this.continuationToken = undefined;
      return {
        endIndex: rangeProcessingResult.endIndex,
        processedRanges: rangeProcessingResult.processedRanges,
      };
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

  protected getCurrentContinuationToken(): OrderByQueryContinuationToken | undefined {
    return this.continuationToken;
  }

  protected getSerializationFunction(): (token: OrderByQueryContinuationToken) => string {
    return serializeOrderByQueryContinuationToken;
  }
}
