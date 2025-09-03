// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryRange } from "../../index.js";

/**
 * Represents information about a partition range update that occurred during query execution.
 * This includes the original range, new ranges after split/merge, and the continuation token.
 * @hidden
 */
export interface PartitionRangeUpdate {
  /** The original partition key range before the split/merge operation */
  oldRange: QueryRange;
  /** The new partition key ranges after the split/merge operation */
  newRanges: QueryRange[];
  /** The continuation token associated with this range update */
  continuationToken: string;
}

/**
 * A collection of partition range updates indexed by range keys.
 * The key is typically in the format "minInclusive-maxExclusive".
 * @hidden
 */
export type PartitionRangeUpdates = Record<string, PartitionRangeUpdate>;
