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

  public handleCurrentPageRanges(pageSize: number): {
    endIndex: number;
    processedRanges: string[];
  } {
    this.removeExhaustedRangesFromRanges();
    return this.processRanges(pageSize);
  }

  private processRanges(pageSize: number): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionRangeManager.processOrderByRanges(pageSize);
    const { lastRangeBeforePageLimit } = result;

    // Store the range mapping
    if (!lastRangeBeforePageLimit) {
      this.continuationToken = undefined;
      return { endIndex: 0, processedRanges: [] };
    }
    const queryRange = convertRangeMappingToQueryRange(lastRangeBeforePageLimit);

    // Extract ORDER BY items from the last item on the page
    let lastOrderByItems: any[] | undefined;
    let documentRid: string;
    let skipCount: number = 0;

    if (result.endIndex > 0 && this.orderByItemsArray) {
      const lastItemIndexOnPage = result.endIndex - 1;

      if (lastItemIndexOnPage < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastItemIndexOnPage].orderByItems;
        documentRid = this.orderByItemsArray[lastItemIndexOnPage]._rid;
        // Calculate skip count: count how many documents in the page have the same RID
        // This handles JOIN queries where multiple documents can have the same RID
        for (let i = 0; i <= lastItemIndexOnPage; i++) {
          if (this.orderByItemsArray[i]._rid === documentRid) {
            skipCount++;
          }
        }
        // Exclude the last document from the skip count
        skipCount -= 1;
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

    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
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
