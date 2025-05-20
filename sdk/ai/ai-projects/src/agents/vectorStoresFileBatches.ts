// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  OpenAIPageableListOfVectorStoreFileOutput,
  VectorStoreFileBatchOutput,
} from "../customization/outputModels.js";
import { createPoller } from "./poller.js";
import type {
  CancelVectorStoreFileBatchOptionalParams,
  CreateVectorStoreFileBatchOptionalParams,
  GetVectorStoreFileBatchOptionalParams,
  ListVectorStoreFileBatchFilesOptionalParams,
} from "./customModels.js";
import {
  validateFileStatusFilter,
  validateLimit,
  validateOrder,
  validateVectorStoreId,
} from "./inputValidations.js";
import type {
  CreateVectorStoreFileBatchParameters,
  ListVectorStoreFileBatchFilesParameters,
} from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertParamsToWire from "../customization/convertParametersToWire.js";
import { createOpenAIError } from "./openAIError.js";
import type { PollerLike, OperationState, OperationStatus } from "@azure/core-lro";

const expectedStatuses = ["200"];

/** Create a vector store file batch. */
export function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = {},
): PollerLike<OperationState<VectorStoreFileBatchOutput>, VectorStoreFileBatchOutput> {
  return createPoller<VectorStoreFileBatchOutput>({
    initOperation: async () => {
      return createVectorStoreFileBatchInternal(context, vectorStoreId, options);
    },
    pollOperation: async (currentResult: VectorStoreFileBatchOutput) => {
      return getVectorStoreFileBatch(context, vectorStoreId, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.sleepIntervalInMs,
  });
}

/** Retrieve a vector store file batch. */
export async function getVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: GetVectorStoreFileBatchOptionalParams = {},
): Promise<VectorStoreFileBatchOutput> {
  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/file_batches/{batchId}", vectorStoreId, batchId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreFileBatchOutput(result.body);
}

/** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
export async function cancelVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: CancelVectorStoreFileBatchOptionalParams = {},
): Promise<VectorStoreFileBatchOutput> {
  validateVectorStoreId(vectorStoreId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel", vectorStoreId, batchId)
    .post(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreFileBatchOutput(result.body);
}

/** Returns a list of vector store files in a batch. */
export async function listVectorStoreFileBatchFiles(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: ListVectorStoreFileBatchFilesOptionalParams = {},
): Promise<OpenAIPageableListOfVectorStoreFileOutput> {
  const listOptions: ListVectorStoreFileBatchFilesParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: ConvertParamsToWire.convertListVectorStoreFileBatchFilesQueryParamProperties(
      options,
    ) as Record<string, string>,
  };

  validateVectorStoreId(vectorStoreId);
  validateBatchId(batchId);
  validateListVectorStoreFileBatchFilesParameters(listOptions);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/file_batches/{batchId}/files", vectorStoreId, batchId)
    .get(listOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertOpenAIPageableListOfVectorStoreFileOutput(result.body);
}

/** Create a vector store file batch and poll. */
export function createVectorStoreFileBatchAndPoll(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = {},
): PollerLike<OperationState<VectorStoreFileBatchOutput>, VectorStoreFileBatchOutput> {
  return createPoller<VectorStoreFileBatchOutput>({
    initOperation: async () => {
      return createVectorStoreFileBatchInternal(context, vectorStoreId, options);
    },
    pollOperation: async (currentResult: VectorStoreFileBatchOutput) => {
      return getVectorStoreFileBatch(context, vectorStoreId, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.sleepIntervalInMs,
  });
}

export async function createVectorStoreFileBatchInternal(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = {},
): Promise<VectorStoreFileBatchOutput> {
  const createOptions: CreateVectorStoreFileBatchParameters = {
    ...operationOptionsToRequestParameters(options),
    ...ConvertParamsToWire.convertCreateVectorStoreFileBatchParam({ body: options }),
  };

  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileBatchParameters(createOptions);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/file_batches", vectorStoreId)
    .post(createOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreFileBatchOutput(result.body);
}

function getLroOperationStatus(result: VectorStoreFileBatchOutput): OperationStatus {
  switch (result.status) {
    case "in_progress":
      return "running";
    case "completed":
      return "succeeded";
    case "cancelled":
      return "canceled";
    default:
      return "failed";
  }
}

function validateBatchId(batchId: string): void {
  if (!batchId) {
    throw new Error("Batch ID is required");
  }
}

function validateCreateVectorStoreFileBatchParameters(
  options?: CreateVectorStoreFileBatchParameters,
): void {
  if (
    options?.body?.chunking_strategy &&
    (!options.body.file_ids || options.body.file_ids.length === 0)
  ) {
    throw new Error("Chunking strategy is only applicable if fileIds are included");
  }
}

function validateListVectorStoreFileBatchFilesParameters(
  options?: ListVectorStoreFileBatchFilesParameters,
): void {
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
