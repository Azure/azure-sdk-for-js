// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ListVectorStoresParameters, CreateVectorStoreParameters, ModifyVectorStoreParameters, GetVectorStoreParameters, DeleteVectorStoreParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreOutput, VectorStoreDeletionStatusOutput, VectorStoreOutput } from "../generated/src/outputModels.js";

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

export function validateVectorStoreId(vectorStoreId: string): void {
  if (!vectorStoreId) {
    throw new Error("Vector store ID is required");
  }
}

function validateListVectorStoresParameters(options?: ListVectorStoresParameters): void {
  if (options?.queryParameters?.limit && (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.order && !["asc", "desc"].includes(options.queryParameters.order)) {
    throw new Error("Order must be 'asc' or 'desc'");
  }
}

function validateCreateVectorStoreParameters(options?: CreateVectorStoreParameters): void {
  if (options?.body?.chunking_strategy && (!options.body.file_ids || options.body.file_ids.length === 0)) {
    throw new Error("Chunking strategy is only applicable if fileIds is non-empty");
  }
  if (options?.body?.metadata) {
    if (Object.keys(options.body.metadata).length > 16) {
      throw new Error("Only 16 key/value pairs are allowed");
    }
    if (Object.keys(options.body.metadata).some(value => value.length > 64)) {
      throw new Error("Keys must be less than 64 characters");
    }
    if (Object.values(options.body.metadata).some(value => value.length > 512)) {
      throw new Error("Values must be less than 512 characters");
    }
  }
}

function validateModifyVectorStoreParameters(options?: ModifyVectorStoreParameters): void {
  if (options?.body?.metadata) {
    if (Object.keys(options.body.metadata).length > 16) {
      throw new Error("Only 16 key/value pairs are allowed");
    }
    if (Object.keys(options.body.metadata).some(value => value.length > 64)) {
      throw new Error("Keys must be less than 64 characters");
    }
    if (Object.values(options.body.metadata).some(value => value.length > 512)) {
      throw new Error("Values must be less than 512 characters");
    }
  }
}
