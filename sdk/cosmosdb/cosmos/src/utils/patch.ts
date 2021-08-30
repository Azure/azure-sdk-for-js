// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type PatchOperation = ExistingKeyOperation | RemoveOperation;

export const PatchOperationType = {
  add: "add",
  replace: "replace",
  remove: "remove",
  set: "set",
  incr: "incr"
} as const;

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
