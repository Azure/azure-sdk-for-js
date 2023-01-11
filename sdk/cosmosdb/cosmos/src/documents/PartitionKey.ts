// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NonePartitionKeyLiteral, NullPartitionKeyLiteral } from "./PartitionKeyInternal";

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

/**
 * Builder class for building PartitionKey.
 */
export class PartitionKeyBuilder {
  readonly values: PrimitivePartitionKeyValue[] = [];
  public addValue(value: string | boolean | number): PartitionKeyBuilder {
    this.values.push(value);
    return this;
  }
  public addNullValue() {
    this.values.push(NullPartitionKeyLiteral)
  }
  public addNoneValue() {
    this.values.push(NonePartitionKeyLiteral)
  }
  public build(): PartitionKey {
    return [...this.values];
  }
}