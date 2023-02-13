// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JSONObject } from "../queryExecutionContext";
import { extractPartitionKey } from "../extractPartitionKey";
import {
  NonePartitionKeyLiteral,
  PartitionKey,
  PartitionKeyDefinition,
  PrimitivePartitionKeyValue,
  convertToInternalPartitionKey,
} from "../documents";
import { RequestOptions } from "..";
import { PatchRequestBody } from "./patch";
import { v4 } from "uuid";
import { assertNotUndefined } from "./typeChecks";
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
  operation: Operation
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
  options: RequestOptions = {}
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
          extractPartitionKey(operationInput.resourceBody, definition),
          ""
        );
        break;
      case BulkOperationType.Read:
      case BulkOperationType.Delete:
      case BulkOperationType.Patch:
        partitionKey = definition.paths.map(() => NonePartitionKeyLiteral);
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
      operationInput.resourceBody.id = uuid();
    }
  }
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
