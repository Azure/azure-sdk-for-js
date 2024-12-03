// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ListVectorStoreFilesParameters, CreateVectorStoreFileParameters, GetVectorStoreFileParameters, DeleteVectorStoreFileParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreFileOutput, VectorStoreFileDeletionStatusOutput, VectorStoreFileOutput } from "../generated/src/outputModels.js";
import { AgentsPoller } from "./poller.js";
import { OptionalRequestParameters, PollingOptions } from "./customModels.js";
import { CreateVectorStoreFileOptions } from "./vectorStoresModels.js";
import { validateFileId, validateFileStatusFilter, validateLimit, validateOrder, validateVectorStoreId } from "./inputValidations.js";

const expectedStatuses = ["200"];

/** Returns a list of vector store files. */
export async function listVectorStoreFiles(
  context: Client,
  vectorStoreId: string,
  options?: ListVectorStoreFilesParameters,
): Promise<OpenAIPageableListOfVectorStoreFileOutput> {
  validateVectorStoreId(vectorStoreId);
  validateListVectorStoreFilesParameters(options);
  const result = await context.path("/vector_stores/{vectorStoreId}/files", vectorStoreId).get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Create a vector store file by attaching a file to a vector store. */
export async function createVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  options?: CreateVectorStoreFileParameters,
): Promise<VectorStoreFileOutput> {
  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileParameters(options);
  const result = await context.path("/vector_stores/{vectorStoreId}/files", vectorStoreId).post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Retrieves a vector store file. */
export async function getVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options?: GetVectorStoreFileParameters,
): Promise<VectorStoreFileOutput> {
  validateVectorStoreId(vectorStoreId);
  validateFileId(fileId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/files/{fileId}", vectorStoreId, fileId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/**
 * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
 * To delete the file, use the delete file endpoint.
 */
export async function deleteVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options?: DeleteVectorStoreFileParameters,
): Promise<VectorStoreFileDeletionStatusOutput> {
  validateVectorStoreId(vectorStoreId);
  validateFileId(fileId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/files/{fileId}", vectorStoreId, fileId)
    .delete(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Create a vector store file by attaching a file to a vector store and poll. */
export function createVectorStoreFileAndPoll(
  context: Client,
  vectorStoreId: string,
  createVectorStoreFileOptions?: CreateVectorStoreFileOptions,
  pollingOptions?: PollingOptions,
  requestParams?: OptionalRequestParameters
): Promise<VectorStoreFileOutput> {
  async function updateCreateVectorStoreFilePoll(
    currentResult?: VectorStoreFileOutput
  ): Promise<{ result: VectorStoreFileOutput; completed: boolean }> {
    let vectorStoreFile: VectorStoreFileOutput;
    if (!currentResult) {
      vectorStoreFile = await createVectorStoreFile(context, vectorStoreId, { body: {
        file_id: createVectorStoreFileOptions?.fileId,
        data_sources: createVectorStoreFileOptions?.dataSources,
        chunking_strategy: createVectorStoreFileOptions?.chunkingStrategy,
       }, ...requestParams });
    } else {
      vectorStoreFile = await getVectorStoreFile(context, vectorStoreId, currentResult.id, requestParams);
    }
    return {
      result: vectorStoreFile,
      completed: vectorStoreFile.status !== "in_progress",
    };
  }

  const poller = new AgentsPoller<VectorStoreFileOutput>({
    update: updateCreateVectorStoreFilePoll,
    pollingOptions: pollingOptions
  });
  return poller.pollUntilDone();
}

function validateListVectorStoreFilesParameters(options?: ListVectorStoreFilesParameters): void {
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

function validateCreateVectorStoreFileParameters(options?: CreateVectorStoreFileParameters): void {
  if (options?.body?.chunking_strategy && !options.body.file_id) {
    throw new Error("Chunking strategy is only applicable if fileId is included");
  }
}
