// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type PartitionKey = PrimitivePartitionKeyValue | PrimitivePartitionKeyValue[];

/**
 * A primitive Partition Key value.
 */
export type PrimitivePartitionKeyValue =
  | string
  | number
  | boolean
  | NullPartitionType
  | NonePartitionKey;

/**
 * The returned object represents a partition key value that allows creating and accessing items
 * with a null value for the partition key.
 */
export type NullPartitionType = null;

/**
 * The returned object represents a partition key value that allows creating and accessing items
 * without a value for partition key
 */
export type NonePartitionKey = {
  [K in any]: never;
};