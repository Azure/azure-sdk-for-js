// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
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
