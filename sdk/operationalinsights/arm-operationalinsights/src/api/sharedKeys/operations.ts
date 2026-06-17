// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SharedKeys,
  sharedKeysDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SharedKeysRegenerateOptionalParams,
  SharedKeysGetSharedKeysOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _regenerateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SharedKeysRegenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/regenerateSharedKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _regenerateDeserialize(result: PathUncheckedResponse): Promise<SharedKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sharedKeysDeserializer(result.body);
}

/** Regenerates the shared keys for a Log Analytics Workspace. These keys are used to connect Microsoft Operational Insights agents to the workspace. */
export async function regenerate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SharedKeysRegenerateOptionalParams = { requestOptions: {} },
): Promise<SharedKeys> {
  const result = await _regenerateSend(context, resourceGroupName, workspaceName, options);
  return _regenerateDeserialize(result);
}

export function _getSharedKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SharedKeysGetSharedKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/sharedKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getSharedKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sharedKeysDeserializer(result.body);
}

/** Gets the shared keys for a workspace. */
export async function getSharedKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SharedKeysGetSharedKeysOptionalParams = { requestOptions: {} },
): Promise<SharedKeys> {
  const result = await _getSharedKeysSend(context, resourceGroupName, workspaceName, options);
  return _getSharedKeysDeserialize(result);
}
