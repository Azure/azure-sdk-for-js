// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  agentV1ErrorDeserializer,
  FileListResponse,
  fileListResponseDeserializer,
  FileInfo,
  fileInfoDeserializer,
  FilePurpose,
  _uploadFileRequestSerializer,
  FileDeletionStatus,
  fileDeletionStatusDeserializer,
  FilesGetFileContentResponse,
} from "../../models/models.js";
import { FileContents } from "../../static-helpers/multipartHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FilesGetFileContentOptionalParams,
  FilesGetFileOptionalParams,
  FilesDeleteFileOptionalParams,
  FilesUploadFileOptionalParams,
  FilesListFilesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getFileContentSend(
  context: Client,
  fileId: string,
  options: FilesGetFileContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}/content{?api%2Dversion}",
    {
      fileId: fileId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/octet-stream", ...options.requestOptions?.headers },
    });
}

export async function _getFileContentDeserialize(
  result: PathUncheckedResponse & FilesGetFileContentResponse,
): Promise<FilesGetFileContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = agentV1ErrorDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Retrieves the raw content of a specific file. */
export async function getFileContent(
  context: Client,
  fileId: string,
  options: FilesGetFileContentOptionalParams = { requestOptions: {} },
): Promise<FilesGetFileContentResponse> {
  const result = await _getFileContentSend(context, fileId, options);
  return _getFileContentDeserialize(result);
}

export function _getFileSend(
  context: Client,
  fileId: string,
  options: FilesGetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api%2Dversion}",
    {
      fileId: fileId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getFileDeserialize(result: PathUncheckedResponse): Promise<FileInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = agentV1ErrorDeserializer(result.body);
    }

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
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _deleteFileDeserialize(
  result: PathUncheckedResponse,
): Promise<FileDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = agentV1ErrorDeserializer(result.body);
    }

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
    file: FileContents | { contents: FileContents; contentType?: string; filename?: string };
    purpose: FilePurpose;
    filename?: string;
  },
  options: FilesUploadFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: _uploadFileRequestSerializer(body),
    });
}

export async function _uploadFileDeserialize(result: PathUncheckedResponse): Promise<FileInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = agentV1ErrorDeserializer(result.body);
    }

    throw error;
  }

  return fileInfoDeserializer(result.body);
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  body: {
    file: FileContents | { contents: FileContents; contentType?: string; filename?: string };
    purpose: FilePurpose;
    filename?: string;
  },
  options: FilesUploadFileOptionalParams = { requestOptions: {} },
): Promise<FileInfo> {
  const result = await _uploadFileSend(context, body, options);
  return _uploadFileDeserialize(result);
}

export function _listFilesSend(
  context: Client,
  options: FilesListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api%2Dversion,purpose}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      purpose: options?.purpose,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<FileListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = agentV1ErrorDeserializer(result.body);
    }

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
