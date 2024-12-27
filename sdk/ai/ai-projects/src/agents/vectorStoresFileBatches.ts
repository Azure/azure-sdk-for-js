// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, HttpResponse } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  OpenAIPageableListOfVectorStoreFileOutput,
  VectorStoreFileBatchOutput,
} from "../customization/outputModels.js";
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
import type {
  VectorStoreFileBatchOutput as WireVectorStoreFileBatchOutput,
} from "../generated/src/outputModels.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertParamsToWire from "../customization/convertParametersToWire.js";
import { createOpenAIError } from "./openAIError.js";
import type { OperationResponse, OperationState, RawRequest, RunningOperation } from "@azure/core-lro";
import { createHttpPoller } from "@azure/core-lro";
import type { AbortSignalLike } from "@azure/abort-controller";

const expectedStatuses = ["200"];

/** Create a vector store file batch. */
export async function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = {},
): Promise<CreateVectorStoreFileBatchResponse> {
  const createOptions: CreateVectorStoreFileBatchParameters = {
    ...operationOptionsToRequestParameters(options),
    ...ConvertParamsToWire.convertCreateVectorStoreFileBatchParam({ body: options }),
  };
  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileBatchParameters(createOptions);

  const initialResponse = await context
    .path("/vector_stores/{vectorStoreId}/file_batches", vectorStoreId)
    .post(createOptions);
  if (!expectedStatuses.includes(initialResponse.status)) {
    throw createOpenAIError(initialResponse);
  }

  const abortController = new AbortController();
  const poller: RunningOperation<VectorStoreFileBatchOutput> = {
    sendInitialRequest: async () => generateLroResponse(initialResponse),
    sendPollRequest: async (_path: string, pollOptions?: { abortSignal?: AbortSignalLike }) => {
      function abortListener(): void {
        abortController.abort();
      }
      const inputAbortSignal = pollOptions?.abortSignal;
      const abortSignal = abortController.signal;
      if (inputAbortSignal?.aborted) {
        abortController.abort();
      } else if (!abortSignal.aborted) {
        inputAbortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      let response;
      try {
        const getOptions: GetVectorStoreFileBatchOptionalParams = {
          ...operationOptionsToRequestParameters(options),
        };
        response = await context
          .path("/vector_stores/{vectorStoreId}/file_batches/{batchId}", vectorStoreId, initialResponse.body.id)
          .get({ ...getOptions, abortSignal });
          if (!expectedStatuses.includes(response.status)) {
            throw createOpenAIError(response);
          }
      } finally {
        inputAbortSignal?.removeEventListener("abort", abortListener);
      }
      return generateLroResponse(response);
    }
  }

  return {
    ...ConvertFromWire.convertVectorStoreFileBatchOutput(initialResponse.body),
    poller: createHttpPoller<VectorStoreFileBatchOutput, OperationState<VectorStoreFileBatchOutput>>(poller, {
      ...options.pollingOptions
    }),
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

function generateLroResponse(response: HttpResponse) : OperationResponse<VectorStoreFileBatchOutput, RawRequest> {
  const body = response.body as WireVectorStoreFileBatchOutput;
  let statusCode;
  // Possible values: "in_progress", "completed", "cancelled", "failed"
  switch (body.status) {
    case "completed":
      statusCode = 200;
      break;
    case "in_progress":
      statusCode = 202;
      break;
    default:
      statusCode = 500;
      break;
  }
  const convertedBody = ConvertFromWire.convertVectorStoreFileBatchOutput(body);
  return {
    flatResponse: convertedBody,
    rawResponse: {
      ...response,
      statusCode: statusCode,
      body: convertedBody,
    }
  };
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
