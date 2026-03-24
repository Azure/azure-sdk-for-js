// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  ProviderMonitorSetting,
  _ProviderMonitorSettingArrayResponseWithContinuation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  providerMonitorSettingSerializer,
  providerMonitorSettingDeserializer,
  _providerMonitorSettingArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProviderMonitorSettingsListBySubscriptionOptionalParams,
  ProviderMonitorSettingsListByResourceGroupOptionalParams,
  ProviderMonitorSettingsDeleteOptionalParams,
  ProviderMonitorSettingsUpdateOptionalParams,
  ProviderMonitorSettingsCreateOptionalParams,
  ProviderMonitorSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ProviderMonitorSettingsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerMonitorSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProviderMonitorSettingArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _providerMonitorSettingArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the provider monitor settings in the subscription. */
export function listBySubscription(
  context: Client,
  options: ProviderMonitorSettingsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProviderMonitorSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ProviderMonitorSettingsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProviderHub/providerMonitorSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProviderMonitorSettingArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _providerMonitorSettingArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the provider monitor settings in the resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ProviderMonitorSettingsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProviderMonitorSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  options: ProviderMonitorSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProviderHub/providerMonitorSettings/{providerMonitorSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerMonitorSettingName: providerMonitorSettingName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a provider monitor setting. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  options: ProviderMonitorSettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    providerMonitorSettingName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  options: ProviderMonitorSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProviderHub/providerMonitorSettings/{providerMonitorSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerMonitorSettingName: providerMonitorSettingName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderMonitorSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return providerMonitorSettingDeserializer(result.body);
}

/** Updates the provider monitor setting properties as specified in the request body. Update fails if the specified provider monitor setting does not already exist. */
export async function update(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  options: ProviderMonitorSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<ProviderMonitorSetting> {
  const result = await _updateSend(context, resourceGroupName, providerMonitorSettingName, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  properties: ProviderMonitorSetting,
  options: ProviderMonitorSettingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProviderHub/providerMonitorSettings/{providerMonitorSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerMonitorSettingName: providerMonitorSettingName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: providerMonitorSettingSerializer(properties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderMonitorSetting> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return providerMonitorSettingDeserializer(result.body);
}

/** Creates the provider monitor setting. */
export function create(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  properties: ProviderMonitorSetting,
  options: ProviderMonitorSettingsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProviderMonitorSetting>, ProviderMonitorSetting> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, providerMonitorSettingName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<ProviderMonitorSetting>, ProviderMonitorSetting>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  options: ProviderMonitorSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProviderHub/providerMonitorSettings/{providerMonitorSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerMonitorSettingName: providerMonitorSettingName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
): Promise<ProviderMonitorSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return providerMonitorSettingDeserializer(result.body);
}

/** Gets the provider monitor setting details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  providerMonitorSettingName: string,
  options: ProviderMonitorSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ProviderMonitorSetting> {
  const result = await _getSend(context, resourceGroupName, providerMonitorSettingName, options);
  return _getDeserialize(result);
}
