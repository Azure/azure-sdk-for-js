// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NonePartitionKeyLiteral, NullPartitionKeyLiteral } from "./PartitionKeyInternal";

/**
 * PartitionKey of a container.
 * @remarks
 * - PartitionKeyDefinition is no longer part of PartitionKey. So please use PartitionKeyDefinition
 * type directly where appropriate.
 */
export type PartitionKey = PrimitivePartitionKeyValue | PrimitivePartitionKeyValue[];

/**
 * A primitive Partition Key value.
 */
export type PrimitivePartitionKeyValue =
  | string
  | number
  | boolean
  | NullPartitionKeyType
  | NonePartitionKeyType;

/**
 * The returned object represents a partition key value that allows creating and accessing items
 * with a null value for the partition key.
 */
export type NullPartitionKeyType = null;

/**
 * The returned object represents a partition key value that allows creating and accessing items
 * without a value for partition key
 */
export type NonePartitionKeyType = {
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
  public addNullValue(): void {
    this.values.push(NullPartitionKeyLiteral);
  }
  public addNoneValue(): void {
    this.values.push(NonePartitionKeyLiteral);
  }
  public build(): PartitionKey {
    return [...this.values];
  }
}
