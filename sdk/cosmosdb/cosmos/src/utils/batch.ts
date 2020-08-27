import { JSONObject } from "../queryExecutionContext";
import { extractPartitionKey } from "../extractPartitionKey";
import { PartitionKeyDefinition } from "../documents";
import { RequestOptions } from "..";
import { v4 as uuid } from "uuid";

export type Operation =
  | CreateOperation
  | UpsertOperation
  | ReadOperation
  | DeleteOperation
  | ReplaceOperation;

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

export function isKeyInRange(min: string, max: string, key: string) {
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
  Replace: "Replace"
} as const;

export interface OperationInput {
  partitionKey?: string | number | null | {} | undefined;
  ifMatch?: string;
  ifNoneMatch?: string;
  operationType: keyof typeof BulkOperationType;
  resourceBody?: JSONObject;
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

export function hasResource(
  operation: Operation
): operation is CreateOperation | UpsertOperation | ReplaceOperation {
  return (operation as OperationWithItem).resourceBody !== undefined;
}

export function getPartitionKeyToHash(operation: Operation, partitionProperty: string) {
  const toHashKey = hasResource(operation)
    ? (operation.resourceBody as any)[partitionProperty]
    : operation.partitionKey.replace(/[\[\]\"\']/g, "");
  // We check for empty object since replace will stringify the value
  // The second check avoids cases where the partitionKey value is actually the string '{}'
  if (toHashKey === "{}" && operation.partitionKey === "[{}]") {
    return {};
  }
  return toHashKey;
}

export function decorateOperation(
  operation: OperationInput,
  definition: PartitionKeyDefinition,
  options: RequestOptions = {}
) {
  if (operation.operationType === BulkOperationType.Create) {
    if (
      (operation.resourceBody.id === undefined || operation.resourceBody.id === "") &&
      !options.disableAutomaticIdGeneration
    ) {
      operation.resourceBody.id = uuid();
    }
  }
  if (operation.partitionKey) {
    const extracted = extractPartitionKey(operation, { paths: ["/partitionKey"] });
    return { ...operation, partitionKey: JSON.stringify(extracted) };
  } else if (operation.resourceBody) {
    const pk = extractPartitionKey(operation.resourceBody, definition);
    return { ...operation, partitionKey: JSON.stringify(pk) };
  }
  return operation;
}
