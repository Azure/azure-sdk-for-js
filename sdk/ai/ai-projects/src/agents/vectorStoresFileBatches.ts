// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { CreateVectorStoreFileBatchParameters, CancelVectorStoreFileBatchParameters, GetVectorStoreFileBatchParameters, ListVectorStoreFileBatchFilesParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreFileOutput, VectorStoreFileBatchOutput } from "../generated/src/outputModels.js";
import { AgentsPoller } from "./poller.js";

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
  sleepIntervalInMs?: number,
  timeoutInMs?: number,
): Promise<VectorStoreFileBatchOutput> {
   async function updateCreateVectorStoreFileBatchPoll(
    currentResult?: VectorStoreFileBatchOutput
  ): Promise<{ result: VectorStoreFileBatchOutput; completed: boolean }> {
    let vectorStore: VectorStoreFileBatchOutput;
    if (!currentResult) {
      vectorStore = await createVectorStoreFileBatch(context, vectorStoreId, options);
    } else {
      vectorStore = await getVectorStoreFileBatch(context, vectorStoreId, currentResult.id);
    }
    return {
      result: vectorStore,
      completed: vectorStore.status !== "in_progress",
    };
  }

  const poller = new AgentsPoller<VectorStoreFileBatchOutput>(updateCreateVectorStoreFileBatchPoll, sleepIntervalInMs);

  if (timeoutInMs) {
    const timeoutPromise = new Promise<never>((_resolve, reject) => 
      setTimeout(() => {
        poller.stopPolling();
        reject(new Error("Polling operation exceeded timeout"));
      }, timeoutInMs)
    );
    return Promise.race([poller.pollUntilDone(), timeoutPromise]);
  }

  const result = poller.getOperationState().result;
  if (!result) {
    throw new Error("Polling operation exceeded timeout");
  }
  return result;
}
