// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, HttpResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  ListVectorStoresParameters,
  CreateVectorStoreParameters,
  ModifyVectorStoreParameters,
} from "../generated/src/parameters.js";
import type {
  VectorStoreOutput as WireVectorStoreOutput
} from "../generated/src/outputModels.js";
import type {
  OpenAIPageableListOfVectorStoreOutput,
  VectorStoreDeletionStatusOutput,
  VectorStoreOutput,
} from "../customization/outputModels.js";
import type { CreateVectorStoreResponse } from "./customModels.js";
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
import { createHttpPoller, OperationResponse, RunningOperation } from "@azure/core-lro";
import { AbortSignalLike } from "@azure/abort-controller";

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
    throw createRestError(result);
  }
  return ConvertFromWire.convertOpenAIPageableListOfVectorStoreOutput(result.body);
}

/** Creates a vector store. */
export async function createVectorStore(
  context: Client,
  options: CreateVectorStoreOptionalParams = {},
): Promise<CreateVectorStoreResponse> {
  const createOptions: GeneratedParameters.CreateVectorStoreParameters = {
    ...operationOptionsToRequestParameters(options),
    body: ConvertToWire.convertVectorStoreOptions(options),
  };
  validateCreateVectorStoreParameters(createOptions);

  const initialResponse = await context.path("/vector_stores").post(createOptions);
  if (!expectedStatuses.includes(initialResponse.status)) {
    throw createRestError(initialResponse);
  }
  
  const abortController = new AbortController();
  const poller: RunningOperation<VectorStoreOutput> = {
    sendInitialRequest: async () => {
      return {
        flatResponse: initialResponse,
        rawResponse: {
          ...initialResponse,
          statusCode: Number.parseInt(initialResponse.status),
          body: ConvertFromWire.convertVectorStoreOutput(initialResponse.body as WireVectorStoreOutput),
        }
      }
    },
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
        const getOptions: GetVectorStoreOptionalParams = {
          ...operationOptionsToRequestParameters(options),
        };
        response = await context
          .path("/vector_stores/{vectorStoreId}", initialResponse.body.id)
          .get({ ...getOptions, abortSignal});
      } finally {
        inputAbortSignal?.removeEventListener("abort", abortListener);
      }
      return {
        flatResponse: response,
        rawResponse: {
          ...response,
          statusCode: Number.parseInt(response.status),
          body: ConvertFromWire.convertVectorStoreOutput(response.body as WireVectorStoreOutput),
        }
      }
    },
  }

  // TODO: Adjust parameters to match new polling options for v3 (intervalInMS and restoreFrom)
  return createHttpPoller(poller, {intervalInMs: options.pollingOptions?.sleepIntervalInMs, restoreFrom: undefined})
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
    throw createRestError(result);
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
    throw createRestError(result);
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
    throw createRestError(result);
  }
  return ConvertFromWire.convertVectorStoreDeletionStatusOutput(result.body);
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
