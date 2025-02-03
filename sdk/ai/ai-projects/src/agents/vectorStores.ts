// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  ListVectorStoresParameters,
  CreateVectorStoreParameters,
  ModifyVectorStoreParameters,
} from "../generated/src/parameters.js";
import type {
  OpenAIPageableListOfVectorStoreOutput,
  VectorStoreDeletionStatusOutput,
  VectorStoreOutput,
} from "../customization/outputModels.js";
import { createPoller } from "./poller.js";
import {
  type CreateVectorStoreOptionalParams,
  type DeleteVectorStoreOptionalParams,
  type GetVectorStoreOptionalParams,
  type ListVectorStoresOptionalParams,
  type UpdateVectorStoreOptionalParams,
} from "./customModels.js";
import {
  validateLimit,
  validateMetadata,
  validateOrder,
  validateVectorStoreId,
} from "./inputValidations.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertToWire from "../customization/convertModelsToWrite.js";
import { convertToListQueryParameters } from "../customization/convertParametersToWire.js";
import { createOpenAIError } from "./openAIError.js";
import type { OperationState, OperationStatus, PollerLike } from "@azure/core-lro";

const expectedStatuses = ["200"];

/** Returns a list of vector stores. */
export async function listVectorStores(
  context: Client,
  options: ListVectorStoresOptionalParams = {},
): Promise<OpenAIPageableListOfVectorStoreOutput> {
  const listOptions: GeneratedParameters.ListVectorStoresParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: convertToListQueryParameters(options),
  };

  validateListVectorStoresParameters(listOptions);
  const result = await context.path("/vector_stores").get(listOptions);

  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertOpenAIPageableListOfVectorStoreOutput(result.body);
}

/** Creates a vector store. */
export function createVectorStore(
  context: Client,
  options: CreateVectorStoreOptionalParams = {},
): PollerLike<OperationState<VectorStoreOutput>, VectorStoreOutput> {
  return createPoller<VectorStoreOutput>({
    initOperation: async () => {
      return createVectorStoreInternal(context, options);
    },
    pollOperation: async (currentResult: VectorStoreOutput) => {
      return getVectorStore(context, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.sleepIntervalInMs,
  });
}

/** Returns the vector store object matching the specified ID. */
export async function getVectorStore(
  context: Client,
  vectorStoreId: string,
  options: GetVectorStoreOptionalParams = {},
): Promise<VectorStoreOutput> {
  const getOptions: GeneratedParameters.GetVectorStoreParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .get(getOptions);

  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreOutput(result.body);
}

/** The ID of the vector store to modify. */
export async function modifyVectorStore(
  context: Client,
  vectorStoreId: string,
  options: UpdateVectorStoreOptionalParams = {},
): Promise<VectorStoreOutput> {
  const modifyOptions: GeneratedParameters.ModifyVectorStoreParameters = {
    ...operationOptionsToRequestParameters(options),
    body: ConvertToWire.convertVectorStoreUpdateOptions(options),
  };

  validateVectorStoreId(vectorStoreId);
  validateModifyVectorStoreParameters(modifyOptions);
  const result = await context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .post(modifyOptions);

  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreOutput(result.body);
}

/** Deletes the vector store object matching the specified ID. */
export async function deleteVectorStore(
  context: Client,
  vectorStoreId: string,
  options: DeleteVectorStoreOptionalParams = {},
): Promise<VectorStoreDeletionStatusOutput> {
  const deleteOptions: GeneratedParameters.DeleteVectorStoreParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .delete(deleteOptions);

  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreDeletionStatusOutput(result.body);
}

/**
 * Creates a vector store and poll.
 */
export function createVectorStoreAndPoll(
  context: Client,
  options: CreateVectorStoreOptionalParams = {},
): PollerLike<OperationState<VectorStoreOutput>, VectorStoreOutput> {
  return createPoller<VectorStoreOutput>({
    initOperation: async () => {
      return createVectorStoreInternal(context, options);
    },
    pollOperation: async (currentResult: VectorStoreOutput) => {
      return getVectorStore(context, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.sleepIntervalInMs,
  });
}

async function createVectorStoreInternal(
  context: Client,
  options: CreateVectorStoreOptionalParams = {},
): Promise<VectorStoreOutput> {
  const createOptions: GeneratedParameters.CreateVectorStoreParameters = {
    ...operationOptionsToRequestParameters(options),
    body: ConvertToWire.convertVectorStoreOptions(options),
  };

  validateCreateVectorStoreParameters(createOptions);
  const result = await context.path("/vector_stores").post(createOptions);

  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreOutput(result.body);
}

function getLroOperationStatus(result: VectorStoreOutput): OperationStatus {
  switch (result.status) {
    case "in_progress":
      return "running";
    case "completed":
      return "succeeded";
    case "expired":
      return "failed";
    default:
      return "failed";
  }
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
  if (
    options?.body?.chunking_strategy &&
    (!options.body.file_ids || options.body.file_ids.length === 0)
  ) {
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
