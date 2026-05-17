// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  securityMLAnalyticsSettingUnionSerializer,
  securityMLAnalyticsSettingUnionDeserializer,
  SecurityMLAnalyticsSettingUnion,
  _SecurityMLAnalyticsSettingsList,
  _securityMLAnalyticsSettingsListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SecurityMLAnalyticsSettingsListOptionalParams,
  SecurityMLAnalyticsSettingsDeleteOptionalParams,
  SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams,
  SecurityMLAnalyticsSettingsGetOptionalParams,
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
  options: SecurityMLAnalyticsSettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
): Promise<_SecurityMLAnalyticsSettingsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityMLAnalyticsSettingsListDeserializer(result.body);
}

/** Gets all Security ML Analytics Settings. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SecurityMLAnalyticsSettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityMLAnalyticsSettingUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  settingsResourceName: string,
  options: SecurityMLAnalyticsSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      settingsResourceName: settingsResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete the Security ML Analytics Settings. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  settingsResourceName: string,
  options: SecurityMLAnalyticsSettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    settingsResourceName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  settingsResourceName: string,
  securityMLAnalyticsSetting: SecurityMLAnalyticsSettingUnion,
  options: SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      settingsResourceName: settingsResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityMLAnalyticsSettingUnionSerializer(securityMLAnalyticsSetting),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityMLAnalyticsSettingUnion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityMLAnalyticsSettingUnionDeserializer(result.body);
}

/** Creates or updates the Security ML Analytics Settings. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  settingsResourceName: string,
  securityMLAnalyticsSetting: SecurityMLAnalyticsSettingUnion,
  options: SecurityMLAnalyticsSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SecurityMLAnalyticsSettingUnion> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    workspaceName,
    settingsResourceName,
    securityMLAnalyticsSetting,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  settingsResourceName: string,
  options: SecurityMLAnalyticsSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/securityMLAnalyticsSettings/{settingsResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      settingsResourceName: settingsResourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
): Promise<SecurityMLAnalyticsSettingUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityMLAnalyticsSettingUnionDeserializer(result.body);
}

/** Gets the Security ML Analytics Settings. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  settingsResourceName: string,
  options: SecurityMLAnalyticsSettingsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityMLAnalyticsSettingUnion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    settingsResourceName,
    options,
  );
  return _getDeserialize(result);
}
