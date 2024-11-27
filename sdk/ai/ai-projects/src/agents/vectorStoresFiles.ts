// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ListVectorStoreFilesParameters, CreateVectorStoreFileParameters, GetVectorStoreFileParameters, DeleteVectorStoreFileParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreFileOutput, VectorStoreFileDeletionStatusOutput, VectorStoreFileOutput } from "../generated/src/outputModels.js";
import { AgentsPoller } from "./poller.js";

const expectedStatuses = ["200"];

/** Returns a list of vector store files. */
export async function listVectorStoreFiles(
  context: Client,
  vectorStoreId: string,
  options?: ListVectorStoreFilesParameters,
): Promise<OpenAIPageableListOfVectorStoreFileOutput> {
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
  options?: CreateVectorStoreFileParameters,
  sleepIntervalInMs?: number,
): { result: Promise<VectorStoreFileOutput>, cancel: () => void; } {
  async function updateCreateVectorStoreFilePoll(
    currentResult?: VectorStoreFileOutput
  ): Promise<{ result: VectorStoreFileOutput; completed: boolean }> {
    let vectorStoreFile: VectorStoreFileOutput;
    if (!currentResult) {
      vectorStoreFile = await createVectorStoreFile(context, vectorStoreId, options);
    } else {
      vectorStoreFile = await getVectorStoreFile(context, vectorStoreId, currentResult.id);
    }
    return {
      result: vectorStoreFile,
      completed: vectorStoreFile.status !== "in_progress",
    };
  }

  const poller = new AgentsPoller<VectorStoreFileOutput>(updateCreateVectorStoreFilePoll, sleepIntervalInMs);
  return { result: poller.pollUntilDone(), cancel: () => poller.stopPolling() };
}
