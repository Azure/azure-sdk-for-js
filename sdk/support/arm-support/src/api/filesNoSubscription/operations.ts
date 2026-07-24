// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext as Client } from "../index.js";
import type { FileDetails, _FilesListResult, UploadFile } from "../../models/models.js";
import {
  errorResponseDeserializer,
  fileDetailsSerializer,
  fileDetailsDeserializer,
  _filesListResultDeserializer,
  uploadFileSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FilesNoSubscriptionUploadOptionalParams,
  FilesNoSubscriptionListOptionalParams,
  FilesNoSubscriptionCreateOptionalParams,
  FilesNoSubscriptionGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _uploadSend(
  context: Client,
  fileWorkspaceName: string,
  fileName: string,
  uploadFile: UploadFile,
  options: FilesNoSubscriptionUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}/upload{?api%2Dversion}",
    {
      fileWorkspaceName: fileWorkspaceName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: uploadFileSerializer(uploadFile),
  });
}

export async function _uploadDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This API allows you to upload content to a file */
export async function upload(
  context: Client,
  fileWorkspaceName: string,
  fileName: string,
  uploadFile: UploadFile,
  options: FilesNoSubscriptionUploadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uploadSend(context, fileWorkspaceName, fileName, uploadFile, options);
  return _uploadDeserialize(result);
}

export function _listSend(
  context: Client,
  fileWorkspaceName: string,
  options: FilesNoSubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files{?api%2Dversion}",
    {
      fileWorkspaceName: fileWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_FilesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _filesListResultDeserializer(result.body);
}

/** Lists all the Files information under a workspace for an Azure subscription. */
export function list(
  context: Client,
  fileWorkspaceName: string,
  options: FilesNoSubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FileDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, fileWorkspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _createSend(
  context: Client,
  fileWorkspaceName: string,
  fileName: string,
  createFileParameters: FileDetails,
  options: FilesNoSubscriptionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}{?api%2Dversion}",
    {
      fileWorkspaceName: fileWorkspaceName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fileDetailsSerializer(createFileParameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<FileDetails> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileDetailsDeserializer(result.body);
}

/** Creates a new file under a workspace. */
export async function create(
  context: Client,
  fileWorkspaceName: string,
  fileName: string,
  createFileParameters: FileDetails,
  options: FilesNoSubscriptionCreateOptionalParams = { requestOptions: {} },
): Promise<FileDetails> {
  const result = await _createSend(
    context,
    fileWorkspaceName,
    fileName,
    createFileParameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  fileWorkspaceName: string,
  fileName: string,
  options: FilesNoSubscriptionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}{?api%2Dversion}",
    {
      fileWorkspaceName: fileWorkspaceName,
      fileName: fileName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FileDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileDetailsDeserializer(result.body);
}

/** Returns details of a specific file in a work space. */
export async function get(
  context: Client,
  fileWorkspaceName: string,
  fileName: string,
  options: FilesNoSubscriptionGetOptionalParams = { requestOptions: {} },
): Promise<FileDetails> {
  const result = await _getSend(context, fileWorkspaceName, fileName, options);
  return _getDeserialize(result);
}
