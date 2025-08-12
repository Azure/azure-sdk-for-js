// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";
import { parsePath } from "./common/index.js";
import type {
  PartitionKey,
  PartitionKeyDefinition,
  PartitionKeyInternal,
  PrimitivePartitionKeyValue,
} from "./documents/index.js";
import {
  convertToInternalPartitionKey,
  NonePartitionKeyLiteral,
  NullPartitionKeyLiteral,
} from "./documents/index.js";
import { DEFAULT_PARTITION_KEY_PATH } from "./common/partitionKeys.js";
import type { Container } from "./client/index.js";
import { readPartitionKeyDefinition } from "./client/ClientUtils.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";

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
export function extractPartitionKeys(
  document: unknown,
  partitionKeyDefinition?: PartitionKeyDefinition,
): PartitionKeyInternal | undefined {
  if (
    !partitionKeyDefinition ||
    !partitionKeyDefinition.paths ||
    partitionKeyDefinition.paths.length <= 0
  ) {
    logger.error("Unexpected Partition Key Definition Found.");
    return undefined;
  }

  if (
    partitionKeyDefinition.paths.length === 1 &&
    partitionKeyDefinition.paths[0] === DEFAULT_PARTITION_KEY_PATH
  ) {
    const defaultKey = extractPartitionKey(DEFAULT_PARTITION_KEY_PATH, document);
    if (defaultKey === undefined) {
      if (partitionKeyDefinition.systemKey === true) {
        return [];
      }
      logger.warning("Unsupported PartitionKey found.");
      return undefined;
    } else if (defaultKey === NullPartitionKeyLiteral || defaultKey === NonePartitionKeyLiteral) {
      if (partitionKeyDefinition.systemKey === true) {
        return [];
      }
    }
    return [defaultKey];
  }

  if (partitionKeyDefinition.systemKey === true) {
    return [];
  }
  const partitionKeys: PrimitivePartitionKeyValue[] = [];
  partitionKeyDefinition.paths.forEach((path: string) => {
    const obj = extractPartitionKey(path, document);
    if (obj === undefined) {
      logger.warning("Unsupported PartitionKey found.");
      return undefined;
    }
    partitionKeys.push(obj);
  });
  return partitionKeys;
}

function extractPartitionKey(path: string, obj: unknown): any {
  const pathParts: string[] = parsePath(path);
  for (const part of pathParts) {
    if (typeof obj === "object" && obj !== null && part in obj) {
      obj = (obj as Record<string, unknown>)[part];
    } else {
      obj = undefined;
      break;
    }
  }
  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
    return obj;
  } else if (obj === NullPartitionKeyLiteral) {
    return NullPartitionKeyLiteral;
  } else if (obj === undefined || JSON.stringify(obj) === JSON.stringify(NonePartitionKeyLiteral)) {
    return NonePartitionKeyLiteral;
  }
  return undefined;
}

/**
 * @hidden
 */
export function undefinedPartitionKey(
  partitionKeyDefinition: PartitionKeyDefinition,
): PartitionKeyInternal {
  if (partitionKeyDefinition?.systemKey) {
    return [];
  } else {
    return partitionKeyDefinition?.paths.map(() => NonePartitionKeyLiteral);
  }
}

/**
 * @hidden
 */
export async function setPartitionKeyIfUndefined(
  diagnosticNode: DiagnosticNodeInternal,
  container: Container,
  partitionKey: PartitionKey,
): Promise<PartitionKeyInternal> {
  if (partitionKey === undefined) {
    const partitionKeyDefinition = await readPartitionKeyDefinition(diagnosticNode, container);
    partitionKey = undefinedPartitionKey(partitionKeyDefinition);
  }
  return convertToInternalPartitionKey(partitionKey);
}
