// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";

/**
 * @hidden
 * Extended partition key range that includes effective partition key (EPK) boundaries
 * for handling partition split and merge scenarios
 */
export interface ExtendedPartitionKeyRange extends PartitionKeyRange {
  /**
   * Effective partition key minimum boundary (used for split/merge operations)
   */
  epkMin?: string;

  /**
   * Effective partition key maximum boundary (used for split/merge operations)
   */
  epkMax?: string;
}

/**
 * @hidden
 * Represents a range mapping for query execution context
 */
export interface QueryRangeMapping {
  /**
   * Number of items from this partition range in the current buffer
   */
  itemCount: number;

  /**
   * Continuation token for this partition key range
   */
  continuationToken: string | null;

  /**
   * The extended partition key range this mapping belongs to (includes EPK boundaries)
   */
  partitionKeyRange?: ExtendedPartitionKeyRange;

  /**
   * Hash of the last document result for this partition key range (for distinct queries)
   */
  hashedLastResult?: string;

  offset?: number;

  limit?: number;
}

/**
 * @hidden
 * Creates an ExtendedPartitionKeyRange from a regular PartitionKeyRange
 * @param partitionKeyRange - The base partition key range
 * @param epkMin - Optional effective partition key minimum boundary
 * @param epkMax - Optional effective partition key maximum boundary
 * @returns Extended partition key range with EPK boundaries
 */
export function createExtendedPartitionKeyRange(
  partitionKeyRange: PartitionKeyRange,
  epkMin?: string,
  epkMax?: string,
): ExtendedPartitionKeyRange {
  return {
    ...partitionKeyRange,
    epkMin: epkMin || partitionKeyRange.minInclusive,
    epkMax: epkMax || partitionKeyRange.maxExclusive,
  };
}

/**
 * @hidden
 * Checks if a partition key range has EPK boundaries defined
 * @param partitionKeyRange - The partition key range to check
 * @returns True if EPK boundaries are defined
 */
export function hasEpkBoundaries(partitionKeyRange: ExtendedPartitionKeyRange): boolean {
  return !!(partitionKeyRange.epkMin && partitionKeyRange.epkMax);
}

/**
 * @hidden
 * Gets the effective minimum boundary for a partition key range
 * Falls back to minInclusive if epkMin is not defined
 * @param partitionKeyRange - The partition key range
 * @returns The effective minimum boundary
 */
export function getEffectiveMin(partitionKeyRange: ExtendedPartitionKeyRange): string {
  return partitionKeyRange.epkMin || partitionKeyRange.minInclusive;
}

/**
 * @hidden
 * Gets the effective maximum boundary for a partition key range
 * Falls back to maxExclusive if epkMax is not defined
 * @param partitionKeyRange - The partition key range
 * @returns The effective maximum boundary
 */
export function getEffectiveMax(partitionKeyRange: ExtendedPartitionKeyRange): string {
  return partitionKeyRange.epkMax || partitionKeyRange.maxExclusive;
}

/**
 * @hidden
 * Checks if two partition key ranges overlap based on their effective boundaries
 * @param range1 - First partition key range
 * @param range2 - Second partition key range
 * @returns True if the ranges overlap
 */
export function partitionRangesOverlap(
  range1: ExtendedPartitionKeyRange,
  range2: ExtendedPartitionKeyRange,
): boolean {
  const range1Min = getEffectiveMin(range1);
  const range1Max = getEffectiveMax(range1);
  const range2Min = getEffectiveMin(range2);
  const range2Max = getEffectiveMax(range2);

  return range1Min < range2Max && range2Min < range1Max;
}

/**
 * @hidden
 * Creates a partition key range for split scenarios
 * @param originalRange - The original partition that is being split
 * @param newId - ID for the new partition
 * @param newMinInclusive - New logical minimum boundary
 * @param newMaxExclusive - New logical maximum boundary
 * @param epkMin - Effective partition key minimum
 * @param epkMax - Effective partition key maximum
 * @returns New extended partition key range for split scenario
 */
export function createPartitionKeyRangeForSplit(
  originalRange: ExtendedPartitionKeyRange,
  newId: string,
  newMinInclusive: string,
  newMaxExclusive: string,
  epkMin?: string,
  epkMax?: string,
): ExtendedPartitionKeyRange {
  return {
    id: newId,
    minInclusive: newMinInclusive,
    maxExclusive: newMaxExclusive,
    ridPrefix: originalRange.ridPrefix, // Inherit from parent
    throughputFraction: originalRange.throughputFraction / 2, // Split throughput
    status: originalRange.status,
    parents: [originalRange.id], // Track parent for split
    epkMin: epkMin || newMinInclusive,
    epkMax: epkMax || newMaxExclusive,
  };
}

/**
 * @hidden
 * Composite continuation token for parallel query execution across multiple partition ranges
 */
export class CompositeQueryContinuationToken {
  /**
   * Resource ID of the container for which the continuation token is issued
   */
  public readonly rid: string;

  /**
   * List of query range mappings part of the continuation token
   */
  public rangeMappings: QueryRangeMapping[];

  /**
   * Global continuation token state
   */
  public readonly globalContinuationToken?: string;

  /**
   * Current offset value for OFFSET/LIMIT queries
   */
  public offset?: number;

  /**
   * Current limit value for OFFSET/LIMIT queries
   */
  public limit?: number;

  constructor(
    rid: string, 
    rangeMappings: QueryRangeMapping[], 
    globalContinuationToken?: string,
    offset?: number,
    limit?: number
  ) {
    this.rid = rid;
    this.rangeMappings = rangeMappings;
    this.globalContinuationToken = globalContinuationToken; // TODO: refactor remove it
    this.offset = offset;
    this.limit = limit;
  }

  /**
   * Adds a range mapping to the continuation token
   */
  public addRangeMapping(rangeMapping: QueryRangeMapping): void {
    this.rangeMappings.push(rangeMapping);
  }

  /**
   * Serializes the composite continuation token to a JSON string
   */
  public toString(): string {
    return JSON.stringify({
      rid: this.rid,
      rangeMappings: this.rangeMappings,
      globalContinuationToken: this.globalContinuationToken,
      offset: this.offset,
      limit: this.limit,
    });
  }

  /**
   * Deserializes a JSON string to a CompositeQueryContinuationToken
   */
  public static fromString(tokenString: string): CompositeQueryContinuationToken {
    const parsed = JSON.parse(tokenString);
    return new CompositeQueryContinuationToken(
      parsed.rid,
      parsed.rangeMappings,
      parsed.globalContinuationToken,
      parsed.offset,
      parsed.limit,
    );
  }
}
