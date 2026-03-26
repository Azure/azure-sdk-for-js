// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type { DefenderForAISetting, _DefenderForAISettingResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  defenderForAISettingSerializer,
  defenderForAISettingDeserializer,
  _defenderForAISettingResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DefenderForAISettingsListOptionalParams,
  DefenderForAISettingsUpdateOptionalParams,
  DefenderForAISettingsCreateOrUpdateOptionalParams,
  DefenderForAISettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DefenderForAISettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DefenderForAISettingResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _defenderForAISettingResultDeserializer(result.body);
}

/** Lists the Defender for AI settings. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DefenderForAISettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DefenderForAISetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  defenderForAISettingName: string,
  defenderForAISettings: DefenderForAISetting,
  options: DefenderForAISettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings/{defenderForAISettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      defenderForAISettingName: defenderForAISettingName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: defenderForAISettingSerializer(defenderForAISettings),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DefenderForAISetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defenderForAISettingDeserializer(result.body);
}

/** Updates the specified Defender for AI setting. */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  defenderForAISettingName: string,
  defenderForAISettings: DefenderForAISetting,
  options: DefenderForAISettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<DefenderForAISetting> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    accountName,
    defenderForAISettingName,
    defenderForAISettings,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  defenderForAISettingName: string,
  defenderForAISettings: DefenderForAISetting,
  options: DefenderForAISettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings/{defenderForAISettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      defenderForAISettingName: defenderForAISettingName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: defenderForAISettingSerializer(defenderForAISettings),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DefenderForAISetting> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defenderForAISettingDeserializer(result.body);
}

/** Creates or Updates the specified Defender for AI setting. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  defenderForAISettingName: string,
  defenderForAISettings: DefenderForAISetting,
  options: DefenderForAISettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DefenderForAISetting> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    defenderForAISettingName,
    defenderForAISettings,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  defenderForAISettingName: string,
  options: DefenderForAISettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings/{defenderForAISettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      defenderForAISettingName: defenderForAISettingName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<DefenderForAISetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defenderForAISettingDeserializer(result.body);
}

/** Gets the specified Defender for AI setting by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  defenderForAISettingName: string,
  options: DefenderForAISettingsGetOptionalParams = { requestOptions: {} },
): Promise<DefenderForAISetting> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    defenderForAISettingName,
    options,
  );
  return _getDeserialize(result);
}
