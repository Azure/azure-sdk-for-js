// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { parsePath } from "./common";
import { PartitionKey, PartitionKeyDefinition } from "./documents";

/**
 * @hidden
 */
export function extractPartitionKey(
  document: unknown,
  partitionKeyDefinition: PartitionKeyDefinition
): PartitionKey[] {
  if (
    partitionKeyDefinition &&
    partitionKeyDefinition.paths &&
    partitionKeyDefinition.paths.length > 0
  ) {
    const partitionKey: PartitionKey[] = [];
    partitionKeyDefinition.paths.forEach((path: string) => {
      const pathParts = parsePath(path);
      let obj = document;
      for (const part of pathParts) {
        if (typeof obj === "object" && part in obj) {
          obj = (obj as Record<string, unknown>)[part];
        } else {
          obj = undefined;
          break;
        }
      }
      partitionKey.push(obj);
    });
    if (partitionKey.length === 1 && partitionKey[0] === undefined) {
      return undefinedPartitionKey(partitionKeyDefinition);
    }
    return partitionKey;
  }
}
/**
 * @hidden
 */
export function undefinedPartitionKey(partitionKeyDefinition: PartitionKeyDefinition): unknown[] {
  if (partitionKeyDefinition.systemKey === true) {
    return [];
  } else {
    return [{}];
  }
}
