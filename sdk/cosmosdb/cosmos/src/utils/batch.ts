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

export const MAX_128_BIT_INTEGER = BigInt(
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
);

export function isKeyInRange(min: bigint, max: bigint, key: bigint) {
  const isAfterMinInclusive = min <= key;
  const isBeforeMax = max > key;
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

// function reverse(buff: Buffer) {
//   const buffer = Buffer.allocUnsafe(buff.length);

//   for (let i = 0, j = buff.length - 1; i <= j; ++i, --j) {
//     buffer[i] = buff[j];
//     buffer[j] = buff[i];
//   }

//   return buffer;
// }
