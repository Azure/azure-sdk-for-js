// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../client/Container/PartitionKeyRange.js";
import type { OrderByContinuationFilter } from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";

/**
 * @hidden
 * Represents a range mapping for partition key range
 */
export interface QueryRangeMapping {
  /**
   * @internal
   * Number of items from this partition range in the current buffer
   */
  itemCount: number;

  /**
   * Continuation token for this partition key range
   */
  continuationToken: string | undefined;

  /**
   * Continuation token from before the buffered page was fetched.
   */
  previousContinuationToken?: string;

  /**
   * Whether this logical range still has work to resume.
   */
  isActive?: boolean;

  /**
   * Whether this logical range owns the global ORDER BY RID/skip checkpoint.
   */
  isOrderByCheckpoint?: boolean;

  /**
   * ORDER BY post-fetch state paired with continuationToken.
   */
  orderByFilter?: OrderByContinuationFilter;

  /**
   * ORDER BY post-fetch state paired with previousContinuationToken.
   */
  previousOrderByFilter?: OrderByContinuationFilter;

  /**
   * The partition key range this mapping belongs to
   */
  partitionKeyRange: PartitionKeyRange;

  /**
   * Hash of the last document result for this partition key range (for distinct queries)
   */
  hashedLastResult?: string;

  offset?: number;

  limit?: number;
}
