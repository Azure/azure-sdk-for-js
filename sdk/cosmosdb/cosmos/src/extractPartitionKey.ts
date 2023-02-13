// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AzureLogger, createClientLogger } from "@azure/logger";
import { parsePath } from "./common";
import {
  NonePartitionKeyLiteral,
  NullPartitionKeyLiteral,
  PartitionKeyDefinition,
  PartitionKeyInternal,
  PrimitivePartitionKeyValue,
} from "./documents";

const logger: AzureLogger = createClientLogger("extractPartitionKey");

/**
 * Function to extract PartitionKey based on {@link PartitionKeyDefinition}
 * from an object.
 * Retuns
 * 1. PartitionKeyInternal[] if extraction is successful.
 * 2. undefined if either {@link partitionKeyDefinition} is not well formed
 * or an unsupported partitionkey type is encountered.
 * @hidden
 */
export function extractPartitionKey(
  document: unknown,
  partitionKeyDefinition?: PartitionKeyDefinition
): PartitionKeyInternal | undefined {
  if (
    partitionKeyDefinition &&
    partitionKeyDefinition.paths &&
    partitionKeyDefinition.paths.length > 0
  ) {
    const partitionKeys: PrimitivePartitionKeyValue[] = [];
    partitionKeyDefinition.paths.forEach((path: string) => {
      const pathParts: string[] = parsePath(path);
      let obj = document;
      for (const part of pathParts) {
        if (typeof obj === "object" && obj !== null && part in obj) {
          obj = (obj as Record<string, unknown>)[part];
        } else {
          obj = undefined;
          break;
        }
      }
      if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
        partitionKeys.push(obj);
      } else if (obj === NullPartitionKeyLiteral) {
        partitionKeys.push(NullPartitionKeyLiteral);
      } else if (
        obj === undefined ||
        JSON.stringify(obj) === JSON.stringify(NonePartitionKeyLiteral)
      ) {
        if (partitionKeyDefinition.systemKey === true) {
          return [];
        }
        partitionKeys.push(NonePartitionKeyLiteral);
      } else {
        logger.warning("Unsupported PartitionKey found.");
        return undefined;
      }
    });
    return partitionKeys;
  }
  logger.warning("Unexpected Partition Key Definition Found.");
  return undefined;
}
/**
 * @hidden
 */
export function undefinedPartitionKey(
  partitionKeyDefinition: PartitionKeyDefinition
): PartitionKeyInternal {
  if (partitionKeyDefinition.systemKey === true) {
    return [];
  } else {
    return partitionKeyDefinition.paths.map(() => NonePartitionKeyLiteral);
  }
}
