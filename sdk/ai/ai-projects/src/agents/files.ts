// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput } from "../generated/src/outputModels.js";
import { DeleteFileParameters, GetFileContentParameters, GetFileParameters, ListFilesParameters, UploadFileParameters } from "../generated/src/parameters.js";

const expectedStatuses = ["200"];

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options?: ListFilesParameters,
): Promise<FileListResponseOutput> {
  validateListFilesParameters(options);
  const result = await context.path("/files").get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  options: UploadFileParameters,
): Promise<OpenAIFileOutput> {
  const result = await context.path("/files").post(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options?: DeleteFileParameters,
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
  options?: GetFileParameters,
): Promise<OpenAIFileOutput> {
  validateFileId(fileId);
  const result = await context
    .path("/files/{fileId}", fileId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Returns file content. */
export async function getFileContent(
  context: Client,
  fileId: string,
  options?: GetFileContentParameters,
): Promise<string> {
  validateFileId(fileId);
  const result = await context
    .path("/files/{fileId}/content", fileId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

function validateListFilesParameters(options?: ListFilesParameters): void {
  if (options?.queryParameters?.purpose) {
    if (!["fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"].includes(options?.queryParameters?.purpose)) {
      throw new Error("Purpose must be one of 'fine-tune', 'fine-tune-results', 'assistants', 'assistants_output', 'batch', 'batch_output', 'vision'");
    }
  }
}

function validateFileId(fileId: string): void {
  if (!fileId) {
    throw new Error("File ID is required");
  }
}
