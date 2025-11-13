// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "../queryRangeMapping.js";
import type {
  QueryRangeWithContinuationToken,
  RangeBoundary,
} from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../../documents/ContinuationToken/PartitionRangeUpdate.js";
import { PartitionRangeManager } from "../PartitionRangeManager.js";
import type { ParallelQueryResult } from "../parallelQueryResult.js";

/**
 * Base abstract class for continuation token management.
 * Provides common functionality shared between parallel and ORDER BY query token managers.
 * @internal
 */
export abstract class BaseContinuationTokenManager {
  private ranges: QueryRangeWithContinuationToken[] = [];
  private readonly partitionRangeManager: PartitionRangeManager = new PartitionRangeManager();
  protected readonly collectionLink: string;

  constructor(collectionLink: string) {
    this.collectionLink = collectionLink;
  }

  /**
   * Provides controlled access to partition range manager for subclasses.
   * This is the only protected access point needed.
   */
  protected get partitionManager(): PartitionRangeManager {
    return this.partitionRangeManager;
  }

  /**
   * Provides controlled access to ranges for subclasses.
   * Made protected to allow subclass range management.
   */
  protected get rangeList(): QueryRangeWithContinuationToken[] {
    return this.ranges;
  }

  protected set rangeList(ranges: QueryRangeWithContinuationToken[]) {
    this.ranges = ranges;
  }

  /**
   * Processes query results and generates continuation tokens for pagination.
   * Handles response data processing, range management, and token generation.
   *
   * @param pageSize - Maximum number of items to return in this page
   * @param isResponseEmpty - Whether the current response contains no data
   * @param responseResult - Optional response data containing partition mappings and query-specific data
   * @returns Object containing the end index for slicing results and optional continuation token for next page
   */
  public paginateResults(
    pageSize: number,
    isResponseEmpty: boolean,
    responseResult?: ParallelQueryResult,
  ): {
    endIndex: number;
    continuationToken?: string;
  } {
    // Process response data
    if (responseResult) {
      this.processResponseResult(responseResult);
    }

    this.removeExhaustedRangesFromRanges();
    const result = this.processRangesForPagination(pageSize, isResponseEmpty);
    const tokenString = this.generateContinuationTokenString();

    // Clean up processed ranges
    this.trimProcessedData(result.processedRanges, result.endIndex);

    return {
      endIndex: result.endIndex,
      continuationToken: tokenString,
    };
  }

  protected abstract processRangesForPagination(
    pageSize: number,
    isResponseEmpty: boolean,
  ): {
    endIndex: number;
    processedRanges: string[];
  };

  protected abstract generateContinuationTokenString(): string | undefined;
  protected abstract processQuerySpecificResponse(responseResult: ParallelQueryResult): void;
  protected abstract performQuerySpecificDataTrim(
    processedRanges: string[],
    endIndex: number,
  ): void;

  /**
   * Cleans up processed data after a page has been returned.
   * Handles both common and query-specific cleanup.
   */
  private trimProcessedData(processedRanges: string[], endIndex: number): void {
    processedRanges.forEach((rangeId) => {
      this.partitionRangeManager.removePartitionRangeMapping(rangeId);
    });

    // Delegate query-specific cleanup to subclass
    this.performQuerySpecificDataTrim(processedRanges, endIndex);
  }

  private addPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    this.partitionRangeManager.addPartitionKeyRangeMap(partitionKeyRangeMap);
  }

  /**
   * Processes the entire response result and updates the continuation token manager state.
   * This encapsulates all response handling logic in one place.
   */
  private processResponseResult(responseResult: ParallelQueryResult): void {
    // Handle partition key range map
    if (responseResult.partitionKeyRangeMap) {
      this.addPartitionKeyRangeMap(responseResult.partitionKeyRangeMap);
    }

    // Handle partition range updates
    if (responseResult.updatedContinuationRanges) {
      this.handlePartitionRangeChanges(responseResult.updatedContinuationRanges);
    }

    this.processQuerySpecificResponse(responseResult);
  }

  private isPartitionExhausted(continuationToken: string | null): boolean {
    return (
      !continuationToken ||
      continuationToken === "" ||
      continuationToken === "null" ||
      continuationToken.toLowerCase() === "null"
    );
  }

  private removeExhaustedRangesFromRanges(): void {
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

  private handlePartitionRangeChanges(updatedContinuationRanges: PartitionRangeUpdates): void {
    if (updatedContinuationRanges && Object.keys(updatedContinuationRanges).length === 0) {
      return;
    }
    Object.entries(updatedContinuationRanges).forEach(([rangeKey, rangeChange]) => {
      this.processRangeChange(rangeKey, rangeChange);
    });
  }

  private processRangeChange(_rangeKey: string, rangeChange: PartitionRangeUpdate): void {
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
        mapping.queryRange.min === oldRange.min && mapping.queryRange.max === oldRange.max,
    );

    if (existingMappingIndex < 0) {
      return;
    }

    // Update existing mapping with new range properties
    const existingMapping = this.ranges[existingMappingIndex];

    // Create new simplified QueryRange with updated boundaries
    const updatedQueryRange: RangeBoundary = {
      min: newRange.min,
      max: newRange.max,
    };

    // Update the mapping
    existingMapping.queryRange = updatedQueryRange;
    existingMapping.continuationToken = continuationToken;
  }

  private handleRangeSplit(oldRange: any, newRanges: any[], continuationToken: string): void {
    // Remove the old range mapping from the common ranges array
    this.ranges = this.ranges.filter(
      (mapping) =>
        !(mapping.queryRange.min === oldRange.min && mapping.queryRange.max === oldRange.max),
    );

    // Add new range mappings for each split range
    newRanges.forEach((newRange) => {
      this.createNewRangeMapping(newRange, continuationToken);
    });
  }

  private createNewRangeMapping(partitionKeyRange: any, continuationToken: string): void {
    // Create new simplified QueryRange
    const queryRange: RangeBoundary = {
      min: partitionKeyRange.min,
      max: partitionKeyRange.max,
    };

    // Create new QueryRangeWithContinuationToken
    const newRangeWithToken: QueryRangeWithContinuationToken = {
      queryRange: queryRange,
      continuationToken: continuationToken,
    };

    this.ranges.push(newRangeWithToken);
  }
}
