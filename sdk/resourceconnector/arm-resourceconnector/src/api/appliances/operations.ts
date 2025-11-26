// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceConnectorManagementContext as Client } from "../index.js";
import type {
  Appliance,
  PatchableAppliance,
  _ApplianceListResult,
  ApplianceListCredentialResults,
  ApplianceListKeysResults,
  UpgradeGraph,
  _ApplianceOperationsList,
  ApplianceOperation,
  ApplianceGetTelemetryConfigResult,
} from "../../models/models.js";
import {
  applianceSerializer,
  applianceDeserializer,
  errorResponseDeserializer,
  patchableApplianceSerializer,
  _applianceListResultDeserializer,
  applianceListCredentialResultsDeserializer,
  applianceListKeysResultsDeserializer,
  upgradeGraphDeserializer,
  _applianceOperationsListDeserializer,
  applianceGetTelemetryConfigResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AppliancesGetTelemetryConfigOptionalParams,
  AppliancesListOperationsOptionalParams,
  AppliancesGetUpgradeGraphOptionalParams,
  AppliancesListKeysOptionalParams,
  AppliancesListClusterUserCredentialOptionalParams,
  AppliancesListBySubscriptionOptionalParams,
  AppliancesListByResourceGroupOptionalParams,
  AppliancesDeleteOptionalParams,
  AppliancesUpdateOptionalParams,
  AppliancesCreateOrUpdateOptionalParams,
  AppliancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getTelemetryConfigSend(
  context: Client,
  options: AppliancesGetTelemetryConfigOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceConnector/telemetryconfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTelemetryConfigDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplianceGetTelemetryConfigResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applianceGetTelemetryConfigResultDeserializer(result.body);
}

/** Gets the telemetry config. */
export async function getTelemetryConfig(
  context: Client,
  options: AppliancesGetTelemetryConfigOptionalParams = { requestOptions: {} },
): Promise<ApplianceGetTelemetryConfigResult> {
  const result = await _getTelemetryConfigSend(context, options);
  return _getTelemetryConfigDeserialize(result);
}

export function _listOperationsSend(
  context: Client,
  options: AppliancesListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.ResourceConnector/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplianceOperationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _applianceOperationsListDeserializer(result.body);
}

/** Lists all available Appliances operations. */
export function listOperations(
  context: Client,
  options: AppliancesListOperationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplianceOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getUpgradeGraphSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  upgradeGraph: string,
  options: AppliancesGetUpgradeGraphOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}/upgradeGraphs/{upgradeGraph}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      upgradeGraph: upgradeGraph,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getUpgradeGraphDeserialize(
  result: PathUncheckedResponse,
): Promise<UpgradeGraph> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return upgradeGraphDeserializer(result.body);
}

/** Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train. */
export async function getUpgradeGraph(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  upgradeGraph: string,
  options: AppliancesGetUpgradeGraphOptionalParams = { requestOptions: {} },
): Promise<UpgradeGraph> {
  const result = await _getUpgradeGraphSend(
    context,
    resourceGroupName,
    resourceName,
    upgradeGraph,
    options,
  );
  return _getUpgradeGraphDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}/listkeys{?api%2Dversion,artifactType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
      artifactType: options?.artifactType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplianceListKeysResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applianceListKeysResultsDeserializer(result.body);
}

/** Returns the cluster customer credentials for the dedicated appliance. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesListKeysOptionalParams = { requestOptions: {} },
): Promise<ApplianceListKeysResults> {
  const result = await _listKeysSend(context, resourceGroupName, resourceName, options);
  return _listKeysDeserialize(result);
}

export function _listClusterUserCredentialSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesListClusterUserCredentialOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}/listClusterUserCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listClusterUserCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplianceListCredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applianceListCredentialResultsDeserializer(result.body);
}

/** Returns the cluster user credentials for the dedicated appliance. */
export async function listClusterUserCredential(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesListClusterUserCredentialOptionalParams = {
    requestOptions: {},
  },
): Promise<ApplianceListCredentialResults> {
  const result = await _listClusterUserCredentialSend(
    context,
    resourceGroupName,
    resourceName,
    options,
  );
  return _listClusterUserCredentialDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: AppliancesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceConnector/appliances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplianceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _applianceListResultDeserializer(result.body);
}

/** Gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance */
export function listBySubscription(
  context: Client,
  options: AppliancesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Appliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AppliancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplianceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _applianceListResultDeserializer(result.body);
}

/** Gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AppliancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Appliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: PatchableAppliance,
  options: AppliancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: patchableApplianceSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Appliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applianceDeserializer(result.body);
}

/** Updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: PatchableAppliance,
  options: AppliancesUpdateOptionalParams = { requestOptions: {} },
): Promise<Appliance> {
  const result = await _updateSend(context, resourceGroupName, resourceName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: Appliance,
  options: AppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: applianceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Appliance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applianceDeserializer(result.body);
}

/** Creates or updates an Appliance in the specified Subscription and Resource Group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: Appliance,
  options: AppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Appliance>, Appliance> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Appliance>, Appliance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Appliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return applianceDeserializer(result.body);
}

/** Gets the details of an Appliance with a specified resource group and name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: AppliancesGetOptionalParams = { requestOptions: {} },
): Promise<Appliance> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
