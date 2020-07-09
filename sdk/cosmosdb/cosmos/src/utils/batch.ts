import JSBI from "jsbi";

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

export const MAX_128_BIT_INTEGER = JSBI.BigInt(
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
);

export function isKeyInRange(min: JSBI, max: JSBI, key: JSBI) {
  const isAfterMinInclusive = JSBI.lessThanOrEqual(min, key);
  const isBeforeMax = JSBI.greaterThan(max, key);
  return isAfterMinInclusive && isBeforeMax;
}

interface OperationBase {
  partitionKey: string;
  ifMatch?: string;
  ifNoneMatch?: string;
}

type OperationWithItem = OperationBase & {
  resourceBody: { [key: string]: string };
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
