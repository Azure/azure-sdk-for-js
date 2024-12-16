// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, StreamableMethod } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  FileDeletionStatusOutput,
  FileListResponseOutput,
  OpenAIFileOutput,
} from "../customization/outputModels.js";
import type { UploadFileOptionalParams} from "./customModels.js";
import { type ListFilesOptionalParams, type PollingOptions } from "./customModels.js";
import { AgentsPoller } from "./poller.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";

const expectedStatuses = ["200"];

enum FilePurpose {
  FineTune = "fine-tune",
  FineTuneResults = "fine-tune-results",
  Assistants = "assistants",
  AssistantsOutput = "assistants_output",
  Batch = "batch",
  BatchOutput = "batch_output",
  Vision = "vision",
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: ListFilesOptionalParams = {},
): Promise<FileListResponseOutput> {
  const listOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  validateListFilesParameters(listOptions);
  const result = await context.path("/files").get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return ConvertFromWire.convertFileListResponseOutput(result.body); 
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  options: GeneratedParameters.UploadFileParameters,
): Promise<OpenAIFileOutput> {
  const result = await context.path("/files").post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return ConvertFromWire.convertOpenAIFileOutput(result.body); 
}

/** Uploads a file for use by other operations. */
export async function uploadFileAndPoll(
  context: Client, 
  options: UploadFileOptionalParams, 
  pollingOptions?: PollingOptions,
): Promise<OpenAIFileOutput> {
  async function updateUploadFileAndPoll(currentResult?: OpenAIFileOutput): Promise<{result: OpenAIFileOutput; completed: boolean}> {
    let file: OpenAIFileOutput;
    if (!currentResult) {
      file = await uploadFile(context, {...options});
    } else {
      file = await getFile(context, currentResult.id, options);
    }
    return { result: file, completed: file.status === "uploaded" || file.status === "processed" || file.status === "deleted" };
  }

  const poller = new AgentsPoller<OpenAIFileOutput>({ update: updateUploadFileAndPoll, pollingOptions: pollingOptions,});

  return poller.pollUntilDone(); 
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options?: GeneratedParameters.DeleteFileParameters,
): Promise<FileDeletionStatusOutput> {
  validateFileId(fileId);
  const result = await context
    .path("/files/{fileId}", fileId)
    .delete(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body;
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options?: GeneratedParameters.GetFileParameters,
): Promise<OpenAIFileOutput> {
  validateFileId(fileId);
  const result = await context
    .path("/files/{fileId}", fileId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return ConvertFromWire.convertOpenAIFileOutput(result.body); 
}

/** Returns file content. */
export function getFileContent(
  context: Client,
  fileId: string,
  options?: GeneratedParameters.GetFileContentParameters,
): StreamableMethod<string | Uint8Array> {
  validateFileId(fileId);
  return context
    .path("/files/{fileId}/content", fileId)
    .get(options);
}

function validateListFilesParameters(options?: GeneratedParameters.ListFilesParameters): void {
  if (options?.queryParameters?.purpose) {
    if (!Object.values(FilePurpose).includes(options?.queryParameters?.purpose as FilePurpose)) {
      throw new Error("Purpose must be one of 'fine-tune', 'fine-tune-results', 'assistants', 'assistants_output', 'batch', 'batch_output', 'vision'");
    }
  }
}

function validateFileId(fileId: string): void {
  if (!fileId) {
    throw new Error("File ID is required");
  }
}
