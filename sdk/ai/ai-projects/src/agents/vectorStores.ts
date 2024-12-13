// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ListVectorStoresParameters, CreateVectorStoreParameters, ModifyVectorStoreParameters, GetVectorStoreParameters, DeleteVectorStoreParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreOutput, VectorStoreDeletionStatusOutput, VectorStoreOutput } from "../generated/src/outputModels.js";
import { AgentsPoller } from "./poller.js";
import { OptionalRequestParameters, PollingOptions } from "./customModels.js";
import { VectorStoreOptions } from "../generated/src/models.js";
import { validateLimit, validateMetadata, validateOrder, validateVectorStoreId } from "./inputValidations.js";

const expectedStatuses = ["200"];

/** Returns a list of vector stores. */
export async function listVectorStores(
  context: Client,
  options?: ListVectorStoresParameters,
): Promise<OpenAIPageableListOfVectorStoreOutput> {
  validateListVectorStoresParameters(options);
  const result = await context.path("/vector_stores").get(options);
  
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Creates a vector store. */
export async function createVectorStore(
  context: Client,
  options?: CreateVectorStoreParameters,
): Promise<VectorStoreOutput> {
  validateCreateVectorStoreParameters(options);
  const result = await context.path("/vector_stores").post(options);
  
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Returns the vector store object matching the specified ID. */
export async function getVectorStore(
  context: Client,
  vectorStoreId: string,
  options?: GetVectorStoreParameters,
): Promise<VectorStoreOutput> {
  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .get(options);

  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** The ID of the vector store to modify. */
export async function modifyVectorStore(
  context: Client,
  vectorStoreId: string,
  options?: ModifyVectorStoreParameters,
): Promise<VectorStoreOutput> {
  validateVectorStoreId(vectorStoreId);
  validateModifyVectorStoreParameters(options);
  const result = await context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .post(options);

  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Deletes the vector store object matching the specified ID. */
export async function deleteVectorStore(
  context: Client,
  vectorStoreId: string,
  options?: DeleteVectorStoreParameters,
): Promise<VectorStoreDeletionStatusOutput> {
  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .delete(options);

  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/**
 * Creates a vector store and poll.
 */
export function createVectorStoreAndPoll(
  context: Client,
  createVectorStoreOptions?: VectorStoreOptions,
  pollingOptions?: PollingOptions,
  requestParams?: OptionalRequestParameters,
): Promise<VectorStoreOutput> {
  async function updateCreateVectorStorePoll(
    currentResult?: VectorStoreOutput
  ): Promise<{ result: VectorStoreOutput; completed: boolean }> {
    let vectorStore: VectorStoreOutput;
    if (!currentResult) {
      vectorStore = await createVectorStore(context, { body: createVectorStoreOptions as Record<string, any>, ...requestParams });
    } else {
      vectorStore = await getVectorStore(context, currentResult.id, requestParams);
    }
    return {
      result: vectorStore,
      completed: vectorStore.status !== "in_progress",
    };
  }

  const poller = new AgentsPoller<VectorStoreOutput>({
    update: updateCreateVectorStorePoll,
    pollingOptions: pollingOptions
  });
  return poller.pollUntilDone();
}

function validateListVectorStoresParameters(options?: ListVectorStoresParameters): void {
  if (options?.queryParameters?.limit) {
    validateLimit(options.queryParameters.limit);
  }
  if (options?.queryParameters?.order) {
    validateOrder(options.queryParameters.order);
  }
}

function validateCreateVectorStoreParameters(options?: CreateVectorStoreParameters): void {
  if (options?.body?.chunking_strategy && (!options.body.file_ids || options.body.file_ids.length === 0)) {
    throw new Error("Chunking strategy is only applicable if fileIds is non-empty");
  }
  if (options?.body?.metadata) {
    validateMetadata(options.body.metadata);
  }
}

function validateModifyVectorStoreParameters(options?: ModifyVectorStoreParameters): void {
  if (options?.body?.metadata) {
    validateMetadata(options.body.metadata);
  }
}
