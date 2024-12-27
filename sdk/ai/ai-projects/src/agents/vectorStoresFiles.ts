// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, HttpResponse } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  ListVectorStoreFilesParameters,
  CreateVectorStoreFileParameters,
} from "../generated/src/parameters.js";
import type {
  VectorStoreFileOutput as WireVectorStoreFileOutput
} from "../generated/src/outputModels.js";
import type {
  OpenAIPageableListOfVectorStoreFileOutput,
  VectorStoreFileDeletionStatusOutput,
  VectorStoreFileOutput,
} from "../customization/outputModels.js";
import type {
  CreateVectorStoreFileOptionalParams,
  CreateVectorStoreFileResponse,
  DeleteVectorStoreFileOptionalParams,
  GetVectorStoreFileOptionalParams,
  ListVectorStoreFilesOptionalParams,
} from "./customModels.js";
import {
  validateFileId,
  validateFileStatusFilter,
  validateLimit,
  validateOrder,
  validateVectorStoreId,
} from "./inputValidations.js";
import { convertToListQueryParameters } from "../customization/convertParametersToWire.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertParamsToWire from "../customization/convertParametersToWire.js";
import { createOpenAIError } from "./openAIError.js";
import type { RunningOperation} from "@azure/core-lro";
import { createHttpPoller, type OperationResponse, type OperationState, type RawRequest } from "@azure/core-lro";
import type { AbortSignalLike } from "@azure/abort-controller";

const expectedStatuses = ["200"];

/** Returns a list of vector store files. */
export async function listVectorStoreFiles(
  context: Client,
  vectorStoreId: string,
  options: ListVectorStoreFilesOptionalParams = {},
): Promise<OpenAIPageableListOfVectorStoreFileOutput> {
  validateVectorStoreId(vectorStoreId);

  const listOptions: GeneratedParameters.ListVectorStoreFilesParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: convertToListQueryParameters(options),
  };

  validateListVectorStoreFilesParameters(listOptions);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/files", vectorStoreId)
    .get(listOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertOpenAIPageableListOfVectorStoreFileOutput(result.body);
}

/** Create a vector store file by attaching a file to a vector store. */
export async function createVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileOptionalParams = {},
): Promise<CreateVectorStoreFileResponse> {
  const createOptions: CreateVectorStoreFileParameters = {
    ...operationOptionsToRequestParameters(options),
    ...ConvertParamsToWire.convertCreateVectorStoreFileParam({ body: options }),
  };
  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileParameters(createOptions);

  const initialResponse = await context
    .path("/vector_stores/{vectorStoreId}/files", vectorStoreId)
    .post(createOptions);
  if (!expectedStatuses.includes(initialResponse.status)) {
    throw createOpenAIError(initialResponse);
  }

  const abortController = new AbortController();
  const poller: RunningOperation<VectorStoreFileOutput> = {
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
        const getOptions: GetVectorStoreFileOptionalParams = {
          ...operationOptionsToRequestParameters(options),
        };
        response = await context
          .path("/vector_stores/{vectorStoreId}/files/{fileId}", vectorStoreId, initialResponse.body.id)
          .get({ ...getOptions, abortSignal });
        if (!expectedStatuses.includes(response.status)) {
          throw createOpenAIError(response);
        }
      } finally {
        inputAbortSignal?.removeEventListener("abort", abortListener);
      }
      return generateLroResponse(response);
    },
  }

  return {
    ...ConvertFromWire.convertVectorStoreFileOutput(initialResponse.body),
    poller: createHttpPoller<VectorStoreFileOutput, OperationState<VectorStoreFileOutput>>(poller, {
      ...options.pollingOptions
    })
  }
}

/** Retrieves a vector store file. */
export async function getVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: GetVectorStoreFileOptionalParams = {},
): Promise<VectorStoreFileOutput> {
  const getOptions: GeneratedParameters.GetVectorStoreFileParameters = {
    ...operationOptionsToRequestParameters(options),
  };

  validateVectorStoreId(vectorStoreId);
  validateFileId(fileId);
  const result = await context
    .path("/vector_stores/{vectorStoreId}/files/{fileId}", vectorStoreId, fileId)
    .get(getOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreFileOutput(result.body);
}

/**
 * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
 * To delete the file, use the delete file endpoint.
 */
export async function deleteVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: DeleteVectorStoreFileOptionalParams = {},
): Promise<VectorStoreFileDeletionStatusOutput> {
  validateVectorStoreId(vectorStoreId);
  validateFileId(fileId);
  const deleteOptions: GeneratedParameters.GetVectorStoreFileParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  const result = await context
    .path("/vector_stores/{vectorStoreId}/files/{fileId}", vectorStoreId, fileId)
    .delete(deleteOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertVectorStoreFileDeletionStatusOutput(result.body);
}

function generateLroResponse(response: HttpResponse) : OperationResponse<VectorStoreFileOutput, RawRequest> {
  const body = response.body as WireVectorStoreFileOutput;
  let statusCode;
  // Possible values: "in_progress", "completed", "failed", "cancelled"
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
  const convertedBody = ConvertFromWire.convertVectorStoreFileOutput(body);
  return {
    flatResponse: convertedBody,
    rawResponse: {
      ...response,
      statusCode: statusCode,
      body: convertedBody,
    }
  };
}

function validateListVectorStoreFilesParameters(options?: ListVectorStoreFilesParameters): void {
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

function validateCreateVectorStoreFileParameters(options?: CreateVectorStoreFileParameters): void {
  if (options?.body?.chunking_strategy && !options.body.file_id) {
    throw new Error("Chunking strategy is only applicable if fileId is included");
  }
}
