// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKey } from "../documents";
import type { JSONObject } from "../queryExecutionContext";
import { ErrorResponse } from "../request/ErrorResponse";
import { BulkOperationType } from "../utils/batch";
import type { PatchRequestBody } from "../utils/patch";
import type { ItemOperation } from "./ItemOperation";

/**
 * Utility class for creating bulk operations.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BulkOperations {
  /**
   * Creates an input object for create operation in bulk execution.
   *
   * @param resourceBody - The JSON object representing the resource to be created.
   * @param partitionKey - The partition key associated with the resource.
   * @returns An object representing the create operation input for bulk execution.
   */
  static getCreateItemOperation(
    partitionKey: PartitionKey,
    resourceBody: JSONObject,
  ): ItemOperation {
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
    };
  }

  /**
   * Generates an input object for upsert operation in bulk operations.
   *
   * @param partitionKey - The partition key associated with the resource.
   * @param resourceBody - The JSON object representing the resource to be upserted.
   * @returns An object representing the upsert operation input.
   */
  static getUpsertItemOperation(
    partitionKey: PartitionKey,
    resourceBody: JSONObject,
  ): ItemOperation {
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
    };
  }

  /**
   * Generates an input object for read operation in bulk operations.
   *
   * @param id - The ID of the resource to read.
   * @param partitionKey - The partition key associated with the resource.
   * @returns An object representing the read operation input.
   */
  static getReadItemOperation(id: string, partitionKey: PartitionKey): ItemOperation {
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
  }

  /**
   * Generates an input object for delete operation in bulk operations.
   *
   * @param id - The ID of the resource to delete.
   * @param partitionKey - The partition key associated with the resource.
   * @returns An object representing the delete operation input.
   */
  static getDeleteItemOperation(id: string, partitionKey: PartitionKey): ItemOperation {
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
  }

  /**
   * Generates an input object for replace operation in bulk operations.
   *
   * @param id - The ID of the resource to replace.
   * @param partitionKey - The partition key associated with the resource.
   * @param resourceBody - The JSON object representing the resource to replace.
   * @returns An object representing the replace operation input.
   */
  static getReplaceItemOperation(
    id: string,
    partitionKey: PartitionKey,
    resourceBody: JSONObject,
  ): ItemOperation {
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
    };
  }

  /**
   * Generates an input object for patch operation in bulk operations.
   *
   * @param id - The ID of the resource to patch.
   * @param partitionKey - The partition key associated with the resource.
   * @param resourceBody - Patch request body @see {@link PatchRequestBody}
   * @returns An object representing the patch operation input.**/
  static getPatchItemOperation(
    id: string,
    partitionKey: PartitionKey,
    resourceBody: PatchRequestBody,
  ): ItemOperation {
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
    };
  }
}
