// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InputFile,
} from "../../models/models.js";
import {
  FilePurpose,
} from "../../../generated/src/models/models.js";
import {
  AssistantsContext as Client,
  UploadFile200Response,
} from "../../../generated/src/rest/index.js";
import {
  FilesUploadFileOptions,
} from "../../../generated/src/models/options.js";
import {
  _uploadFileSend,
} from "../../../generated/src/api/files/index.js";

export async function _uploadFileDeserialize(
  result: UploadFile200Response
): Promise<InputFile> {
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