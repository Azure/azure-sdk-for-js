// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  isPartitionExhausted,
  type QueryRangeWithContinuationToken,
  type RangeBoundary,
} from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type {
  PartitionRangeUpdate,
  PartitionRangeUpdates,
} from "../documents/ContinuationToken/PartitionRangeUpdate.js";
import type { QueryRangeMapping } from "./queryRangeMapping.js";

/**
 * Single owner of all range state for query execution.
 * Manages both ephemeral per-page response data (partitionKeyRangeMap)
 * and persistent accumulated token state (tokenRanges).
 * @hidden
 */
export class PartitionRangeManager {
  /** Ephemeral per-page response data, keyed by server-assigned rangeId. */
  private partitionKeyRangeMap: Map<string, QueryRangeMapping> = new Map();

  /** Persistent accumulated token state, keyed by "min-max" range boundary. */
  private readonly tokenRanges: QueryRangeWithContinuationToken[] = [];

  constructor(initialPartitionKeyRangeMap?: Map<string, QueryRangeMapping>) {
    if (initialPartitionKeyRangeMap) {
      this.partitionKeyRangeMap = new Map(initialPartitionKeyRangeMap);
    }
  }

  // ── Token ranges (persistent accumulated state) ────────────────────────

  /**
   * Initializes token ranges from a parsed continuation token.
   * Should only be called once during construction.
   */
  public initializeTokenRanges(ranges: QueryRangeWithContinuationToken[]): void {
    this.tokenRanges.push(...ranges);
  }

  /**
   * Returns the current token ranges for serialization.
   */
  public getTokenRanges(): QueryRangeWithContinuationToken[] {
    return this.tokenRanges;
  }

  /**
   * Updates or adds token ranges from processed response data.
   * Matches by min/max boundary: updates existing entries, appends new ones.
   */
  public updateTokenRanges(rangeMappings: QueryRangeWithContinuationToken[]): void {
    for (const newRange of rangeMappings) {
      const existingIndex = this.tokenRanges.findIndex(
        (existing) =>
          existing.queryRange.min === newRange.queryRange.min &&
          existing.queryRange.max === newRange.queryRange.max,
      );
      if (existingIndex >= 0) {
        this.tokenRanges[existingIndex] = newRange;
      } else {
        this.tokenRanges.push(newRange);
      }
    }
  }

  /**
   * Replaces all token ranges with a single range.
   * Used by ORDER BY queries which track only one active range.
   */
  public setTokenRanges(ranges: QueryRangeWithContinuationToken[]): void {
    this.tokenRanges.length = 0;
    this.tokenRanges.push(...ranges);
  }

  /**
   * Removes exhausted (fully drained) entries from token ranges.
   */
  public removeExhaustedTokenRanges(): void {
    let writeIndex = 0;
    for (let i = 0; i < this.tokenRanges.length; i++) {
      const mapping = this.tokenRanges[i];
      if (mapping && !isPartitionExhausted(mapping.continuationToken)) {
        this.tokenRanges[writeIndex++] = mapping;
      }
    }
    this.tokenRanges.length = writeIndex;
  }

  /**
   * Handles partition range changes (splits and merges) on token ranges.
   * Called when the server reports range topology changes.
   */
  public handlePartitionRangeChanges(updatedContinuationRanges: PartitionRangeUpdates): void {
    if (!updatedContinuationRanges || Object.keys(updatedContinuationRanges).length === 0) {
      return;
    }
    for (const rangeChange of Object.values(updatedContinuationRanges)) {
      this.processRangeChange(rangeChange);
    }
  }

  private processRangeChange(rangeChange: PartitionRangeUpdate): void {
    const { oldRange, newRanges, continuationToken } = rangeChange;
    if (newRanges.length === 1) {
      this.handleRangeMerge(oldRange, newRanges[0], continuationToken);
    } else {
      this.handleRangeSplit(oldRange, newRanges, continuationToken);
    }
  }

  private handleRangeMerge(oldRange: any, newRange: any, continuationToken: string): void {
    const existingIndex = this.tokenRanges.findIndex(
      (mapping) =>
        mapping.queryRange.min === oldRange.min && mapping.queryRange.max === oldRange.max,
    );
    if (existingIndex < 0) {
      return;
    }
    const existing = this.tokenRanges[existingIndex];
    existing.queryRange = { min: newRange.min, max: newRange.max } as RangeBoundary;
    existing.continuationToken = continuationToken;
  }

  private handleRangeSplit(oldRange: any, newRanges: any[], continuationToken: string): void {
    // Remove old range in-place
    let writeIndex = 0;
    for (let i = 0; i < this.tokenRanges.length; i++) {
      const mapping = this.tokenRanges[i];
      if (
        !(mapping.queryRange.min === oldRange.min && mapping.queryRange.max === oldRange.max)
      ) {
        this.tokenRanges[writeIndex++] = mapping;
      }
    }
    this.tokenRanges.length = writeIndex;

    // Add new split ranges
    for (const range of newRanges) {
      this.tokenRanges.push({
        queryRange: { min: range.min, max: range.max } as RangeBoundary,
        continuationToken,
      });
    }
  }

