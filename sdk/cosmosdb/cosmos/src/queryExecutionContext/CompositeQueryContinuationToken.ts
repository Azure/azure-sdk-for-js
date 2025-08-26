// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRangeMapping } from "./QueryRangeMapping.js";

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
   * Current offset value for OFFSET/LIMIT queries
   */
  public offset?: number;

  /**
   * Current limit value for OFFSET/LIMIT queries
   */
  public limit?: number;

  /**
   * Global continuation token (to be removed in future refactoring)
   */
  public globalContinuationToken?: string;

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
