import { JSONObject } from "../queryExecutionContext";

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
  operations: Operation[];
}

export function isKeyInRange(min: string, max: string, key: string) {
  const isAfterMinInclusive = key.localeCompare(min) >= 0;
  const isBeforeMax = key.localeCompare(max) < 0;
  return isAfterMinInclusive && isBeforeMax;
}

interface OperationBase {
  partitionKey: string;
  ifMatch?: string;
  ifNoneMatch?: string;
}

type OperationWithItem = OperationBase & {
  resourceBody: JSONObject;
};

type CreateOperation = OperationWithItem & {
  operationType: "Create";
};

type UpsertOperation = OperationWithItem & {
  operationType: "Upsert";
};

type ReadOperation = OperationBase & {
  operationType: "Read";
  id: string;
};

type DeleteOperation = OperationBase & {
  operationType: "Delete";
  id: string;
};

type ReplaceOperation = OperationWithItem & {
  operationType: "Replace";
  id: string;
};

export function hasResource(
  operation: Operation
): operation is CreateOperation | UpsertOperation | ReplaceOperation {
  return (operation as OperationWithItem).resourceBody !== undefined;
}
