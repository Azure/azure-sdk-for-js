// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FileWorkspaceDetails,
  fileWorkspaceDetailsDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FileWorkspacesNoSubscriptionCreateOptionalParams,
  FileWorkspacesNoSubscriptionGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesNoSubscriptionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}{?api%2Dversion}",
    {
      fileWorkspaceName: fileWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<FileWorkspaceDetails> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileWorkspaceDetailsDeserializer(result.body);
}

/** Creates a new file workspace. */
export async function create(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesNoSubscriptionCreateOptionalParams = { requestOptions: {} },
): Promise<FileWorkspaceDetails> {
  const result = await _createSend(context, fileWorkspaceName, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesNoSubscriptionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}{?api%2Dversion}",
    {
      fileWorkspaceName: fileWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<FileWorkspaceDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return fileWorkspaceDetailsDeserializer(result.body);
}

/** Gets details for a specific file workspace. */
export async function get(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesNoSubscriptionGetOptionalParams = { requestOptions: {} },
): Promise<FileWorkspaceDetails> {
  const result = await _getSend(context, fileWorkspaceName, options);
  return _getDeserialize(result);
}
