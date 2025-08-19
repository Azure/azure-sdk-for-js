// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JSONObject } from "../queryExecutionContext/index.js";
import { extractPartitionKeys, undefinedPartitionKey } from "../extractPartitionKey.js";
import type {
  CosmosDiagnostics,
  CosmosHeaders,
  DiagnosticNodeInternal,
  ErrorResponse,
  RequestOptions,
  StatusCode,
} from "../index.js";
import type {
  PartitionKey,
  PartitionKeyDefinition,
  PrimitivePartitionKeyValue,
} from "../documents/index.js";
import { NonePartitionKeyLiteral, convertToInternalPartitionKey } from "../documents/index.js";
import type { PatchRequestBody } from "./patch.js";
import { assertNotUndefined } from "./typeChecks.js";
import { bodyFromData } from "../request/request.js";
import { Constants } from "../common/constants.js";
import { randomUUID } from "@azure/core-util";
import type { ItemOperation } from "../bulk/ItemOperation.js";
import type { BulkResponse } from "../bulk/index.js";
import type { EncryptionProcessor } from "../encryption/EncryptionProcessor.js";

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

export type BulkOperationResponse = OperationResponse[] & { diagnostics: CosmosDiagnostics };

/**
 * represents response for an operation in bulk with executeBulkOperations API
 */
export interface BulkOperationResult {
  /** the original operation input passed */
  operationInput: OperationInput;
  /** response from the backend for the item operation  */
  response?: ExtendedOperationResponse;
  /** any exceptions are captured here */
  error?: ErrorResponse;
}

/**
 * response for a successful operation in bulk with executeBulkOperations API
 */
export interface ExtendedOperationResponse extends OperationResponse {
  /** activity id related to the operation */
  activityId?: string;
  /** session Token assigned to the result */
  sessionToken?: string;
  /** headers associated with the operation */
  headers?: CosmosHeaders;
  /** diagnostic details associated with operation */
  diagnostics: CosmosDiagnostics;
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
  partitionKey?: PartitionKey;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Create;
  resourceBody: JSONObject;
}

export interface UpsertOperationInput {
  partitionKey?: PartitionKey;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Upsert;
  resourceBody: JSONObject;
}

export interface ReadOperationInput {
  partitionKey?: PartitionKey;
  operationType: typeof BulkOperationType.Read;
  id: string;
}

export interface DeleteOperationInput {
  partitionKey?: PartitionKey;
  operationType: typeof BulkOperationType.Delete;
  id: string;
}

export interface ReplaceOperationInput {
  partitionKey?: PartitionKey;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: typeof BulkOperationType.Replace;
  resourceBody: JSONObject;
  id: string;
}

export interface PatchOperationInput {
  partitionKey?: PartitionKey;
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
  operation: Operation,
): operation is CreateOperation | UpsertOperation | ReplaceOperation {
  return (
    operation.operationType !== "Patch" &&
    (operation as OperationWithItem).resourceBody !== undefined
  );
}
/**
 * Maps OperationInput to Operation by
 * - generating Ids if needed.
 * - choosing partitionKey which can be used to choose which batch this
 * operation should be part of. The order is -
 *   1. If the operationInput itself has partitionKey field set it is used.
 *   2. Other wise for create/replace/upsert it is extracted from resource body.
 *   3. For read/delete/patch type operations undefined partitionKey is used.
 * - Here one nuance is that, the partitionKey field inside Operation needs to
 *  be serialized as a JSON string.
 * @param operationInput - OperationInput
 * @param definition - PartitionKeyDefinition
 * @param options - RequestOptions
 * @returns
 */
export function prepareOperations(
  operationInput: OperationInput,
  definition: PartitionKeyDefinition,
  options: RequestOptions = {},
): {
  operation: Operation;
  partitionKey: PrimitivePartitionKeyValue[];
} {
  populateIdsIfNeeded(operationInput, options);

  let partitionKey: PrimitivePartitionKeyValue[];
  if (Object.prototype.hasOwnProperty.call(operationInput, "partitionKey")) {
    if (operationInput.partitionKey === undefined) {
      partitionKey = definition.paths.map(() => NonePartitionKeyLiteral);
    } else {
      partitionKey = convertToInternalPartitionKey(operationInput.partitionKey);
    }
  } else {
    switch (operationInput.operationType) {
      case BulkOperationType.Create:
      case BulkOperationType.Replace:
      case BulkOperationType.Upsert:
        partitionKey = assertNotUndefined(
          extractPartitionKeys(operationInput.resourceBody, definition),
          "Unexpected undefined Partition Key Found.",
        );
        break;
      case BulkOperationType.Read:
      case BulkOperationType.Delete:
      case BulkOperationType.Patch:
        partitionKey = undefinedPartitionKey(definition);
        break;
    }
  }
  return {
    operation: { ...operationInput, partitionKey: JSON.stringify(partitionKey) } as Operation,
    partitionKey,
  };
}

