// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CreateVectorStoreFileBatchParameters, CancelVectorStoreFileBatchParameters, GetVectorStoreFileBatchParameters, ListVectorStoreFileBatchFilesParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreFileOutput, VectorStoreFileBatchOutput } from "../generated/src/outputModels.js";
import { validateVectorStoreId } from "./vectorStores.js";

const expectedStatuses = ["200"];

/** Create a vector store file batch. */
export async function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options?: CreateVectorStoreFileBatchParameters,
): Promise<VectorStoreFileBatchOutput> {
  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileBatchParameters(options);
  const result = await context.path("/vector_stores/{vectorStoreId}/file_batches", vectorStoreId).post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Retrieve a vector store file batch. */
export async function getVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options?: GetVectorStoreFileBatchParameters,
): Promise<VectorStoreFileBatchOutput> {
  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/file_batches/{batchId}", vectorStoreId, batchId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
export async function cancelVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options?: CancelVectorStoreFileBatchParameters,
): Promise<VectorStoreFileBatchOutput> {
  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel", vectorStoreId, batchId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Returns a list of vector store files in a batch. */
export async function listVectorStoreFileBatchFiles(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options?: ListVectorStoreFileBatchFilesParameters,
): Promise<OpenAIPageableListOfVectorStoreFileOutput> {
  validateVectorStoreId(vectorStoreId);
  validateBatchId(batchId);
  validateListVectorStoreFileBatchFilesParameters(options);
  const result = await context.path("/vector_stores/{vectorStoreId}/file_batches/{batchId}/files", vectorStoreId, batchId).get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

enum FileBatchStatus {
  InProgress = "in_progress",
  Completed = "completed",
  Failed = "failed",
  Cancelled = "cancelled",
}

function validateBatchId(batchId: string): void {
  if (!batchId) {
    throw new Error("Batch ID is required");
  }
}

function validateCreateVectorStoreFileBatchParameters(options?: CreateVectorStoreFileBatchParameters): void {
  if (options?.body?.chunking_strategy && (!options.body.file_ids || options.body.file_ids.length === 0)) {
    throw new Error("Chunking strategy is only applicable if fileId is non-empty");
  }
}

function validateListVectorStoreFileBatchFilesParameters(options?: ListVectorStoreFileBatchFilesParameters): void {
  if (options?.queryParameters?.filter) {
    if (!Object.values(FileBatchStatus).includes(options.queryParameters.filter as FileBatchStatus)) {
      throw new Error("Filter must be one of 'in_progress', 'completed', 'failed', 'cancelled'");
    }
  }
  if (options?.queryParameters?.limit && (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.order && !["asc", "desc"].includes(options.queryParameters.order)) {
    throw new Error("Order must be 'asc' or 'desc'");
  }
}
