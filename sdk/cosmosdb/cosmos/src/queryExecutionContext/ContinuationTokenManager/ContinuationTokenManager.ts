// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContinuationTokenCodec } from "../../documents/ContinuationToken/ContinuationTokenCodec.js";
import type { QueryRangeWithContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { convertRangeMappingToQueryRange } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { PartitionRangeManager } from "../PartitionRangeManager.js";
import type { ParallelQueryResult, OrderByItemWithRid } from "../parallelQueryResult.js";
import type { QueryRangeMapping } from "../queryRangeMapping.js";

/**
 * Manages continuation tokens for both parallel and ORDER BY queries.
 * Handles response processing, range management, token construction, and serialization.
 * @internal
 */
export class ContinuationTokenManager {
  private readonly partitionRangeManager: PartitionRangeManager = new PartitionRangeManager();
  private readonly collectionLink: string;
  private readonly isOrderByQuery: boolean;
  private _offset?: number;
  private _limit?: number;

  // ORDER BY–specific state (unused for parallel queries)
  private readonly orderByItemsArray: OrderByItemWithRid[] = [];
  private tokenOrderByItems: any[] | undefined;
  private tokenSkipCount: number = 0;
  private tokenDocumentRid: string = "";
  private tokenHashedLastResult: string | undefined;
  private hasValidOrderByToken: boolean = false;

  constructor(
    collectionLink: string,
    isOrderByQuery: boolean,
    initialContinuationToken?: string,
  ) {
    this.collectionLink = collectionLink;
    this.isOrderByQuery = isOrderByQuery;

    if (initialContinuationToken) {
      try {
        const token = ContinuationTokenCodec.decode(initialContinuationToken);
        if (token?.rangeMappings) {
          this.partitionRangeManager.initializeTokenRanges(token.rangeMappings);
        }
        this._offset = token?.offset;
        this._limit = token?.limit;

        if (isOrderByQuery) {
          const parsed = ContinuationTokenCodec.decodeOrderBy(initialContinuationToken);
          if (parsed.orderByItems && parsed.orderByItems.length > 0) {
            this.tokenOrderByItems = parsed.orderByItems;
            this.tokenSkipCount = parsed.skipCount ?? 0;
            this.tokenDocumentRid = parsed.documentRid ?? "";
            this.tokenHashedLastResult = parsed.hashedLastResult;
            this.hasValidOrderByToken = true;
          }
        }
      } catch {
        // Token is not a JSON-encoded object — treat as opaque server continuation string.
        // No structured fields to extract; manager starts with default state.
      }
    }
  }

  /**
   * Processes query results and generates continuation tokens for pagination.
   */
  public paginateResults(
    pageSize: number,
    isResponseEmpty: boolean,
    responseResult?: ParallelQueryResult,
  ): {
    endIndex: number;
    continuationToken?: string;
  } {
    if (responseResult) {
      this.processResponseResult(responseResult);
    }

    this.partitionRangeManager.removeExhaustedTokenRanges();

    const result = this.isOrderByQuery
      ? this.processOrderByRanges(pageSize, isResponseEmpty)
      : this.processParallelRanges(pageSize);

    this._offset = result.offset;
    this._limit = result.limit;

    const tokenString = this.serializeToken();

    // Clean up ephemeral per-page data
    result.processedRanges.forEach((rangeId) => {
      this.partitionRangeManager.removePartitionRangeMapping(rangeId);
    });
    if (this.isOrderByQuery) {
      this.sliceOrderByItemsArray(result.endIndex);
    }

    return {
      endIndex: result.endIndex,
      continuationToken: tokenString,
    };
  }

  // ── Response processing ────────────────────────────────────────────────

  private processResponseResult(responseResult: ParallelQueryResult): void {
    if (responseResult.partitionKeyRangeMap) {
      this.partitionRangeManager.addPartitionKeyRangeMap(responseResult.partitionKeyRangeMap);
    }
    if (responseResult.updatedContinuationRanges) {
      this.partitionRangeManager.handlePartitionRangeChanges(
        responseResult.updatedContinuationRanges,
      );
    }
    if (this.isOrderByQuery) {
      this.orderByItemsArray.length = 0;
      if (responseResult.orderByItems) {
        this.orderByItemsArray.push(...responseResult.orderByItems);
      }
    }
  }

  // ── Parallel query pagination ──────────────────────────────────────────

  private processParallelRanges(pageSize: number): {
    endIndex: number;
    processedRanges: string[];
    offset?: number;
    limit?: number;
  } {
    const result = this.partitionRangeManager.processParallelRanges(pageSize);
    if (!result || !result.processedRangeMappings || result.processedRangeMappings.length === 0) {
      return { endIndex: 0, processedRanges: [] };
    }

    const rangeMappings: QueryRangeWithContinuationToken[] = result.processedRangeMappings.map(
      (mapping: QueryRangeMapping) => convertRangeMappingToQueryRange(mapping),
    );
    this.partitionRangeManager.updateTokenRanges(rangeMappings);

    return {
      endIndex: result.endIndex,
      processedRanges: result.processedRanges,
      offset: result.lastPartitionBeforeCutoff?.mapping?.offset,
      limit: result.lastPartitionBeforeCutoff?.mapping?.limit,
    };
  }

  // ── ORDER BY query pagination ──────────────────────────────────────────

  private processOrderByRanges(
    pageSize: number,
    isResponseEmpty: boolean,
  ): {
    endIndex: number;
    processedRanges: string[];
    offset?: number;
    limit?: number;
  } {
    const tokenRanges = this.partitionRangeManager.getTokenRanges();

    // Empty response: reuse previous token with updated range
    if (isResponseEmpty && this.hasValidOrderByToken) {
      const rangeResult =
        tokenRanges.length === 0
          ? this.partitionRangeManager.processOrderByRanges(pageSize)
          : this.partitionRangeManager.processEmptyOrderByRanges(tokenRanges);

      const { lastRangeBeforePageLimit } = rangeResult;
      if (lastRangeBeforePageLimit) {
        this.partitionRangeManager.setTokenRanges([
          convertRangeMappingToQueryRange(lastRangeBeforePageLimit),
        ]);
      } else {
        this.clearOrderByTokenState();
      }
      return {
        endIndex: rangeResult.endIndex,
        processedRanges: rangeResult.processedRanges,
        offset: lastRangeBeforePageLimit?.offset,
        limit: lastRangeBeforePageLimit?.limit,
      };
    }

    // Normal path
    const rangeResult = this.partitionRangeManager.processOrderByRanges(pageSize);
    const { lastRangeBeforePageLimit } = rangeResult;

    if (!lastRangeBeforePageLimit) {
      this.clearOrderByTokenState();
      return {
        endIndex: rangeResult.endIndex,
        processedRanges: rangeResult.processedRanges,
      };
    }

    const queryRange = convertRangeMappingToQueryRange(lastRangeBeforePageLimit);

    // Extract ORDER BY items from last item on page
    let lastOrderByItems: any[] | undefined;
    let documentRid: string = "";
    let skipCount: number = 0;
    if (rangeResult.endIndex > 0 && this.orderByItemsArray.length > 0) {
      const lastIdx = rangeResult.endIndex - 1;
      if (lastIdx < this.orderByItemsArray.length) {
        lastOrderByItems = this.orderByItemsArray[lastIdx].orderByItems;
        documentRid = this.orderByItemsArray[lastIdx]._rid;
        for (let i = 0; i <= lastIdx; i++) {
          if (this.orderByItemsArray[i]._rid === documentRid) {
            skipCount++;
          }
        }
      }
    }

    if (!lastOrderByItems || lastOrderByItems.length === 0) {
      this.clearOrderByTokenState();
      return {
        endIndex: rangeResult.endIndex,
        processedRanges: rangeResult.processedRanges,
      };
    }

    this.partitionRangeManager.setTokenRanges([queryRange]);
    this.tokenOrderByItems = lastOrderByItems;
    this.tokenSkipCount = skipCount;
    this.tokenDocumentRid = documentRid;
    this.tokenHashedLastResult = lastRangeBeforePageLimit.hashedLastResult;
    this.hasValidOrderByToken = true;

    return {
      endIndex: rangeResult.endIndex,
      processedRanges: rangeResult.processedRanges,
      offset: lastRangeBeforePageLimit.offset,
      limit: lastRangeBeforePageLimit.limit,
    };
  }

  private clearOrderByTokenState(): void {
    this.tokenOrderByItems = undefined;
    this.tokenSkipCount = 0;
    this.tokenDocumentRid = "";
    this.tokenHashedLastResult = undefined;
    this.hasValidOrderByToken = false;
  }

  private sliceOrderByItemsArray(endIndex: number): void {
    if (endIndex === 0 || endIndex >= this.orderByItemsArray.length) {
      this.orderByItemsArray.length = 0;
    } else {
      this.orderByItemsArray.splice(0, endIndex);
    }
  }

  // ── Token serialization ────────────────────────────────────────────────

  private serializeToken(): string | undefined {
    const tokenRanges = this.partitionRangeManager.getTokenRanges();

    if (this.isOrderByQuery) {
      if (!this.hasValidOrderByToken || !this.tokenOrderByItems) {
        return undefined;
      }
      return ContinuationTokenCodec.encode({
        rangeMappings: tokenRanges,
        orderByItems: this.tokenOrderByItems,
        rid: this.collectionLink,
        skipCount: this.tokenSkipCount,
        documentRid: this.tokenDocumentRid,
        offset: this._offset,
        limit: this._limit,
        hashedLastResult: this.tokenHashedLastResult,
      } as any);
    } else {
      if (tokenRanges.length === 0) {
        return undefined;
      }
      return ContinuationTokenCodec.encode({
        rid: this.collectionLink,
        rangeMappings: tokenRanges,
        offset: this._offset,
        limit: this._limit,
      });
    }
  }
}
