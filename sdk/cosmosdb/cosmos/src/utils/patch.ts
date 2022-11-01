// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type PatchOperation = ExistingKeyOperation | RemoveOperation | MoveOperation;

export const PatchOperationType = {
  add: "add",
  replace: "replace",
  remove: "remove",
  set: "set",
  incr: "incr",
  move: "move",
} as const;

export type MoveOperation = {
  op: keyof typeof PatchOperationType;
  from: string;
  path: string;
};

export type ExistingKeyOperation = {
  op: keyof typeof PatchOperationType;
  value: any;
  path: string;
};

export type RemoveOperation = {
  op: "remove";
  path: string;
};

export type PatchRequestBody =
  | {
      operations: PatchOperation[];
      condition?: string;
    }
  | PatchOperation[];
