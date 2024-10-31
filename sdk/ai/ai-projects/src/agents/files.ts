// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, createRestError } from "@azure-rest/core-client";
import { FileContentResponseOutput, FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput } from "../generated/src/outputModels.js";
import { AgentsDeleteFileParameters, AgentsGetFileContentParameters, AgentsGetFileParameters, AgentsListFilesParameters, AgentsUploadFileParameters } from "../generated/src/parameters.js";

const expectedStatuses = ["200"];

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options?: AgentsListFilesParameters,
): Promise<FileListResponseOutput> {
  const result = await context.path("/files").get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  options: AgentsUploadFileParameters,
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
  options?: AgentsDeleteFileParameters,
): Promise<FileDeletionStatusOutput> {
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
  options?: AgentsGetFileParameters,
): Promise<OpenAIFileOutput> {
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
  options?: AgentsGetFileContentParameters,
): Promise<FileContentResponseOutput> {
  const result = await context
    .path("/files/{fileId}", fileId)
    .get(options);
  if (!expectedStatuses.includes(result.status)) {
      throw createRestError(result);
  }
  return result.body; 
}
