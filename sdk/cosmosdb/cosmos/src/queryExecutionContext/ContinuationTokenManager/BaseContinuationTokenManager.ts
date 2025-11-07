// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "../queryRangeMapping.js";
import type {
  QueryRangeWithContinuationToken,
  SimplifiedQueryRange,
} from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../../documents/ContinuationToken/PartitionRangeUpdate.js";
import { PartitionRangeManager } from "../PartitionRangeManager.js";

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
  private ranges: QueryRangeWithContinuationToken[] = [];
  private readonly partitionRangeManager: PartitionRangeManager = new PartitionRangeManager();
  private readonly isUnsupportedQueryType: boolean = false;
  protected readonly collectionLink: string;

  constructor(collectionLink: string, isUnsupportedQueryType: boolean = false) {
    this.collectionLink = collectionLink;
    this.isUnsupportedQueryType = isUnsupportedQueryType;
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
   * Template method for creating continuation tokens.
   * Handles common processing flow while delegating specific logic to subclasses.
   */
  public createContinuationToken(
    pageSize: number,
    isResponseEmpty: boolean,
    responseResult?: QueryResponseResult,
  ): {
    endIndex: number;
    continuationToken?: string;
  } {
    // Process response data first if provided
    if (responseResult) {
      this.processResponseResult(responseResult);
    }

    this.removeExhaustedRangesFromRanges();
    const result = this.processRangesForPagination(pageSize, isResponseEmpty);

    // Clean up processed data automatically
    this.cleanProcessedData(result.processedRanges, result.endIndex);

    // Generate continuation token string
    const tokenString = !this.isUnsupportedQueryType
      ? this.generateContinuationTokenString()
      : undefined;

    return {
      endIndex: result.endIndex,
      continuationToken: tokenString,
    };
  }

  /**
   * Subclasses implement this to handle range processing specific to their query type.
   */
  protected abstract processRangesForPagination(
    pageSize: number,
    isResponseEmpty: boolean,
  ): {
    endIndex: number;
    processedRanges: string[];
  };

  /**
   * Subclasses implement this to generate their specific continuation token format.
   */
  protected abstract generateContinuationTokenString(): string | undefined;

  /**
   * Subclasses implement this to handle response-specific data extraction.
   */
  protected abstract processQuerySpecificResponse(responseResult: QueryResponseResult): void;

  /**
   * Subclasses implement this to handle query-specific cleanup.
   */
  protected abstract performQuerySpecificCleanup(processedRanges: string[], endIndex: number): void;

  private removePartitionRangeMapping(rangeId: string): void {
    this.partitionRangeManager.removePartitionRangeMapping(rangeId);
  }

  /**
   * Cleans up processed data after a page has been returned.
   * Handles both common and query-specific cleanup.
   */
  private cleanProcessedData(processedRanges: string[], endIndex: number): void {
    processedRanges.forEach((rangeId) => {
      this.removePartitionRangeMapping(rangeId);
    });

    // Delegate query-specific cleanup to subclass
    this.performQuerySpecificCleanup(processedRanges, endIndex);
  }

  private setPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    this.partitionRangeManager.setPartitionKeyRangeMap(partitionKeyRangeMap);
  }

  /**
   * Processes the entire response result and updates the continuation token manager state.
   * This encapsulates all response handling logic in one place.
   */
  private processResponseResult(responseResult: QueryResponseResult): void {
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

    // Delegate query-specific processing to subclass
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
    const updatedQueryRange: SimplifiedQueryRange = {
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
    const queryRange: SimplifiedQueryRange = {
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
