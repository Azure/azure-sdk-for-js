// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext as Client } from "../index.js";
import type { FileWorkspaceDetails } from "../../models/models.js";
import {
  errorResponseDeserializer,
  fileWorkspaceDetailsDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FileWorkspacesCreateOptionalParams,
  FileWorkspacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      fileWorkspaceName: fileWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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

/** Creates a new file workspace for the specified subscription. */
export async function create(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesCreateOptionalParams = { requestOptions: {} },
): Promise<FileWorkspaceDetails> {
  const result = await _createSend(context, fileWorkspaceName, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

/** Gets details for a specific file workspace in an Azure subscription. */
export async function get(
  context: Client,
  fileWorkspaceName: string,
  options: FileWorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<FileWorkspaceDetails> {
  const result = await _getSend(context, fileWorkspaceName, options);
  return _getDeserialize(result);
}
