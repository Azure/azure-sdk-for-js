// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../client/Container/PartitionKeyRange.js";
import type { ClientContext } from "../ClientContext.js";
import type { PartitionKey } from "../documents/PartitionKey.js";
import { convertToInternalPartitionKey } from "../documents/PartitionKeyInternal.js";
import { hashPartitionKey, binarySearchOnPartitionKeyRanges } from "../utils/hashing/hash.js";

/**
 * Filters the given partition key ranges to only include the range that contains
 * the specified partition key. If the partition key definition is not cached or
 * the target range cannot be determined, returns all ranges as a fallback.
 * @param partitionKey - The partition key value from FeedOptions
 * @param partitionKeyRanges - The full list of partition key ranges to filter
 * @param collectionLink - The collection/container link
 * @param clientContext - The client context containing the partition key definition cache
 * @returns Filtered partition key ranges (single range) or all ranges as fallback
 * @hidden
 */
export function filterPartitionKeyRanges(
  partitionKey: PartitionKey,
  partitionKeyRanges: PartitionKeyRange[],
  collectionLink: string,
  clientContext: ClientContext,
): PartitionKeyRange[] {
  const partitionKeyDefinition = clientContext.partitionKeyDefinitionCache[collectionLink];
  if (partitionKeyDefinition) {
    const internalPartitionKey = convertToInternalPartitionKey(partitionKey);
    const hashedPartitionKey = hashPartitionKey(internalPartitionKey, partitionKeyDefinition);
    const targetRangeId = binarySearchOnPartitionKeyRanges(partitionKeyRanges, hashedPartitionKey);
    if (targetRangeId !== undefined) {
      const filtered = partitionKeyRanges.filter(
        (range: PartitionKeyRange) => range.id === targetRangeId,
      );
      if (filtered.length > 0) {
        return filtered;
      }
    }
  }
  return partitionKeyRanges;
}
