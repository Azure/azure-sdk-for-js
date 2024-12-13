// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { ListVectorStoresParameters, ModifyVectorStoreParameters, GetVectorStoreParameters, DeleteVectorStoreParameters } from "../generated/src/parameters.js";
import { OpenAIPageableListOfVectorStoreOutput, VectorStoreDeletionStatusOutput } from "../generated/src/outputModels.js";
import { AgentsPoller } from "./poller.js";
import { OptionalRequestParameters, PollingOptions } from "./customModels.js";
import { VectorStoreOptions } from "../generated/src/models.js";
import { validateLimit, validateMetadata, validateOrder, validateVectorStoreId } from "./inputValidations.js";

import { CreateVectorStoreParameters } from "../customization/parameters.js";
import { VectorStoreOutput } from "../customization/outputModels.js";

import {
  CreateVectorStoreParameters as _CreateVectorStoreParameters,
} from "../generated/src/parameters.js";
import {
  VectorStoreOutput as _VectorStoreOutput,
} from "../generated/src/outputModels.js";
import { VectorStoreStaticChunkingStrategyRequest } from "../customization/models.js";

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
  const result = await context.path("/vector_stores").post(convertCreateVectorStoreParameters(options));
  
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return convertVectorStoreOutput(result.body); 
}

function convertCreateVectorStoreParameters(options?: CreateVectorStoreParameters): _CreateVectorStoreParameters { 
  const { body, ...requestParams } = options || {};
  const { fileIds, configuration, expiresAfter, chunkingStrategy, ...noCaseChange } = body || {};

  return {
    ...requestParams,
    body: {
      ...noCaseChange,
      file_ids: fileIds,
      configuration: configuration?.dataSources ? {
        data_sources: configuration.dataSources,
      } : undefined,
      expires_after: expiresAfter,
      chunking_strategy: chunkingStrategy && chunkingStrategy.type === "static" && (chunkingStrategy as VectorStoreStaticChunkingStrategyRequest).static ? {
        type: chunkingStrategy.type,
        static: {
          max_chunk_size_tokens: (chunkingStrategy as VectorStoreStaticChunkingStrategyRequest).static.maxChunkSizeTokens,
          chunk_overlap_tokens: (chunkingStrategy as VectorStoreStaticChunkingStrategyRequest).static.chunkOverlapTokens
      }
      } : chunkingStrategy ?? undefined,
    }
  };
}

function convertVectorStoreOutput(results: _VectorStoreOutput): VectorStoreOutput {
  const { created_at, usage_bytes, file_counts, expires_after, expires_at, last_active_at, ...no_case_change } = results;
  const { in_progress, ...file_counts_no_case_change} = file_counts;
  return {
    ...no_case_change,
    createdAt: new Date(created_at),
    usageBytes: usage_bytes,
    fileCounts: {
      ...file_counts_no_case_change,
      inProgress: in_progress,
    },
    expiresAfter: expires_after,
    expiresAt: expires_at ? new Date(expires_at) : null,
    lastActiveAt: last_active_at ? new Date(last_active_at) : null,
  };
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
  if (options?.body?.chunkingStrategy && (!options.body.fileIds || options.body.fileIds.length === 0)) {
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
