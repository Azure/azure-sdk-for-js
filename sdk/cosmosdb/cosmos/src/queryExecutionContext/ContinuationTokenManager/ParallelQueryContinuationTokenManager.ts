// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseContinuationTokenManager } from "./BaseContinuationTokenManager.js";
import type { ParallelQueryResult } from "../parallelQueryResult.js";
import type {
  CompositeQueryContinuationToken,
  QueryRangeWithContinuationToken,
} from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import {
  serializeCompositeToken,
  convertRangeMappingToQueryRange,
} from "../../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { QueryRangeMapping } from "../queryRangeMapping.js";
import { isPartitionRangeActive } from "../PartitionRangeManager.js";

/**
 * Manages continuation tokens for parallel queries using multi-range aggregation.
 * Uses CompositeQueryContinuationToken for range tracking across multiple partitions.
 * @internal
 */
export class ParallelQueryContinuationTokenManager extends BaseContinuationTokenManager {
  protected processRangesForPagination(
    pageSize: number,
    _isResponseEmpty: boolean,
  ): { endIndex: number; processedRanges: string[] } {
    const result = this.partitionManager.processParallelRanges(pageSize);
    if (!result || !result.processedRangeMappings || result.processedRangeMappings.length === 0) {
      return { endIndex: 0, processedRanges: [] };
    }

    const processedMappings = new Set(result.processedRangeMappings);
    const rangeMappings: QueryRangeWithContinuationToken[] = Array.from(
      this.partitionManager.getPartitionKeyRangeMap().values(),
    )
      .map((mapping: QueryRangeMapping) =>
        processedMappings.has(mapping)
          ? mapping
          : {
              ...mapping,
              continuationToken: mapping.previousContinuationToken,
              isActive: true,
            },
      )
      .filter((mapping) => isPartitionRangeActive(mapping.continuationToken, mapping.isActive))
      .map((mapping) => convertRangeMappingToQueryRange(mapping));

    this.updateRangeList(rangeMappings);

    if (result.lastPartitionBeforeCutoff && result.lastPartitionBeforeCutoff.mapping) {
      this.offset = result.lastPartitionBeforeCutoff.mapping.offset;
      this.limit = result.lastPartitionBeforeCutoff.mapping.limit;
    }
    return { endIndex: result.endIndex, processedRanges: result.processedRanges };
  }

  protected getCurrentContinuationToken(): CompositeQueryContinuationToken | undefined {
    if (this.rangeList.length === 0) {
      return undefined;
    }
    return {
      rid: this.collectionLink,
      rangeMappings: this.rangeList,
      offset: this.offset,
      limit: this.limit,
    };
  }

  protected getSerializationFunction(): (token: CompositeQueryContinuationToken) => string {
    return serializeCompositeToken;
  }

  protected processQuerySpecificResponse(responseResult: ParallelQueryResult): void {
    for (const mapping of responseResult.partitionKeyRangeMap.values()) {
      const range = convertRangeMappingToQueryRange(mapping);
      const existingRangeIndex = this.rangeList.findIndex(
        (existingRange) =>
          existingRange.queryRange.min === range.queryRange.min &&
          existingRange.queryRange.max === range.queryRange.max,
      );
      if (!isPartitionRangeActive(mapping.continuationToken, mapping.isActive)) {
        if (existingRangeIndex >= 0) {
          this.rangeList.splice(existingRangeIndex, 1);
        }
      } else if (existingRangeIndex >= 0) {
        this.rangeList[existingRangeIndex] = range;
      } else {
        this.rangeList.push(range);
      }
    }
  }

  protected performQuerySpecificDataTrim(_processedRanges: string[], _endIndex: number): void {
    // Parallel queries don't need additional cleanup
  }

  protected clearQuerySpecificState(): void {
    // Parallel queries don't have additional token state.
  }

  private updateRangeList(rangeMappings: QueryRangeWithContinuationToken[]): void {
    for (const newRange of rangeMappings) {
      const existingRangeIndex = this.rangeList.findIndex(
        (existingRange) =>
          existingRange.queryRange.min === newRange.queryRange.min &&
          existingRange.queryRange.max === newRange.queryRange.max,
      );

      if (existingRangeIndex >= 0) {
        this.rangeList[existingRangeIndex] = newRange;
      } else {
        this.rangeList.push(newRange);
      }
    }
  }
}
