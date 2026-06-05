// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../client/index.js";
import type { PartitionKeyDefinition, PrimitivePartitionKeyValue } from "../../documents/index.js";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../documents/index.js";
import { isKeyInRange } from "../batch.js";
import { hashMultiHashPartitionKey } from "./multiHash.js";
import { hashV1PartitionKey } from "./v1.js";
import { hashV2PartitionKey } from "./v2.js";

/**
 * Generate hash of a PartitonKey based on it PartitionKeyDefinition.
 * @param partitionKey - to be hashed.
 * @param partitionDefinition - container's partitionKey definition
 * @returns
 */
export function hashPartitionKey(
  partitionKey: PrimitivePartitionKeyValue[],
  partitionDefinition: PartitionKeyDefinition,
): string {
  const kind: PartitionKeyKind = partitionDefinition?.kind || PartitionKeyKind.Hash; // Default value.
  const isV2 =
    partitionDefinition &&
    partitionDefinition.version &&
    partitionDefinition.version === PartitionKeyDefinitionVersion.V2;
  switch (kind) {
    case PartitionKeyKind.Hash:
      return isV2 ? hashV2PartitionKey(partitionKey) : hashV1PartitionKey(partitionKey);
    case PartitionKeyKind.MultiHash:
      return hashMultiHashPartitionKey(partitionKey);
  }
}

export function binarySearchOnPartitionKeyRanges(
  partitionKeyRanges: PartitionKeyRange[],
  hashedPartitionKey: string,
): string | undefined {
  let low = 0;
  let high = partitionKeyRanges.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const range = partitionKeyRanges[mid];

    if (isKeyInRange(range.minInclusive, range.maxExclusive, hashedPartitionKey)) {
      return range.id;
    } else if (hashedPartitionKey.localeCompare(range.minInclusive) < 0) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return undefined;
}
