// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { InputFile } from "../../models/models.js";
import { FilePurpose } from "../../../generated/src/models/models.js";
import {
  AssistantsContext as Client,
  RetrieveFile200Response,
  UploadFile200Response,
} from "../../../generated/src/rest/index.js";
import { FilesRetrieveFileOptions, FilesUploadFileOptions } from "../../../generated/src/models/options.js";
import { _retrieveFileSend } from "../../../generated/src/api/files/index.js";
import { createFile } from "@azure/core-rest-pipeline";

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): StreamableMethod<UploadFile200Response> {
  return context.path("/files").post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: {
      file: createFile(file, options?.filename || "unknown.txt"),
      purpose: purpose,
      filename: options?.filename,
    },
  });
}

export async function _uploadFileDeserialize(result: UploadFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Upload a file that can be used across various endpoints. */
export async function uploadFile(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): Promise<InputFile> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export async function _retrieveFileDeserialize(result: RetrieveFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw result.body;
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
): Promise<InputFile> {
  const result = await _retrieveFileSend(context, fileId, options);
  return _retrieveFileDeserialize(result);
}

