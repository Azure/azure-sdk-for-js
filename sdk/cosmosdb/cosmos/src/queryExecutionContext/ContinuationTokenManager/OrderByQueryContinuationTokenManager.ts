// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import type { ParallelQueryResult, OrderByItemWithRid } from "../parallelQueryResult.js";
import type { OrderByQueryContinuationToken } from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import {
  parseOrderByQueryContinuationToken,
  serializeOrderByQueryContinuationToken,
} from "../../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import type { QueryRangeWithContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { convertRangeMappingToQueryRange } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";

/**
 * Manages continuation tokens for ORDER BY queries using single-range sequential processing.
 * Uses OrderByQueryContinuationToken for tracking ORDER BY items and skip counts.
 * @internal
 */
export class OrderByQueryContinuationTokenManager extends BaseContinuationTokenManager {
  private readonly orderByItemsArray: OrderByItemWithRid[];

  // OrderBy-specific token state (computed into token on demand)
  private tokenRangeMappings?: QueryRangeWithContinuationToken[];
  private tokenOrderByItems?: any[];
  private tokenSkipCount: number = 0;
  private tokenDocumentRid: string = "";
  private tokenHashedLastResult?: string;

  constructor(collectionLink: string, initialContinuationToken?: string) {
    super(collectionLink, initialContinuationToken);
    this.orderByItemsArray = [];
    if (initialContinuationToken) {
      const parsed = parseOrderByQueryContinuationToken(initialContinuationToken);
      this.tokenRangeMappings = parsed.rangeMappings;
      this.tokenOrderByItems = parsed.orderByItems;
      this.tokenSkipCount = parsed.skipCount;
      this.tokenDocumentRid = parsed.documentRid;
      this.tokenHashedLastResult = parsed.hashedLastResult;
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
    // Handle empty response case - preserve previous token state with updated range
    if (isResponseEmpty && this.tokenRangeMappings) {
      let rangeProcessingResult;

      if (this.rangeList.length === 0) {
        rangeProcessingResult = this.partitionManager.processOrderByRanges(pageSize);
      } else {
        rangeProcessingResult = this.partitionManager.processEmptyOrderByRanges(this.rangeList);
      }

      const { lastRangeBeforePageLimit } = rangeProcessingResult;
      if (lastRangeBeforePageLimit) {
        this.tokenRangeMappings = [
          convertRangeMappingToQueryRange(lastRangeBeforePageLimit),
        ];
      } else {
        this.clearTokenState();
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
      this.clearTokenState();
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
      this.clearTokenState();
      return {
        endIndex: rangeProcessingResult.endIndex,
        processedRanges: rangeProcessingResult.processedRanges,
      };
    }

    // Update token state fields
    this.tokenRangeMappings = [queryRange];
    this.tokenOrderByItems = lastOrderByItems;
    this.tokenSkipCount = skipCount;
    this.tokenDocumentRid = documentRid!;
    this.offset = lastRangeBeforePageLimit.offset;
    this.limit = lastRangeBeforePageLimit.limit;
    this.tokenHashedLastResult = lastRangeBeforePageLimit.hashedLastResult;

    return {
      endIndex: rangeProcessingResult.endIndex,
      processedRanges: rangeProcessingResult.processedRanges,
    };
  }

  protected getCurrentContinuationToken(): OrderByQueryContinuationToken | undefined {
    if (!this.tokenRangeMappings || !this.tokenOrderByItems) {
      return undefined;
    }
    return {
      rid: this.collectionLink,
      rangeMappings: this.tokenRangeMappings,
      orderByItems: this.tokenOrderByItems,
      skipCount: this.tokenSkipCount,
      documentRid: this.tokenDocumentRid,
      offset: this.offset,
      limit: this.limit,
      hashedLastResult: this.tokenHashedLastResult,
    };
  }

  protected getSerializationFunction(): (token: OrderByQueryContinuationToken) => string {
    return serializeOrderByQueryContinuationToken;
  }

  private clearTokenState(): void {
    this.tokenRangeMappings = undefined;
    this.tokenOrderByItems = undefined;
    this.tokenSkipCount = 0;
    this.tokenDocumentRid = "";
    this.tokenHashedLastResult = undefined;
  }
}
