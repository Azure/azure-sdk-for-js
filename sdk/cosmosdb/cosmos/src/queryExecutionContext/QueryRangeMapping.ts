// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";

/**
 * @hidden
 * Represents a range mapping for query execution context
 */
export interface QueryRangeMapping {
  /**
   * Start and end indexes of the buffer that belong to this partition range
   */
  // TODO: remove it later as user shouldn't see this index by creating another interface and use it in composite token
  indexes: number[];

  /**
   * Continuation token for this partition key range
   */
  continuationToken: string | null;

  /**
   * The partition key range this mapping belongs to
   */
  partitionKeyRange?: PartitionKeyRange;
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
