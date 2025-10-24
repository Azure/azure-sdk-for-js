// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "../QueryRangeMapping.js";
import type { QueryRangeWithContinuationToken } from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../../documents/ContinuationToken/PartitionRangeUpdate.js";
import type { CosmosHeaders } from "../CosmosHeaders.js";
import { Constants } from "../../common/index.js";
import { PartitionRangeManager } from "../PartitionRangeManager.js";
import { QueryRange } from "../../routing/QueryRange.js";

/**
 * Interface representing the result portion of a query response that contains
 * continuation token related data.
 * @internal
 */
export interface QueryResponseResult {
  partitionKeyRangeMap?: Map<string, QueryRangeMapping>;
  updatedContinuationRanges?: PartitionRangeUpdates;
  orderByItems?: { orderByItems: any[]; _rid: string }[];
  buffer?: any[];
}

/**
 * Base abstract class for continuation token management.
 * Provides common functionality shared between parallel and ORDER BY query token managers.
 * @internal
 */
export abstract class BaseContinuationTokenManager {
  protected ranges: QueryRangeWithContinuationToken[] = [];
  protected partitionRangeManager: PartitionRangeManager = new PartitionRangeManager();
  protected isUnsupportedQueryType: boolean = false;
  protected collectionLink: string;

  constructor(collectionLink: string, isUnsupportedQueryType: boolean = false) {
    this.collectionLink = collectionLink;
    this.isUnsupportedQueryType = isUnsupportedQueryType;
  }

  // Abstract methods that subclasses must implement
  protected abstract initializeFromToken(token: string): void;
  public abstract handleCurrentPageRanges(pageSize: number, isResponseEmpty: boolean): {
    endIndex: number;
    processedRanges: string[];
  };
  public abstract getTokenString(): string | undefined;
  public abstract getOffset(): number | undefined;
  public abstract getLimit(): number | undefined;
  public abstract getHashedLastResult(): string | undefined;

  /**
   * Gets whether this query type supports continuation tokens
   * @returns True if the query type doesn't support continuation tokens
   */
  public getUnsupportedQueryType(): boolean {
    return this.isUnsupportedQueryType;
  }

  public removePartitionRangeMapping(rangeId: string): void {
    this.partitionRangeManager.removePartitionRangeMapping(rangeId);
  }

  /**
   * Cleans up processed data after a page has been returned.
   * Handles common cleanup logic and delegates to subclass-specific cleanup.
   */
  public cleanProcessedData(processedRanges: string[], _endIndex: number): void {
    processedRanges.forEach((rangeId) => {
      this.removePartitionRangeMapping(rangeId);
    });
  }

  /**
   * Template method for subclasses to override and handle their specific data cleanup.
   * Default implementation is a no-op for parallel queries.
   */
  protected cleanSubclassSpecificData(_endIndex: number): void {
    // Default no-op implementation for parallel queries
  }

  public setContinuationTokenInHeaders(headers: CosmosHeaders): void {
    const tokenString = this.getTokenString();
    if (tokenString) {
      Object.assign(headers, { [Constants.HttpHeaders.Continuation]: tokenString });
    }
  }

  public hasUnprocessedRanges(): boolean {
    return this.partitionRangeManager.hasUnprocessedRanges();
  }

  public setPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    this.partitionRangeManager.setPartitionKeyRangeMap(partitionKeyRangeMap);
  }

  /**
   * Processes the entire response result and updates the continuation token manager state.
   * This encapsulates all response handling logic in one place.
   */
  public processResponseResult(responseResult: QueryResponseResult): void {
    if (!responseResult) {
      return;
    }

    // Handle partition key range map
    if (responseResult.partitionKeyRangeMap) {
      this.setPartitionKeyRangeMap(responseResult.partitionKeyRangeMap);
    }

    // Handle partition range updates
    if (responseResult.updatedContinuationRanges) {
      this.handlePartitionRangeChanges(responseResult.updatedContinuationRanges);
    }
  }

  // Common range management
  protected isPartitionExhausted(continuationToken: string | null): boolean {
    return (
      !continuationToken ||
      continuationToken === "" ||
      continuationToken === "null" ||
      continuationToken.toLowerCase() === "null"
    );
  }

  protected removeExhaustedRangesFromRanges(): void {
    if (!this.ranges || !Array.isArray(this.ranges)) {
      return;
    }
    this.ranges = this.ranges.filter((mapping) => {
      if (!mapping) {
        return false;
      }
      const isExhausted = this.isPartitionExhausted(mapping.continuationToken);
      return !isExhausted;
    });
  }

  // Common partition range change handling
  public handlePartitionRangeChanges(updatedContinuationRanges: PartitionRangeUpdates): void {
    if (updatedContinuationRanges && Object.keys(updatedContinuationRanges).length === 0) {
      return;
    }
    Object.entries(updatedContinuationRanges).forEach(([rangeKey, rangeChange]) => {
      this.processRangeChange(rangeKey, rangeChange);
    });
  }

  protected processRangeChange(_rangeKey: string, rangeChange: PartitionRangeUpdate): void {
    const { oldRange, newRanges, continuationToken } = rangeChange;
    if (newRanges.length === 1) {
      this.handleRangeMerge(oldRange, newRanges[0], continuationToken);
    } else {
      this.handleRangeSplit(oldRange, newRanges, continuationToken);
    }
  }

  private handleRangeMerge(oldRange: any, newRange: any, continuationToken: string): void {
    // Find existing range mapping to update in the common ranges array
    const existingMappingIndex = this.ranges.findIndex(
      (mapping) =>
        mapping.queryRange.min === oldRange.minInclusive &&
        mapping.queryRange.max === oldRange.maxExclusive,
    );

    if (existingMappingIndex < 0) {
      return;
    }

    // Update existing mapping with new range properties
    const existingMapping = this.ranges[existingMappingIndex];

    // Create new QueryRange with updated boundaries
    const updatedQueryRange = new QueryRange(
      newRange.minInclusive,
      newRange.maxExclusive,
      true, // minInclusive
      false, // maxInclusive (exclusive max)
    );

    // Update the mapping
    existingMapping.queryRange = updatedQueryRange;
    existingMapping.continuationToken = continuationToken;
  }

  private handleRangeSplit(oldRange: any, newRanges: any[], continuationToken: string): void {
    // Remove the old range mapping from the common ranges array
    this.ranges = this.ranges.filter(
      (mapping) =>
        !(
          mapping.queryRange.min === oldRange.minInclusive &&
          mapping.queryRange.max === oldRange.maxExclusive
        ),
    );

    // Add new range mappings for each split range
    newRanges.forEach((newRange) => {
      this.createNewRangeMapping(newRange, continuationToken);
    });
  }

  private createNewRangeMapping(partitionKeyRange: any, continuationToken: string): void {
    // Create new QueryRange
    const queryRange = new QueryRange(
      partitionKeyRange.minInclusive,
      partitionKeyRange.maxExclusive,
      true, // minInclusive
      false, // maxInclusive (exclusive max)
    );

    // Create new QueryRangeWithContinuationToken
    const newRangeWithToken: QueryRangeWithContinuationToken = {
      queryRange: queryRange,
      continuationToken: continuationToken,
    };

    this.ranges.push(newRangeWithToken);
  }
}
