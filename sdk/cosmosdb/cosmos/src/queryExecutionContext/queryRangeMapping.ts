// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../client/Container/PartitionKeyRange.js";

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
