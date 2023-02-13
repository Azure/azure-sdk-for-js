// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JSONObject } from "../queryExecutionContext";
import { extractPartitionKey } from "../extractPartitionKey";
import { PartitionKeyDefinition } from "../documents";
import { RequestOptions } from "..";
import { PatchRequestBody } from "./patch";
import { v4 } from "uuid";
import { bodyFromData } from "../request/request";
import { Constants } from "../common/constants";
const uuid = v4;

export type Operation =
  | CreateOperation
  | UpsertOperation
  | ReadOperation
  | DeleteOperation
  | ReplaceOperation
  | BulkPatchOperation;

export interface Batch {
  min: string;
  max: string;
  rangeId: string;
  indexes: number[];
  operations: Operation[];
}

export interface OperationResponse {
  statusCode: number;
  requestCharge: number;
  eTag?: string;
  resourceBody?: JSONObject;
}

/**
 * Options object used to modify bulk execution.
 * continueOnError (Default value: false) - Continues bulk execution when an operation fails ** NOTE THIS WILL DEFAULT TO TRUE IN the 4.0 RELEASE
 */
export interface BulkOptions {
  continueOnError?: boolean;
}

export function isKeyInRange(min: string, max: string, key: string): boolean {
  const isAfterMinInclusive = key.localeCompare(min) >= 0;
  const isBeforeMax = key.localeCompare(max) < 0;
  return isAfterMinInclusive && isBeforeMax;
}

export interface OperationBase {
  partitionKey?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
}

export const BulkOperationType = {
  Create: "Create",
  Upsert: "Upsert",
  Read: "Read",
  Delete: "Delete",
  Replace: "Replace",
  Patch: "Patch",
} as const;

export type OperationInput =
  | CreateOperationInput
  | UpsertOperationInput
  | ReadOperationInput
  | DeleteOperationInput
  | ReplaceOperationInput
  | PatchOperationInput;

export interface CreateOperationInput {
  partitionKey?: string | number | null | Record<string, unknown> | undefined;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Create;
  resourceBody: JSONObject;
}

export interface UpsertOperationInput {
  partitionKey?: string | number | null | Record<string, unknown> | undefined;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Upsert;
  resourceBody: JSONObject;
}

export interface ReadOperationInput {
  partitionKey?: string | number | boolean | null | Record<string, unknown> | undefined;
  operationType: typeof BulkOperationType.Read;
  id: string;
}

export interface DeleteOperationInput {
  partitionKey?: string | number | null | Record<string, unknown> | undefined;
  operationType: typeof BulkOperationType.Delete;
  id: string;
}

export interface ReplaceOperationInput {
  partitionKey?: string | number | null | Record<string, unknown> | undefined;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Replace;
  resourceBody: JSONObject;
  id: string;
}

export interface PatchOperationInput {
  partitionKey?: string | number | null | Record<string, unknown> | undefined;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Patch;
  resourceBody: PatchRequestBody;
  id: string;
}

export type OperationWithItem = OperationBase & {
  resourceBody: JSONObject;
};

export type CreateOperation = OperationWithItem & {
  operationType: typeof BulkOperationType.Create;
};

export type UpsertOperation = OperationWithItem & {
  operationType: typeof BulkOperationType.Upsert;
};

export type ReadOperation = OperationBase & {
  operationType: typeof BulkOperationType.Read;
  id: string;
};

export type DeleteOperation = OperationBase & {
  operationType: typeof BulkOperationType.Delete;
  id: string;
};

export type ReplaceOperation = OperationWithItem & {
  operationType: typeof BulkOperationType.Replace;
  id: string;
};

export type BulkPatchOperation = OperationBase & {
  operationType: typeof BulkOperationType.Patch;
  id: string;
};

export function hasResource(
  operation: Operation
): operation is CreateOperation | UpsertOperation | ReplaceOperation {
  return (
    operation.operationType !== "Patch" &&
    (operation as OperationWithItem).resourceBody !== undefined
  );
}

