// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { InputFile, FilePurpose } from "../../../generated/src/models/models.js";
import {
  AssistantsContext as Client,
  RetrieveFile200Response,
  UploadFile200Response,
} from "../../../generated/src/rest/index.js";
import {
  FilesUploadFileOptions,
} from "../../../generated/src/models/options.js";
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
    },
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
