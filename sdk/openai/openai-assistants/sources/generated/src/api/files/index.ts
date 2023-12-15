// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FilePurpose,
  FileListResponse,
  File,
  FileDeletionStatus,
} from "../../models/models.js";
import {
  AssistantsContext as Client,
  DeleteFile200Response,
  ListFiles200Response,
  RetrieveFile200Response,
  RetrieveFileContent200Response,
  UploadFile200Response,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
import {
  FilesListFilesOptions,
  FilesUploadFileOptions,
  FilesDeleteFileOptions,
  FilesRetrieveFileOptions,
  FilesRetrieveFileContentOptions,
} from "../../models/options.js";

export function _listFilesSend(
  context: Client,
  options: FilesListFilesOptions = { requestOptions: {} }
): StreamableMethod<ListFiles200Response> {
  return context
    .path("/files")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { purpose: options?.purpose },
    });
}

export async function _listFilesDeserialize(
  result: ListFiles200Response
): Promise<FileListResponse> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      bytes: p["bytes"],
      filename: p["filename"],
      createdAt: new Date(p["created_at"]),
      purpose: p["purpose"],
    })),
  };
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: FilesListFilesOptions = { requestOptions: {} }
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): StreamableMethod<UploadFile200Response> {
  return context
    .path("/files")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: {
        file: uint8ArrayToString(file, "base64"),
        purpose: purpose,
        filename: options?.filename,
      },
    });
}

export async function _uploadFileDeserialize(
  result: UploadFile200Response
): Promise<File> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): Promise<File> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptions = { requestOptions: {} }
): StreamableMethod<DeleteFile200Response> {
  return context
    .path("/files/{fileId}", fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFileDeserialize(
  result: DeleteFile200Response
): Promise<FileDeletionStatus> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    deleted: result.body["deleted"],
    id: result.body["id"],
  };
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptions = { requestOptions: {} }
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _retrieveFileSend(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveFile200Response> {
  return context
    .path("/files/{fileId}", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveFileDeserialize(
  result: RetrieveFile200Response
): Promise<File> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function retrieveFile(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileOptions = { requestOptions: {} }
): Promise<File> {
  const result = await _retrieveFileSend(context, fileId, options);
  return _retrieveFileDeserialize(result);
}

export function _retrieveFileContentSend(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileContentOptions = { requestOptions: {} }
): StreamableMethod<RetrieveFileContent200Response> {
  return context
    .path("/files/{fileId}/content", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveFileContentDeserialize(
  result: RetrieveFileContent200Response
): Promise<Uint8Array> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** Returns the contents of a specified file. */
export async function retrieveFileContent(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileContentOptions = { requestOptions: {} }
): Promise<Uint8Array> {
  const result = await _retrieveFileContentSend(context, fileId, options);
  return _retrieveFileContentDeserialize(result);
}
