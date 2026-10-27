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
import { isPartitionRangeActive } from "../PartitionRangeManager.js";
import type { QueryRangeMapping } from "../queryRangeMapping.js";

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
      this.normalizeCheckpointOwnership(parsed.rangeMappings);
      this.tokenRangeMappings = parsed.rangeMappings;
      this.tokenOrderByItems = parsed.orderByItems;
      this.tokenSkipCount = parsed.skipCount;
      this.tokenDocumentRid = parsed.documentRid;
      this.tokenHashedLastResult = parsed.hashedLastResult;
    }
  }

  protected processQuerySpecificResponse(responseResult: ParallelQueryResult): void {
    this.reconcileRangeMappings(responseResult.partitionKeyRangeMap);
    // Clear existing items and add new ones without reassigning the array reference
    this.orderByItemsArray.length = 0;
    if (responseResult.orderByItems) {
      this.orderByItemsArray.push(...responseResult.orderByItems);
    }
  }

  protected performQuerySpecificDataTrim(_processedRanges: string[], endIndex: number): void {
    this.sliceOrderByItemsArray(endIndex);
  }

  protected clearQuerySpecificState(): void {
    this.orderByItemsArray.length = 0;
    this.clearTokenState();
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
      const processedRanges = [...this.partitionManager.getPartitionKeyRangeMap().keys()];
      const activeMappings = this.rangeList.filter(
        (mapping) =>
          mapping.isOrderByCheckpoint === true ||
          isPartitionRangeActive(mapping.continuationToken, mapping.isActive),
      );
      if (activeMappings.length > 0) {
        this.tokenRangeMappings = activeMappings.map((mapping) => ({
          queryRange: { ...mapping.queryRange },
          continuationToken: mapping.continuationToken,
          isActive: mapping.isActive,
          isOrderByCheckpoint: mapping.isOrderByCheckpoint,
        }));
      } else {
        this.clearTokenState();
      }
      return {
        endIndex: 0,
        processedRanges,
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
    const checkpointRange = convertRangeMappingToQueryRange(lastRangeBeforePageLimit);
    const checkpointKey = this.rangeKey(checkpointRange);
    const pageRangeMappings = this.createPageRangeMappings(
      rangeProcessingResult.processedRanges,
    ).filter(
      (mapping) =>
        this.rangeKey(mapping) === checkpointKey ||
        isPartitionRangeActive(mapping.continuationToken, mapping.isActive),
    );
    if (pageRangeMappings.length === 0) {
      pageRangeMappings.push(checkpointRange);
    }
    for (const mapping of pageRangeMappings) {
      mapping.isOrderByCheckpoint = this.rangeKey(mapping) === checkpointKey;
    }
    this.replaceRangeList(pageRangeMappings);
    this.tokenRangeMappings = pageRangeMappings;
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

  private reconcileRangeMappings(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    for (const mapping of partitionKeyRangeMap.values()) {
      const range = convertRangeMappingToQueryRange(mapping);
      const existingIndex = this.rangeList.findIndex(
        (current) =>
          current.queryRange.min === range.queryRange.min &&
          current.queryRange.max === range.queryRange.max,
      );

      if (!isPartitionRangeActive(mapping.continuationToken, mapping.isActive)) {
        const isCheckpoint =
          mapping.isOrderByCheckpoint === true ||
          (existingIndex >= 0 && this.rangeList[existingIndex].isOrderByCheckpoint === true);
        if (existingIndex >= 0 && isCheckpoint) {
          range.isActive = false;
          range.isOrderByCheckpoint = true;
          this.rangeList[existingIndex] = range;
        } else if (existingIndex >= 0) {
          this.rangeList.splice(existingIndex, 1);
        }
      } else if (existingIndex >= 0) {
        range.isOrderByCheckpoint =
          mapping.isOrderByCheckpoint ?? this.rangeList[existingIndex].isOrderByCheckpoint;
        this.rangeList[existingIndex] = range;
      } else {
        this.rangeList.push(range);
      }
    }
  }

  private createPageRangeMappings(processedRanges: string[]): QueryRangeWithContinuationToken[] {
    const mappingsByRange = new Map<string, QueryRangeWithContinuationToken>();
    for (const mapping of this.rangeList) {
      mappingsByRange.set(this.rangeKey(mapping), {
        queryRange: { ...mapping.queryRange },
        continuationToken: mapping.continuationToken,
        isActive: mapping.isActive,
        isOrderByCheckpoint: mapping.isOrderByCheckpoint,
      });
    }

    const processedRangeSet = new Set(processedRanges);
    for (const [key, mapping] of this.partitionManager.getPartitionKeyRangeMap()) {
      const checkpointMapping = processedRangeSet.has(key)
        ? mapping
        : {
            ...mapping,
            continuationToken: mapping.previousContinuationToken,
            isActive: true,
          };
      const tokenMapping = convertRangeMappingToQueryRange(checkpointMapping);
      if (checkpointMapping.isActive === false) {
        tokenMapping.isActive = false;
      }
      tokenMapping.isOrderByCheckpoint =
        checkpointMapping.isOrderByCheckpoint ??
        mappingsByRange.get(this.rangeKey(tokenMapping))?.isOrderByCheckpoint;
      mappingsByRange.set(this.rangeKey(tokenMapping), tokenMapping);
    }

    return Array.from(mappingsByRange.values()).sort((left, right) =>
      left.queryRange.min.localeCompare(right.queryRange.min),
    );
  }

  private normalizeCheckpointOwnership(mappings: QueryRangeWithContinuationToken[]): void {
    if (mappings.some((mapping) => mapping.isOrderByCheckpoint !== undefined)) {
      return;
    }
    mappings.forEach((mapping, index) => {
      mapping.isOrderByCheckpoint = index === 0;
    });
    this.rangeList.forEach((mapping, index) => {
      mapping.isOrderByCheckpoint = index === 0;
    });
  }

  private replaceRangeList(mappings: QueryRangeWithContinuationToken[]): void {
    this.rangeList.length = 0;
    this.rangeList.push(
      ...mappings.map((mapping) => ({
        ...mapping,
        queryRange: { ...mapping.queryRange },
      })),
    );
  }

  private rangeKey(mapping: QueryRangeWithContinuationToken): string {
    return `${mapping.queryRange.min}-${mapping.queryRange.max}`;
  }
}
