// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PrimitivePartitionKeyValue } from "../../documents/index.js";
import { hashV2PartitionKey } from "./v2.js";

/**
 * Generate Hash for a `Multi Hash` type partition.
 * @param partitionKey - to be hashed.
 * @returns
 */
export function hashMultiHashPartitionKey(partitionKey: PrimitivePartitionKeyValue[]): string {
  return partitionKey.map((keys) => hashV2PartitionKey([keys])).join("");
}
