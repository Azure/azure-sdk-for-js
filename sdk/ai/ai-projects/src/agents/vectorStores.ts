// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ListVectorStoresParameters, CreateVectorStoreParameters, ModifyVectorStoreParameters, GetVectorStoreParameters, DeleteVectorStoreParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreOutput, VectorStoreDeletionStatusOutput, VectorStoreOutput } from "../generated/src/outputModels.js";
import { delay } from "@azure/core-util";

const expectedStatuses = ["200"];

/** Returns a list of vector stores. */
export async function listVectorStores(
  context: Client,
  options?: ListVectorStoresParameters,
): Promise<OpenAIPageableListOfVectorStoreOutput> {
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
export async function createVectorStoreAndPoll(
  context: Client,
  options?: CreateVectorStoreParameters,
  sleepInterval: number = 1
): Promise<VectorStoreOutput> {
  let vectorStore = await createVectorStore(context, options);
  while (vectorStore.status === "in_progress") {
    await delay(sleepInterval * 1000);
    vectorStore = await getVectorStore(context, vectorStore.id);
  }
  return vectorStore;
}
