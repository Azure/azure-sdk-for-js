// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationListResult,
  NetworkSecurityPerimeterConfigurationReconcileResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
  networkSecurityPerimeterConfigurationReconcileResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileForPrivateLinkScopeSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  perimeterName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/networkSecurityPerimeterConfigurations/{perimeterName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      perimeterName: perimeterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-16-preview",
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

export async function _reconcileForPrivateLinkScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfigurationReconcileResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return networkSecurityPerimeterConfigurationReconcileResultDeserializer(result.body);
}

/** Forces the network security perimeter configuration to refresh for a private link scope. */
export function reconcileForPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  perimeterName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileForPrivateLinkScopeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<NetworkSecurityPerimeterConfigurationReconcileResult>,
  NetworkSecurityPerimeterConfigurationReconcileResult
> {
  return getLongRunningPoller(
    context,
    _reconcileForPrivateLinkScopeDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _reconcileForPrivateLinkScopeSend(
          context,
          resourceGroupName,
          scopeName,
          perimeterName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-06-16-preview",
    },
  ) as PollerLike<
    OperationState<NetworkSecurityPerimeterConfigurationReconcileResult>,
    NetworkSecurityPerimeterConfigurationReconcileResult
  >;
}

export function _listByPrivateLinkScopeSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2026-06-16-preview",
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

export async function _listByPrivateLinkScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListResultDeserializer(result.body);
}

/** Lists the network security perimeter configurations for a private link scope. */
export function listByPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: NetworkSecurityPerimeterConfigurationsListByPrivateLinkScopeOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPrivateLinkScopeSend(context, resourceGroupName, scopeName, options),
    _listByPrivateLinkScopeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-16-preview",
    },
  );
}

export function _getByPrivateLinkScopeSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  perimeterName: string,
  options: NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/privateLinkScopes/{scopeName}/networkSecurityPerimeterConfigurations/{perimeterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      perimeterName: perimeterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-16-preview",
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

export async function _getByPrivateLinkScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Gets the network security perimeter configuration for a private link scope. */
export async function getByPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  perimeterName: string,
  options: NetworkSecurityPerimeterConfigurationsGetByPrivateLinkScopeOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getByPrivateLinkScopeSend(
    context,
    resourceGroupName,
    scopeName,
    perimeterName,
    options,
  );
  return _getByPrivateLinkScopeDeserialize(result);
}
