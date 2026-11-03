// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  IntelligencePack,
  intelligencePackArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IntelligencePacksListOptionalParams,
  IntelligencePacksEnableOptionalParams,
  IntelligencePacksDisableOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IntelligencePacksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/intelligencePacks{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<IntelligencePack[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return intelligencePackArrayDeserializer(result.body);
}

/** Lists all the intelligence packs possible and whether they are enabled or disabled for a given workspace. */
export async function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IntelligencePacksListOptionalParams = { requestOptions: {} },
): Promise<IntelligencePack[]> {
  const result = await _listSend(context, resourceGroupName, workspaceName, options);
  return _listDeserialize(result);
}

export function _enableSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  intelligencePackName: string,
  options: IntelligencePacksEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/intelligencePacks/{intelligencePackName}/Enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      intelligencePackName: intelligencePackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables an intelligence pack for a given workspace. */
export async function enable(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  intelligencePackName: string,
  options: IntelligencePacksEnableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableSend(
    context,
    resourceGroupName,
    workspaceName,
    intelligencePackName,
    options,
  );
  return _enableDeserialize(result);
}

export function _disableSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  intelligencePackName: string,
  options: IntelligencePacksDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/intelligencePacks/{intelligencePackName}/Disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      intelligencePackName: intelligencePackName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables an intelligence pack for a given workspace. */
export async function disable(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  intelligencePackName: string,
  options: IntelligencePacksDisableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableSend(
    context,
    resourceGroupName,
    workspaceName,
    intelligencePackName,
    options,
  );
  return _disableDeserialize(result);
}
