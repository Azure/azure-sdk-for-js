// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/constants";
import { QueryRange } from "../routing";
import { hashV2PartitionKey } from "../utils/hashing/v2";
import type {
  NonePartitionKeyType,
  NullPartitionKeyType,
  PartitionKey,
  PrimitivePartitionKeyValue,
} from "./PartitionKey";

/**
 * @hidden
 * Internal Representation Of Partition Key. TODO: Make sure {@link ClientContext} working with only {@link PartitionKeyInternal}
 */
export type PartitionKeyInternal = PrimitivePartitionKeyValue[];
/**
 * @hidden
 * None PartitionKey Literal
 */
export const NonePartitionKeyLiteral: NonePartitionKeyType = {};
/**
 * @hidden
 * Null PartitionKey Literal
 */
export const NullPartitionKeyLiteral: NullPartitionKeyType = null;
/**
 * @hidden
 * Maps PartitionKey to InternalPartitionKey.
 * @param partitionKey - PartitonKey to be converted.
 * @returns PartitionKeyInternal
 */
export function convertToInternalPartitionKey(partitionKey: PartitionKey): PartitionKeyInternal {
  if (Array.isArray(partitionKey)) {
    return partitionKey.map((key) => (key === undefined ? NonePartitionKeyLiteral : key));
  } else return [partitionKey];
}

export async function getEPKRangeForPrefixPartitionKey(
  internalPartitionKey: PartitionKeyInternal,
): Promise<QueryRange> {
  const minEPK = getEffectivePartitionKeyForMultiHashPartitioning(internalPartitionKey);
  const maxEPK =
    minEPK + Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey;
  return new QueryRange(minEPK, maxEPK, true, false);
}

export function getEffectivePartitionKeyForMultiHashPartitioning(
  partitionKeyInternal: PartitionKeyInternal,
): string {
  const hashArray = partitionKeyInternal.map((item) => hashV2PartitionKey([item]));
  return hashArray.join("");
}
