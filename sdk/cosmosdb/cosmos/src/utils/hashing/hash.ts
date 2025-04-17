// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyDefinition, PrimitivePartitionKeyValue } from "../../documents/index.js";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../documents/index.js";
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
