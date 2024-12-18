// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  OpenAIPageableListOfVectorStoreFileOutput,
  VectorStoreFileBatchOutput,
} from "../customization/outputModels.js";
import { AgentsPoller } from "./poller.js";
import type {
  CancelVectorStoreFileBatchOptionalParams,
  CreateVectorStoreFileBatchOptionalParams,
  CreateVectorStoreFileBatchResponse,
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

const expectedStatuses = ["200"];

/** Create a vector store file batch. */
export function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = {},
): CreateVectorStoreFileBatchResponse {
  const createOptions: CreateVectorStoreFileBatchParameters = {
    ...operationOptionsToRequestParameters(options),
    ...ConvertParamsToWire.convertCreateVectorStoreFileBatchParam({ body: options }),
  };
  const pollingOptions = ConvertParamsToWire.convertPollingOptions(options)
  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileBatchParameters(createOptions);

  async function executeCreateVectorStoreFileBatch(): Promise<VectorStoreFileBatchOutput> {
    const result = await context
      .path("/vector_stores/{vectorStoreId}/file_batches", vectorStoreId)
      .post(createOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return ConvertFromWire.convertVectorStoreFileBatchOutput(result.body);
  }

  async function updateCreateVectorStoreFileBatch(
    currentResult?: VectorStoreFileBatchOutput,
  ): Promise<{ result: VectorStoreFileBatchOutput; completed: boolean }> {
    let vectorStore: VectorStoreFileBatchOutput;
    if (!currentResult) {
      vectorStore = await executeCreateVectorStoreFileBatch();
    } else {
      vectorStore = await getVectorStoreFileBatch(
        context,
        vectorStoreId,
        currentResult.id,
        options,
      );
    }
    return {
      result: vectorStore,
      completed: vectorStore.status !== "in_progress",
    };
  }

  async function cancelCreateVectorStoreFileBatch(
    currentResult: VectorStoreFileBatchOutput,
  ): Promise<boolean> {
    const result = await cancelVectorStoreFileBatch(context, vectorStoreId, currentResult.id);
    return result.status === "cancelled";
  }

  const poller = new AgentsPoller<VectorStoreFileBatchOutput>({
    update: updateCreateVectorStoreFileBatch,
    cancel: cancelCreateVectorStoreFileBatch,
    pollingOptions: pollingOptions,
  });

  async function pollOnce(): Promise<VectorStoreFileBatchOutput> {
    await poller.poll();
    const initialResult = poller.getOperationState().result;
    if (!initialResult) {
      throw new Error("Error creating vector store file batch");
    }
    return initialResult;
  }

  return {
    then: function (onFulfilled, onRejected) {
      return pollOnce().then(onFulfilled, onRejected).catch(onRejected);
    },
    poller: poller,
  }
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
    throw createRestError(result);
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
    throw createRestError(result);
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
    throw createRestError(result);
  }
  return ConvertFromWire.convertOpenAIPageableListOfVectorStoreFileOutput(result.body);
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
