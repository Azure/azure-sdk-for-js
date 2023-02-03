// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PrimitivePartitionKeyValue } from "../../documents";
import { hashV2PartitionKey } from "./v2";

/**
 * Generate Hash for a `Multi Hash` type partition.
 * @param partitionKey - to be hashed.
 * @returns
 */
export function hashMultiHashPartitionKey(partitionKey: PrimitivePartitionKeyValue[]): string {
  return partitionKey.map((keys) => hashV2PartitionKey([keys])).join("");
}
