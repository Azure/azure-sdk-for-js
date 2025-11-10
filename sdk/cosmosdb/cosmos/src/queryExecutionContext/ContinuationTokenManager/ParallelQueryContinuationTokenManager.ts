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
  private continuationToken: CompositeQueryContinuationToken | undefined;

  constructor(collectionLink: string, initialContinuationToken?: string) {
    super(collectionLink);
    if (initialContinuationToken) {
      this.continuationToken = parseCompositeQueryContinuationToken(initialContinuationToken);
      this.rangeList = this.continuationToken.rangeMappings || [];
    }
  }

  protected processRangesForPagination(
    pageSize: number,
    _isResponseEmpty: boolean,
  ): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionManager.processParallelRanges(pageSize);
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
      this.continuationToken!.offset = result.lastPartitionBeforeCutoff.mapping.offset;
      this.continuationToken!.limit = result.lastPartitionBeforeCutoff.mapping.limit;
    }
    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
  }

  protected generateContinuationTokenString(): string | undefined {
    return this.continuationToken ? serializeCompositeToken(this.continuationToken) : undefined;
  }

  protected processQuerySpecificResponse(_responseResult: QueryResponseResult): void {
    // Parallel queries don't need additional response processing
  }

  protected performQuerySpecificCleanup(_processedRanges: string[], _endIndex: number): void {
    // Parallel queries don't need additional cleanup
  }

  private updateExistingCompositeContinuationToken(
    rangeMappings: QueryRangeWithContinuationToken[],
  ): void {
    for (const newRange of rangeMappings) {
      // Check if this range already exists in the token
      const existingRangeIndex = this.continuationToken!.rangeMappings.findIndex(
        (existingRange) =>
          existingRange.queryRange.min === newRange.queryRange.min &&
          existingRange.queryRange.max === newRange.queryRange.max,
      );

      if (existingRangeIndex >= 0) {
        // Range exists - update the continuation token
        this.continuationToken!.rangeMappings[existingRangeIndex] = newRange;
      } else {
        // New range - add to the rangeMappings array
        this.continuationToken!.rangeMappings.push(newRange);
      }
    }
  }
}