export function getPartitionKeyToHash(operation: Operation, partitionProperty: string): any {
  const toHashKey = hasResource(operation)
    ? deepFind(operation.resourceBody, partitionProperty)
    : (operation.partitionKey && operation.partitionKey.replace(/[[\]"']/g, "")) ||
      operation.partitionKey;
  // We check for empty object since replace will stringify the value
  // The second check avoids cases where the partitionKey value is actually the string '{}'
  if (toHashKey === "{}" && operation.partitionKey === "[{}]") {
    return {};
  }
  if (toHashKey === "null" && operation.partitionKey === "[null]") {
    return null;
  }
  if (toHashKey === "0" && operation.partitionKey === "[0]") {
    return 0;
  }
  return toHashKey;
}

export function decorateOperation(
  operation: OperationInput,
  definition: PartitionKeyDefinition,
  options: RequestOptions = {}
): Operation {
  if (
    operation.operationType === BulkOperationType.Create ||
    operation.operationType === BulkOperationType.Upsert
  ) {
    if (
      (operation.resourceBody.id === undefined || operation.resourceBody.id === "") &&
      !options.disableAutomaticIdGeneration
    ) {
      operation.resourceBody.id = uuid();
    }
  }
  if ("partitionKey" in operation) {
    const extracted = extractPartitionKey(operation, { paths: ["/partitionKey"] });
    return { ...operation, partitionKey: JSON.stringify(extracted) } as Operation;
  } else if (
    operation.operationType === BulkOperationType.Create ||
    operation.operationType === BulkOperationType.Replace ||
    operation.operationType === BulkOperationType.Upsert
  ) {
    const pk = extractPartitionKey(operation.resourceBody, definition);
    return { ...operation, partitionKey: JSON.stringify(pk) } as Operation;
  } else if (
    operation.operationType === BulkOperationType.Read ||
    operation.operationType === BulkOperationType.Delete
  ) {
    return { ...operation, partitionKey: "[{}]" };
  }
  return operation as Operation;
}

/**
 * Splits a batch into array of batches based on cumulative size of its operations by making sure
 * cumulative size of an individual batch is not larger than {@link Constants.DefaultMaxBulkRequestBodySizeInBytes}.
 * If a single operation itself is larger than {@link Constants.DefaultMaxBulkRequestBodySizeInBytes}, that
 * operation would be moved into a batch containing only that operation.
 * @param originalBatch - A batch of operations needed to be checked.
 * @returns
 * @hidden
 */
export function splitBatchBasedOnBodySize(originalBatch: Batch): Batch[] {
  if (originalBatch?.operations === undefined || originalBatch.operations.length < 1) return [];
  let currentBatchSize = calculateObjectSizeInBytes(originalBatch.operations[0]);
  let currentBatch: Batch = {
    ...originalBatch,
    operations: [originalBatch.operations[0]],
    indexes: [originalBatch.indexes[0]],
  };
  const processedBatches: Batch[] = [];
  processedBatches.push(currentBatch);

  for (let index = 1; index < originalBatch.operations.length; index++) {
    const operation = originalBatch.operations[index];
    const currentOpSize = calculateObjectSizeInBytes(operation);
    if (currentBatchSize + currentOpSize > Constants.DefaultMaxBulkRequestBodySizeInBytes) {
      currentBatch = {
        ...originalBatch,
        operations: [],
        indexes: [],
      };
      processedBatches.push(currentBatch);
      currentBatchSize = 0;
    }
    currentBatch.operations.push(operation);
    currentBatch.indexes.push(originalBatch.indexes[index]);
    currentBatchSize += currentOpSize;
  }
  return processedBatches;
}

/**
 * Calculates size of an JSON object in bytes with utf-8 encoding.
 * @hidden
 */
export function calculateObjectSizeInBytes(obj: unknown): number {
  return new TextEncoder().encode(bodyFromData(obj as any)).length;
}

export function decorateBatchOperation(
  operation: OperationInput,
  options: RequestOptions = {}
): Operation {
  if (
    operation.operationType === BulkOperationType.Create ||
    operation.operationType === BulkOperationType.Upsert
  ) {
    if (
      (operation.resourceBody.id === undefined || operation.resourceBody.id === "") &&
      !options.disableAutomaticIdGeneration
    ) {
      operation.resourceBody.id = uuid();
    }
  }
  return operation as Operation;
}
/**
 * Util function for finding partition key values nested in objects at slash (/) separated paths
 * @hidden
 */
export function deepFind<T, P extends string>(document: T, path: P): string | JSONObject {
  const apath = path.split("/");
  let h: any = document;
  for (const p of apath) {
    if (p in h) h = h[p];
    else {
      console.warn(`Partition key not found, using undefined: ${path} at ${p}`);
      return "{}";
    }
  }
  return h;
}
