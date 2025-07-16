// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext as Client } from "../index.js";
import type {
  FileListResponse,
  FileInfo,
  FilePurpose,
  FileDeletionStatus,
} from "../../models/models.js";
import {
  agentV1ErrorDeserializer,
  fileListResponseDeserializer,
  fileInfoDeserializer,
  _uploadFileRequestSerializer,
  fileDeletionStatusDeserializer,
} from "../../models/models.js";
import type {
  FilesGetFileContentOptionalParams,
  FilesGetFileOptionalParams,
  FilesDeleteFileOptionalParams,
  FilesUploadFileOptionalParams,
  FilesListFilesOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { OperationState, OperationStatus, PollerLike } from "@azure/core-lro";
import { createPoller } from "../poller.js";

export function _getFileContentSend(
  context: Client,
  fileId: string,
  options: FilesGetFileContentOptionalParams = { requestOptions: {} },
): StreamableMethod<string | Uint8Array> {
  const path = expandUrlTemplate(
    "/files/{fileId}/content{?api-version}",
    {
      fileId: fileId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
  });
}

/** Retrieves the raw content of a specific file. */
export function getFileContent(
  context: Client,
  fileId: string,
  options: FilesGetFileContentOptionalParams = { requestOptions: {} },
): StreamableMethod<string | Uint8Array> {
  const result = _getFileContentSend(context, fileId, options);
  return result;
}

export function _getFileSend(
  context: Client,
  fileId: string,
  options: FilesGetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api-version}",
    {
      fileId: fileId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getFileDeserialize(result: PathUncheckedResponse): Promise<FileInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return fileInfoDeserializer(result.body);
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options: FilesGetFileOptionalParams = { requestOptions: {} },
): Promise<FileInfo> {
  const result = await _getFileSend(context, fileId, options);
  return _getFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api%2Dversion}",
    {
      fileId: fileId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteFileDeserialize(
  result: PathUncheckedResponse,
): Promise<FileDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return fileDeletionStatusDeserializer(result.body);
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptionalParams = { requestOptions: {} },
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  body: {
    file: ReadableStream<Uint8Array> | NodeJS.ReadableStream;
    purpose: FilePurpose;
    filename?: string;
  },
  options: FilesUploadFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: _uploadFileRequestSerializer(body),
  });
}

export async function _uploadFileDeserialize(result: PathUncheckedResponse): Promise<FileInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return fileInfoDeserializer(result.body);
}

/** Uploads a file for use by other operations. */
export async function uploadFileInternal(
  context: Client,
  body: {
    file: ReadableStream<Uint8Array> | NodeJS.ReadableStream;
    purpose: FilePurpose;
    filename?: string;
  },
  options: FilesUploadFileOptionalParams = { requestOptions: {} },
): Promise<FileInfo> {
  const result = await _uploadFileSend(context, body, options);
  return _uploadFileDeserialize(result);
}

/** Uploads a file for use by other operations. */
export function uploadFile(
  context: Client,
  body: {
    file: ReadableStream<Uint8Array> | NodeJS.ReadableStream;
    purpose: FilePurpose;
    filename?: string;
  },
  options: FilesUploadFileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FileInfo>, FileInfo> {
  return createPoller<FileInfo>({
    initOperation: async () => {
      return uploadFileInternal(context, body, options);
    },
    pollOperation: async (currentResult: FileInfo) => {
      return getFile(context, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    getOperationError: (result: FileInfo) => {
      return getLroOperationStatus(result) === "failed" && result.statusDetails
        ? new Error(`Operation failed: ${result.statusDetails}`)
        : undefined;
    },
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

/** Uploads a file for use by other operations with polling */
export function uploadFileAndPoll(
  context: Client,
  body: {
    file: ReadableStream<Uint8Array> | NodeJS.ReadableStream;
    purpose: FilePurpose;
    filename?: string;
  },
  options: FilesUploadFileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FileInfo>, FileInfo> {
  return createPoller<FileInfo>({
    initOperation: async () => {
      return uploadFileInternal(context, body, options);
    },
    pollOperation: async (currentResult: FileInfo) => {
      return getFile(context, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    getOperationError: (result: FileInfo) => {
      return getLroOperationStatus(result) === "failed" && result.statusDetails
        ? new Error(`Operation failed: ${result.statusDetails}`)
        : undefined;
    },
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

export function _listFilesSend(
  context: Client,
  options: FilesListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api%2Dversion,purpose}",
    {
      "api%2Dversion": context.apiVersion,
      purpose: options?.purpose,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<FileListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return fileListResponseDeserializer(result.body);
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: FilesListFilesOptionalParams = { requestOptions: {} },
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

function getLroOperationStatus(result: FileInfo): OperationStatus {
  switch (result.status) {
    case "running":
    case "pending":
      return "running";
    case "uploaded":
    case "processed":
      return "succeeded";
    default:
      return "failed";
  }
}
