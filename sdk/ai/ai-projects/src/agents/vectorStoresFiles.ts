// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  ListVectorStoreFilesParameters,
  CreateVectorStoreFileParameters,
} from "../generated/src/parameters.js";
import type {
  OpenAIPageableListOfVectorStoreFileOutput,
  VectorStoreFileDeletionStatusOutput,
  VectorStoreFileOutput,
} from "../customization/outputModels.js";
import { AgentsPoller } from "./poller.js";
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
import { convertToListQueryParameters, convertPollingOptions } from "../customization/convertParametersToWire.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertParamsToWire from "../customization/convertParametersToWire.js";

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
    throw createRestError(result);
  }
  return ConvertFromWire.convertOpenAIPageableListOfVectorStoreFileOutput(result.body);
}

/** Create a vector store file by attaching a file to a vector store. */
export function createVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileOptionalParams = {},
): CreateVectorStoreFileResponse {
  const createOptions: CreateVectorStoreFileParameters = {
    ...operationOptionsToRequestParameters(options),
    ...ConvertParamsToWire.convertCreateVectorStoreFileParam({ body: options }),
  };
  const pollingOptions = convertPollingOptions(options);
  validateVectorStoreId(vectorStoreId);
  validateCreateVectorStoreFileParameters(createOptions);

  async function executeCreateVectorStoreFile(): Promise<VectorStoreFileOutput> {
    const result = await context
      .path("/vector_stores/{vectorStoreId}/files", vectorStoreId)
      .post(createOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
    }
    return ConvertFromWire.convertVectorStoreFileOutput(result.body);
  }

  async function updateCreateVectorStoreFilePoll(
    currentResult?: VectorStoreFileOutput,
  ): Promise<{ result: VectorStoreFileOutput; completed: boolean }> {
    let vectorStoreFile: VectorStoreFileOutput;
    if (!currentResult) {
      vectorStoreFile = await executeCreateVectorStoreFile();
    } else {
      vectorStoreFile = await getVectorStoreFile(context, vectorStoreId, currentResult.id, options);
    }
    return {
      result: vectorStoreFile,
      completed: vectorStoreFile.status !== "in_progress",
    };
  }

  return {
    then: function (onFulfilled, onRejected) {
      return executeCreateVectorStoreFile().then(onFulfilled, onRejected).catch(onRejected);
    },
    poller: new AgentsPoller<VectorStoreFileOutput>({
      update: updateCreateVectorStoreFilePoll,
      pollingOptions: pollingOptions,
    }),
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
    throw createRestError(result);
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
    throw createRestError(result);
  }
  return ConvertFromWire.convertVectorStoreFileDeletionStatusOutput(result.body);
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
