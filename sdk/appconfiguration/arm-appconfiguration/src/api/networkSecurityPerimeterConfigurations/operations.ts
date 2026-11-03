// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _reconcileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Forces a refresh of the specified network security perimeter configuration. */
export function reconcile(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reconcileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileSend(
        context,
        resourceGroupName,
        configStoreName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByConfigurationStoreSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _listByConfigurationStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListResultDeserializer(result.body);
}

/** Lists all network security perimeter configurations for a configuration store. */
export function listByConfigurationStore(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConfigurationStoreSend(context, resourceGroupName, configStoreName, options),
    _listByConfigurationStoreDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Gets the specified network security perimeter configuration associated with the configuration store. */
export async function get(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    configStoreName,
    networkSecurityPerimeterConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
