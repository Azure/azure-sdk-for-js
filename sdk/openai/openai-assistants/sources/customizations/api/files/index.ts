// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { InputFile, FilePurpose } from "../../../generated/src/models/models.js";
import {
  AssistantsContext as Client,
} from "../../rest/clientDefinitions.js";
import {
  DeleteFile200Response,
  ListFiles200Response,
  RetrieveFile200Response,
  RetrieveFileContent200Response,
  UploadFile200Response,
} from "../../../generated/src/rest/index.js";
import {
  FilesDeleteFileOptions,
  FilesListFilesOptions,
  FilesRetrieveFileContentOptions,
  FilesRetrieveFileOptions,
  FilesUploadFileOptions,
} from "../../../generated/src/models/options.js";
import { createFile } from "@azure/core-rest-pipeline";

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): StreamableMethod<UploadFile200Response> {
  const azurePath = "";
  return context.path("{azurePath}/files", azurePath).post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: {
      file: createFile(file, options?.filename || "unknown.txt"),
      purpose: purpose,
    },
  });
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptions = { requestOptions: {} }
): StreamableMethod<DeleteFile200Response> {
  const azurePath = "";
  return context
    .path("{azurePath}/files/{fileId}", azurePath, fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export function _retrieveFileSend(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveFile200Response> {
  const azurePath = "";
  return context
    .path("{azurePath}/files/{fileId}", azurePath, fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export function _retrieveFileContentSend(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileContentOptions = { requestOptions: {} }
): StreamableMethod<RetrieveFileContent200Response> {
  const azurePath = "";
  return context
    .path("{azurePath}/files/{fileId}/content", azurePath, fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export function _listFilesSend(
  context: Client,
  options: FilesListFilesOptions = { requestOptions: {} }
): StreamableMethod<ListFiles200Response> {
  const azurePath = "";
  return context.path("{azurePath}/files", azurePath).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: { purpose: options?.purpose },
  });
}

export async function _uploadFileDeserialize(result: UploadFile200Response): Promise<InputFile> {
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

export async function _retrieveFileDeserialize(
  result: RetrieveFile200Response
): Promise<InputFile> {
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
