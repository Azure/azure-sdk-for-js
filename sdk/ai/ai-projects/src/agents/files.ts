// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client, StreamableMethod } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type {
  FileDeletionStatusOutput,
  FileListResponseOutput,
  OpenAIFileOutput,
} from "../customization/outputModels.js";
import type { FilePurpose as CustomizedFilePurpose } from "../customization/models.js";
import type {
  DeleteFileOptionalParams,
  GetFileContentOptionalParams,
  GetFileOptionalParams,
  ListFilesOptionalParams,
  UploadFileWithPollingOptionalParams,
} from "./customModels.js";
import { AgentsPoller } from "./poller.js";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import * as ConvertParameters from "../customization/convertParametersToWire.js";
import { randomUUID } from "@azure/core-util";
import { createOpenAIError } from "./openAIError.js";
import type { PollerLike, PollOperationState } from "@azure/core-lro";
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
    queryParameters: ConvertParameters.convertListFilesQueryParamProperties(options),
  };
  validateListFilesParameters(listOptions);
  const result = await context.path("/files").get(options);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertFileListResponseOutput(result.body);
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  content: ReadableStream | NodeJS.ReadableStream,
  purpose: CustomizedFilePurpose,
  options: UploadFileWithPollingOptionalParams = {},
): Promise<OpenAIFileOutput> {
  const uploadFileOptions: GeneratedParameters.UploadFileParameters = {
    ...operationOptionsToRequestParameters(options),
    body: [
      { name: "file" as const, body: content, filename: options.fileName ?? randomUUID() },
      { name: "purpose" as const, body: purpose },
    ],
    contentType: "multipart/form-data",
  };
  const result = await context.path("/files").post(uploadFileOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertOpenAIFileOutput(result.body);
}

export function uploadFileAndPoll(
  context: Client,
  content: ReadableStream | NodeJS.ReadableStream,
  purpose: CustomizedFilePurpose,
  options: UploadFileWithPollingOptionalParams = {},
): PollerLike<PollOperationState<OpenAIFileOutput>, OpenAIFileOutput> {
  async function updateUploadFileAndPoll(
    currentResult?: OpenAIFileOutput,
  ): Promise<{ result: OpenAIFileOutput; completed: boolean }> {
    let file: OpenAIFileOutput;
    if (!currentResult) {
      file = await uploadFile(context, content, purpose, options);
    } else {
      file = await getFile(context, currentResult.id, options);
    }
    return {
      result: file,
      completed:
        file.status === "uploaded" || file.status === "processed" || file.status === "deleted",
    };
  }
  return new AgentsPoller<OpenAIFileOutput>({
    update: updateUploadFileAndPoll,
    pollingOptions: options.pollingOptions ?? {},
  });
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: DeleteFileOptionalParams = {},
): Promise<FileDeletionStatusOutput> {
  const deleteOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  validateFileId(fileId);
  const result = await context.path("/files/{fileId}", fileId).delete(deleteOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return result.body;
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options: GetFileOptionalParams = {},
): Promise<OpenAIFileOutput> {
  validateFileId(fileId);
  const getFileOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  const result = await context.path("/files/{fileId}", fileId).get(getFileOptions);
  if (!expectedStatuses.includes(result.status)) {
    throw createOpenAIError(result);
  }
  return ConvertFromWire.convertOpenAIFileOutput(result.body);
}

/** Returns file content. */
export function getFileContent(
  context: Client,
  fileId: string,
  options: GetFileContentOptionalParams = {},
): StreamableMethod<string | Uint8Array> {
  validateFileId(fileId);
  const getFileContentOptions: GeneratedParameters.ListFilesParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  return context.path("/files/{fileId}/content", fileId).get(getFileContentOptions);
}

function validateListFilesParameters(options?: GeneratedParameters.ListFilesParameters): void {
  if (options?.queryParameters?.purpose) {
    if (!Object.values(FilePurpose).includes(options?.queryParameters?.purpose as FilePurpose)) {
      throw new Error(
        "Purpose must be one of 'fine-tune', 'fine-tune-results', 'assistants', 'assistants_output', 'batch', 'batch_output', 'vision'",
      );
    }
  }
}

function validateFileId(fileId: string): void {
  if (!fileId) {
    throw new Error("File ID is required");
  }
}
