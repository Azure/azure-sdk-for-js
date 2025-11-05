// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import type { QueryResponseResult } from "./BaseContinuationTokenManager.js";
import type {
  CompositeQueryContinuationToken,
  QueryRangeWithContinuationToken,
} from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import {
  createCompositeQueryContinuationToken,
  serializeCompositeToken,
  parseCompositeQueryContinuationToken,
  convertRangeMappingToQueryRange,
} from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { QueryRangeMapping } from "../queryRangeMapping.js";

/**
 * Manages continuation tokens for parallel queries using multi-range aggregation.
 * Uses CompositeQueryContinuationToken for range tracking across multiple partitions.
 * @internal
 */
export class ParallelQueryContinuationTokenManager extends BaseContinuationTokenManager {
  private continuationToken: CompositeQueryContinuationToken;

  constructor(
    collectionLink: string,
    initialContinuationToken?: string,
    isUnsupportedQueryType: boolean = false,
  ) {
    super(collectionLink, isUnsupportedQueryType);
    if (initialContinuationToken) {
      this.initializeFromToken(initialContinuationToken);
    }
  }

  protected initializeFromToken(token: string): void {
    this.continuationToken = parseCompositeQueryContinuationToken(token);
    this.ranges = this.continuationToken.rangeMappings || [];
  }

  public createContinuationToken(
    pageSize: number,
    _isResponseEmpty: boolean,
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
    const result = this.processRanges(pageSize);

    // Clean up processed data automatically
    this.cleanProcessedData(result.processedRanges, result.endIndex);

    // Add the continuation token string to the result
    const tokenString = this.isUnsupportedQueryType
      ? undefined
      : this.continuationToken
        ? serializeCompositeToken(this.continuationToken)
        : undefined;

    return {
      ...result,
      continuationToken: tokenString,
    };
  }

  private processRanges(pageSize: number): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionRangeManager.processParallelRanges(pageSize);
    if (!result || !result.processedRangeMappings || result.processedRangeMappings.length === 0) {
      return { endIndex: 0, processedRanges: [] };
    }

    // Convert QueryRangeMapping objects to QueryRangeWithContinuationToken objects using helper
    const rangeMappings: QueryRangeWithContinuationToken[] = result.processedRangeMappings.map(
      (mapping: QueryRangeMapping) => convertRangeMappingToQueryRange(mapping),
    );

    if (!this.continuationToken) {
      this.continuationToken = createCompositeQueryContinuationToken(
        this.collectionLink,
        rangeMappings,
      );
    } else {
      this.updateExistingCompositeContinuationToken(rangeMappings);
    }

    if (result.lastPartitionBeforeCutoff && result.lastPartitionBeforeCutoff.mapping) {
      this.continuationToken.offset = result.lastPartitionBeforeCutoff.mapping.offset;
      this.continuationToken.limit = result.lastPartitionBeforeCutoff.mapping.limit;
    }
    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
  }

  private updateExistingCompositeContinuationToken(
    rangeMappings: QueryRangeWithContinuationToken[],
  ): void {
    for (const newRange of rangeMappings) {
      // Check if this range already exists in the token
      const existingRangeIndex = this.continuationToken.rangeMappings.findIndex(
        (existingRange) =>
          existingRange.queryRange.min === newRange.queryRange.min &&
          existingRange.queryRange.max === newRange.queryRange.max,
      );

      if (existingRangeIndex >= 0) {
        // Range exists - update the continuation token
        this.continuationToken.rangeMappings[existingRangeIndex] = newRange;
      } else {
        // New range - add to the rangeMappings array
        this.continuationToken.rangeMappings.push(newRange);
      }
    }
  }
}