  // ── Partition key range map (ephemeral per-page data) ──────────────────

  /**
   * Gets a copy of the current partition key range map for constructor pattern
   */
  public getPartitionKeyRangeMap(): Map<string, QueryRangeMapping> {
    return new Map(this.partitionKeyRangeMap);
  }

  /**
   * Adds a range mapping to the partition key range map.
   * Does not allow updates to existing keys - only new additions.
   */
  private addPartitionRangeMapping(rangeId: string, mapping: QueryRangeMapping): void {
    if (!this.partitionKeyRangeMap.has(rangeId)) {
      this.partitionKeyRangeMap.set(rangeId, mapping);
    }
  }

  /**
   * Removes a range mapping from the partition key range map
   */
  public removePartitionRangeMapping(rangeId: string): void {
    this.partitionKeyRangeMap.delete(rangeId);
  }

  /**
   * Updates the partition key range map with new mappings from the endpoint response
   */
  public addPartitionKeyRangeMap(partitionKeyRangeMap: Map<string, QueryRangeMapping>): void {
    if (partitionKeyRangeMap) {
      for (const [rangeId, mapping] of partitionKeyRangeMap) {
        this.addPartitionRangeMapping(rangeId, mapping);
      }
    }
  }

  /**
   * Checks if there are any unprocessed ranges in the sliding window
   */
  public hasUnprocessedRanges(): boolean {
    return this.partitionKeyRangeMap.size > 0;
  }

  /**
   * Removes exhausted(fully drained) ranges from the given range mappings
   */
  public removeExhaustedRanges(rangeMappings: QueryRangeMapping[]): QueryRangeMapping[] {
    if (!rangeMappings || !Array.isArray(rangeMappings)) {
      return [];
    }
    return rangeMappings.filter((mapping) => {
      return mapping && !isPartitionExhausted(mapping.continuationToken);
    });
  }

  /**
   * Processes ranges for ORDER BY queries
   */
  public processOrderByRanges(pageSize: number): {
    endIndex: number;
    processedRanges: string[];
    lastRangeBeforePageLimit: QueryRangeMapping | null;
  } {
    let endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | null = null;
    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      const { itemCount } = value;
      if (endIndex + itemCount <= pageSize) {
        lastRangeBeforePageLimit = value;
        endIndex += itemCount;
        processedRanges.push(rangeId);
      } else {
        break;
      }
    }
    return { endIndex, processedRanges, lastRangeBeforePageLimit };
  }

  public processEmptyOrderByRanges(ranges: QueryRangeWithContinuationToken[]): {
    endIndex: number;
    processedRanges: string[];
    lastRangeBeforePageLimit: QueryRangeMapping | undefined;
  } {
    const endIndex = 0;
    const processedRanges: string[] = [];
    let lastRangeBeforePageLimit: QueryRangeMapping | undefined;

    for (const [rangeId, _] of this.partitionKeyRangeMap) {
      processedRanges.push(rangeId);
    }
    for (const [_, mapping] of this.partitionKeyRangeMap) {
      if (
        mapping.partitionKeyRange!.minInclusive === ranges[0].queryRange.min &&
        mapping.partitionKeyRange!.maxExclusive === ranges[0].queryRange.max
      ) {
        lastRangeBeforePageLimit = mapping;
        break;
      }
    }
    return { endIndex, processedRanges, lastRangeBeforePageLimit };
  }

  /**
   * Processes ranges for parallel queries - multi-range aggregation
   */
  public processParallelRanges(pageSize: number): {
    endIndex: number;
    processedRanges: string[];
    processedRangeMappings: QueryRangeMapping[];
    lastPartitionBeforeCutoff?: { rangeId: string; mapping: QueryRangeMapping };
  } {
    let endIndex = 0;
    const processedRanges: string[] = [];
    const processedRangeMappings: QueryRangeMapping[] = [];
    let lastPartitionBeforeCutoff: { rangeId: string; mapping: QueryRangeMapping } | undefined;

    for (const [rangeId, value] of this.partitionKeyRangeMap) {
      if (!value || value.itemCount === undefined) {
        continue;
      }
      const { itemCount } = value;
      if (endIndex + itemCount <= pageSize) {
        lastPartitionBeforeCutoff = { rangeId, mapping: value };
        endIndex += itemCount;
        processedRanges.push(rangeId);
        processedRangeMappings.push(value);
      } else {
        break;
      }
    }
    return { endIndex, processedRanges, processedRangeMappings, lastPartitionBeforeCutoff };
  }
}
