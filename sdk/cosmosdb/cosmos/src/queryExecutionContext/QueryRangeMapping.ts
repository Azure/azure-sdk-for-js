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
