// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CreateVectorStoreFileBatchParameters, CancelVectorStoreFileBatchParameters, GetVectorStoreFileBatchParameters, ListVectorStoreFileBatchFilesParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreFileOutput, VectorStoreFileBatchOutput } from "../generated/src/outputModels.js";
import { AgentsPoller } from "./poller.js";
import { CreateVectorStoreFileBatchOptions } from "./vectorStoresModels.js";
import { OptionalRequestParameters, PollingOptions } from "./customModels.js";
import { validateFileStatusFilter, validateLimit, validateOrder, validateVectorStoreId } from "./inputValidations.js";

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

/** Create a vector store file batch and poll. */
export function createVectorStoreFileBatchAndPoll(
  context: Client,
  vectorStoreId: string,
  createVectorStoreFileBatchOptions?: CreateVectorStoreFileBatchOptions,
  pollingOptions?: PollingOptions,
  requestParams?: OptionalRequestParameters,
): Promise<VectorStoreFileBatchOutput> {
  async function updateCreateVectorStoreFileBatchPoll(
    currentResult?: VectorStoreFileBatchOutput
  ): Promise<{ result: VectorStoreFileBatchOutput; completed: boolean }> {
    let vectorStore: VectorStoreFileBatchOutput;
    if (!currentResult) {
      vectorStore = await createVectorStoreFileBatch(context, vectorStoreId, { body: {
        file_ids: createVectorStoreFileBatchOptions?.fileIds,
        data_sources: createVectorStoreFileBatchOptions?.dataSources,
        chunking_strategy: createVectorStoreFileBatchOptions?.chunkingStrategy,
      }, ...requestParams });
    } else {
      vectorStore = await getVectorStoreFileBatch(context, vectorStoreId, currentResult.id, requestParams);
    }
    return {
      result: vectorStore,
      completed: vectorStore.status !== "in_progress",
    };
  }

  async function cancelCreateVectorStoreFileBatchPoll(
    currentResult: VectorStoreFileBatchOutput
  ): Promise<boolean> {
    const result = await cancelVectorStoreFileBatch(context, vectorStoreId, currentResult.id);
    return result.status === "cancelled";
  }

  const poller = new AgentsPoller<VectorStoreFileBatchOutput>({
    update: updateCreateVectorStoreFileBatchPoll, 
    cancel: cancelCreateVectorStoreFileBatchPoll,
    pollingOptions: pollingOptions
  });
  return poller.pollUntilDone();
}

function validateBatchId(batchId: string): void {
  if (!batchId) {
    throw new Error("Batch ID is required");
  }
}

function validateCreateVectorStoreFileBatchParameters(options?: CreateVectorStoreFileBatchParameters): void {
  if (options?.body?.chunking_strategy && (!options.body.file_ids || options.body.file_ids.length === 0)) {
    throw new Error("Chunking strategy is only applicable if fileIds are included");
  }
}

function validateListVectorStoreFileBatchFilesParameters(options?: ListVectorStoreFileBatchFilesParameters): void {
  if (options?.queryParameters?.filter) {
    validateFileStatusFilter(options.queryParameters.filter);
  }
  if (options?.queryParameters?.limit) {
    validateLimit(options.queryParameters.limit);
  }
  if (options?.queryParameters?.order) {
    validateOrder(options.queryParameters.order);
  }
}
