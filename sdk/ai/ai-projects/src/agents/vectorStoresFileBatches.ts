// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CreateVectorStoreFileBatchParameters, CancelVectorStoreFileBatchParameters, GetVectorStoreFileBatchParameters, ListVectorStoreFileBatchFilesParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreFileOutput, VectorStoreFileBatchOutput } from "../generated/src/outputModels.js";
import { delay } from "@azure/core-util";

const expectedStatuses = ["200"];

/** Create a vector store file batch. */
export async function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options?: CreateVectorStoreFileBatchParameters,
): Promise<VectorStoreFileBatchOutput> {
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
  const result = await context.path("/vector_stores/{vectorStoreId}/file_batches/{batchId}/files", vectorStoreId, batchId).get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Create a vector store file batch and poll. */
export async function createVectorStoreFileBatchAndPoll(
  context: Client,
  vectorStoreId: string,
  options?: CreateVectorStoreFileBatchParameters,
  sleepInterval: number = 1,
): Promise<VectorStoreFileBatchOutput> {
  let vectorStoreFileBatch = await createVectorStoreFileBatch(context, vectorStoreId, options);
  while (vectorStoreFileBatch.status === "in_progress") {
    await delay(sleepInterval * 1000);
    vectorStoreFileBatch = await getVectorStoreFileBatch(context, vectorStoreId, vectorStoreFileBatch.id);
  }
  return vectorStoreFileBatch;
}
