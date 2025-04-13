// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { JSONObject } from "../queryExecutionContext";
import type { PartitionKey } from "../documents";
import type {
  CreateOperationInput,
  DeleteOperationInput,
  PatchOperationInput,
  ReadOperationInput,
  ReplaceOperationInput,
  UpsertOperationInput,
} from "../utils/batch";
import { BulkOperationType } from "../utils/batch";
import type { PatchRequestBody } from "../utils/patch";
import { ErrorResponse } from "../request/ErrorResponse";

export interface OperationInputOptions {
  ifMatch?: string;
  ifNoneMatch?: string;
}

export const BulkOperations = {
  getCreateOperationInput(
    partitionKey: PartitionKey,
    resourceBody: JSONObject,
    options?: OperationInputOptions,
  ): CreateOperationInput {
    if (!resourceBody) {
      throw new ErrorResponse("resourceBody cannot be undefined");
    }
    if (partitionKey === undefined) {
      throw new ErrorResponse("partitionKey cannot be undefined");
    }
    if (resourceBody.id === undefined) {
      throw new ErrorResponse("resourceBody.id cannot be undefined");
    }
    return {
      operationType: BulkOperationType.Create,
      partitionKey: partitionKey,
      resourceBody: resourceBody,
      ...options,
    };
  },

  getUpsertOperationInput(
    partitionKey: PartitionKey,
    resourceBody: JSONObject,
    options?: OperationInputOptions,
  ): UpsertOperationInput {
    if (!resourceBody) {
      throw new ErrorResponse("resourceBody cannot be undefined");
    }
    if (partitionKey === undefined) {
      throw new ErrorResponse("partitionKey cannot be undefined");
    }
    if (resourceBody.id === undefined) {
      throw new ErrorResponse("resourceBody.id cannot be undefined");
    }
    return {
      operationType: BulkOperationType.Upsert,
      partitionKey: partitionKey,
      resourceBody: resourceBody,
      ...options,
    };
  },

  getReplaceOperationInput(
    id: string,
    partitionKey: PartitionKey,
    resourceBody: JSONObject,
    options?: OperationInputOptions,
  ): ReplaceOperationInput {
    if (!resourceBody) {
      throw new ErrorResponse("resourceBody cannot be undefined");
    }
    if (partitionKey === undefined) {
      throw new ErrorResponse("partitionKey cannot be undefined");
    }
    if (resourceBody.id === undefined) {
      throw new ErrorResponse("resourceBody.id cannot be undefined");
    }
    return {
      operationType: BulkOperationType.Replace,
      id: id,
      partitionKey: partitionKey,
      resourceBody: resourceBody,
      ...options,
    };
  },

  getPatchOperationInput(
    id: string,
    partitionKey: PartitionKey,
    resourceBody: PatchRequestBody,
    options?: OperationInputOptions,
  ): PatchOperationInput {
    if (id === undefined) {
      throw new ErrorResponse("id cannot be undefined");
    }
    if (!resourceBody) {
      throw new ErrorResponse("patch request body cannot be undefined");
    }
    if (partitionKey === undefined) {
      throw new ErrorResponse("partitionKey cannot be undefined");
    }
    return {
      operationType: BulkOperationType.Patch,
      id: id,
      partitionKey: partitionKey,
      resourceBody: resourceBody,
      ...options,
    };
  },

  getReadOperationInput(id: string, partitionKey: PartitionKey): ReadOperationInput {
    if (id === undefined) {
      throw new ErrorResponse("id cannot be undefined");
    }
    if (partitionKey === undefined) {
      throw new ErrorResponse("partitionKey cannot be undefined");
    }
    return {
      operationType: BulkOperationType.Read,
      id: id,
      partitionKey: partitionKey,
    };
  },

  getDeleteOperationInput(id: string, partitionKey: PartitionKey): DeleteOperationInput {
    if (partitionKey === undefined) {
      throw new ErrorResponse("partitionKey cannot be undefined");
    }
    if (id === undefined) {
      throw new ErrorResponse("id cannot be undefined");
    }
    return {
      operationType: BulkOperationType.Delete,
      id: id,
      partitionKey: partitionKey,
    };
  },
};