/**
 * For operations requiring Id genrate random uuids.
 * @param operationInput - OperationInput to be checked.
 * @param options - RequestOptions
 */
function populateIdsIfNeeded(operationInput: OperationInput, options: RequestOptions) {
  if (
    operationInput.operationType === BulkOperationType.Create ||
    operationInput.operationType === BulkOperationType.Upsert
  ) {
    if (
      (operationInput.resourceBody.id === undefined || operationInput.resourceBody.id === "") &&
      !options.disableAutomaticIdGeneration
    ) {
      operationInput.resourceBody.id = randomUUID();
    }
  }
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
  options: RequestOptions = {},
): Operation {
  if (
    operation.operationType === BulkOperationType.Create ||
    operation.operationType === BulkOperationType.Upsert
  ) {
    if (
      (operation.resourceBody.id === undefined || operation.resourceBody.id === "") &&
      !options.disableAutomaticIdGeneration
    ) {
      operation.resourceBody.id = randomUUID();
    }
  }
  return operation as Operation;
}

export function isSuccessStatusCode(statusCode: StatusCode): boolean {
  return statusCode >= 200 && statusCode <= 299;
}

export type ExecuteCallback = (
  operations: ItemOperation[],
  diagnosticNode: DiagnosticNodeInternal,
) => Promise<BulkResponse>;
export type RetryCallback = (
  operation: ItemOperation,
  diagnosticNode: DiagnosticNodeInternal,
) => Promise<void>;

export class TaskCompletionSource<T> {
  private readonly promise: Promise<T>;
  private resolveFn!: (value: T) => void;
  private rejectFn!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolveFn = resolve;
      this.rejectFn = reject;
    });
  }

  public get task(): Promise<T> {
    return this.promise;
  }

  public setResult(value: T): void {
    this.resolveFn(value);
  }

  public setException(error: Error): void {
    this.rejectFn(error);
  }
}

export async function encryptOperationInput(
  encryptionProcessor: EncryptionProcessor,
  operation: OperationInput,
  totalPropertiesEncryptedCount: number,
): Promise<{ operation: OperationInput; totalPropertiesEncryptedCount: number }> {
  if (Object.prototype.hasOwnProperty.call(operation, "partitionKey")) {
    const partitionKeyInternal = convertToInternalPartitionKey(operation.partitionKey);
    const { partitionKeyList, encryptedCount } =
      await encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
    operation.partitionKey = partitionKeyList;
    totalPropertiesEncryptedCount += encryptedCount;
  }
  switch (operation.operationType) {
    case BulkOperationType.Create:
    case BulkOperationType.Upsert: {
      const { body, propertiesEncryptedCount } = await encryptionProcessor.encrypt(
        operation.resourceBody,
      );
      operation.resourceBody = body;
      totalPropertiesEncryptedCount += propertiesEncryptedCount;
      break;
    }
    case BulkOperationType.Read:
    case BulkOperationType.Delete:
      if (await encryptionProcessor.isPathEncrypted("/id")) {
        operation.id = await encryptionProcessor.getEncryptedId(operation.id);
        totalPropertiesEncryptedCount++;
      }
      break;
    case BulkOperationType.Replace: {
      if (await encryptionProcessor.isPathEncrypted("/id")) {
        operation.id = await encryptionProcessor.getEncryptedId(operation.id);
        totalPropertiesEncryptedCount++;
      }
      const { body, propertiesEncryptedCount } = await encryptionProcessor.encrypt(
        operation.resourceBody,
      );
      operation.resourceBody = body;
      totalPropertiesEncryptedCount += propertiesEncryptedCount;
      break;
    }
    case BulkOperationType.Patch: {
      if (await encryptionProcessor.isPathEncrypted("/id")) {
        operation.id = await encryptionProcessor.getEncryptedId(operation.id);
        totalPropertiesEncryptedCount++;
      }
      const body = operation.resourceBody;
      const patchRequestBody = Array.isArray(body) ? body : body.operations;
      for (const patchOperation of patchRequestBody) {
        if ("value" in patchOperation) {
          if (await encryptionProcessor.isPathEncrypted(patchOperation.path)) {
            patchOperation.value = await encryptionProcessor.encryptProperty(
              patchOperation.path,
              patchOperation.value,
            );
            totalPropertiesEncryptedCount++;
          }
        }
      }
      break;
    }
  }
  return { operation, totalPropertiesEncryptedCount };
}
