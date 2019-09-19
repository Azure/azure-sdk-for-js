// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { parsePath } from "./common";
import { PartitionKey, PartitionKeyDefinition } from "./documents";

/**
 * @ignore
 * @param document
 * @param partitionKeyDefinition
 */
export function extractPartitionKey(
  document: any,
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
        if (!(typeof obj === "object" && part in obj)) {
          obj = undefined;
          break;
        }
        obj = obj[part];
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
 * @ignore
 * @param partitionKeyDefinition
 */
export function undefinedPartitionKey(partitionKeyDefinition: PartitionKeyDefinition) {
  if (partitionKeyDefinition.systemKey === true) {
    return [];
  } else {
    return [{}];
  }
}
