// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  ApiManagementServiceResource,
  ApiManagementServiceUpdateParameters,
  _ApiManagementServiceListResult,
  ApiManagementServiceBackupRestoreParameters,
  ApiManagementServiceGetSsoTokenResult,
  ApiManagementServiceCheckNameAvailabilityParameters,
  ApiManagementServiceNameAvailabilityResult,
  ApiManagementServiceGetDomainOwnershipIdentifierResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  apiManagementServiceResourceSerializer,
  apiManagementServiceResourceDeserializer,
  apiManagementServiceUpdateParametersSerializer,
  _apiManagementServiceListResultDeserializer,
  apiManagementServiceBackupRestoreParametersSerializer,
  migrateToStv2ContractSerializer,
  apiManagementServiceGetSsoTokenResultDeserializer,
  apiManagementServiceApplyNetworkConfigurationParametersSerializer,
  apiManagementServiceCheckNameAvailabilityParametersSerializer,
  apiManagementServiceNameAvailabilityResultDeserializer,
  apiManagementServiceGetDomainOwnershipIdentifierResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams,
  ApiManagementServiceCheckNameAvailabilityOptionalParams,
  ApiManagementServiceRefreshHostnamesOptionalParams,
  ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams,
  ApiManagementServiceGetSsoTokenOptionalParams,
  ApiManagementServiceMigrateToStv2OptionalParams,
  ApiManagementServiceBackupOptionalParams,
  ApiManagementServiceRestoreOptionalParams,
  ApiManagementServiceListOptionalParams,
  ApiManagementServiceListByResourceGroupOptionalParams,
  ApiManagementServiceDeleteOptionalParams,
  ApiManagementServiceUpdateOptionalParams,
  ApiManagementServiceCreateOrUpdateOptionalParams,
  ApiManagementServiceGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getDomainOwnershipIdentifierSend(
  context: Client,
  options: ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/getDomainOwnershipIdentifier{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDomainOwnershipIdentifierDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceGetDomainOwnershipIdentifierResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceGetDomainOwnershipIdentifierResultDeserializer(result.body);
}

/** Get the custom domain ownership identifier for an API Management service. */
export async function getDomainOwnershipIdentifier(
  context: Client,
  options: ApiManagementServiceGetDomainOwnershipIdentifierOptionalParams = { requestOptions: {} },
): Promise<ApiManagementServiceGetDomainOwnershipIdentifierResult> {
  const result = await _getDomainOwnershipIdentifierSend(context, options);
  return _getDomainOwnershipIdentifierDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  parameters: ApiManagementServiceCheckNameAvailabilityParameters,
  options: ApiManagementServiceCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiManagementServiceCheckNameAvailabilityParametersSerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceNameAvailabilityResultDeserializer(result.body);
}

/** Checks availability and correctness of a name for an API Management service. */
export async function checkNameAvailability(
  context: Client,
  parameters: ApiManagementServiceCheckNameAvailabilityParameters,
  options: ApiManagementServiceCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<ApiManagementServiceNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _refreshHostnamesSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceRefreshHostnamesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/refreshHostnames{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _refreshHostnamesDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Force Refresh the SSL certificate attached to the Custom Hostnames configured using secret from KeyVault on the Api Management service. */
export function refreshHostnames(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceRefreshHostnamesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _refreshHostnamesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshHostnamesSend(context, resourceGroupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _applyNetworkConfigurationUpdatesSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/applynetworkconfigurationupdates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : apiManagementServiceApplyNetworkConfigurationParametersSerializer(options["parameters"]),
  });
}

export async function _applyNetworkConfigurationUpdatesDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Updates the Microsoft.ApiManagement resource running in the Virtual network to pick the updated DNS changes. */
export function applyNetworkConfigurationUpdates(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceApplyNetworkConfigurationUpdatesOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(
    context,
    _applyNetworkConfigurationUpdatesDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _applyNetworkConfigurationUpdatesSend(context, resourceGroupName, serviceName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  ) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _getSsoTokenSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceGetSsoTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/getssotoken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getSsoTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceGetSsoTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceGetSsoTokenResultDeserializer(result.body);
}

/** Gets the Single-Sign-On token for the API Management Service which is valid for 5 Minutes. */
export async function getSsoToken(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceGetSsoTokenOptionalParams = { requestOptions: {} },
): Promise<ApiManagementServiceGetSsoTokenResult> {
  const result = await _getSsoTokenSend(context, resourceGroupName, serviceName, options);
  return _getSsoTokenDeserialize(result);
}

export function _migrateToStv2Send(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceMigrateToStv2OptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/migrateToStv2{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : migrateToStv2ContractSerializer(options["parameters"]),
  });
}

export async function _migrateToStv2Deserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Upgrades an API Management service to the Stv2 platform. For details refer to https://aka.ms/apim-migrate-stv2. This change is not reversible. This is long running operation and could take several minutes to complete. */
export function migrateToStv2(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceMigrateToStv2OptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _migrateToStv2Deserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _migrateToStv2Send(context, resourceGroupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _backupSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceBackupRestoreParameters,
  options: ApiManagementServiceBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiManagementServiceBackupRestoreParametersSerializer(parameters),
  });
}

export async function _backupDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete. */
export function backup(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceBackupRestoreParameters,
  options: ApiManagementServiceBackupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _backupDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _backupSend(context, resourceGroupName, serviceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _restoreSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceBackupRestoreParameters,
  options: ApiManagementServiceRestoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiManagementServiceBackupRestoreParametersSerializer(parameters),
  });
}

export async function _restoreDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Restores a backup of an API Management service created using the ApiManagementService_Backup operation on the current service. This is a long running operation and could take several minutes to complete. */
export function restore(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceBackupRestoreParameters,
  options: ApiManagementServiceRestoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _restoreDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreSend(context, resourceGroupName, serviceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _listSend(
  context: Client,
  options: ApiManagementServiceListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/service{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<_ApiManagementServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _apiManagementServiceListResultDeserializer(result.body);
}

/** Lists all API Management services within an Azure subscription. */
export function list(
  context: Client,
  options: ApiManagementServiceListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiManagementServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ApiManagementServiceListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<_ApiManagementServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _apiManagementServiceListResultDeserializer(result.body);
}

/** List all API Management services within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ApiManagementServiceListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiManagementServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Deletes an existing API Management service. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, serviceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceUpdateParameters,
  options: ApiManagementServiceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiManagementServiceUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Updates an existing API Management service. */
export function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceUpdateParameters,
  options: ApiManagementServiceUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serviceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceResource,
  options: ApiManagementServiceCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiManagementServiceResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Creates or updates an API Management service. This is long running operation and could take several minutes to complete. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: ApiManagementServiceResource,
  options: ApiManagementServiceCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, serviceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<ApiManagementServiceResource>, ApiManagementServiceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<ApiManagementServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementServiceResourceDeserializer(result.body);
}

/** Gets an API Management service resource description. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ApiManagementServiceGetOptionalParams = { requestOptions: {} },
): Promise<ApiManagementServiceResource> {
  const result = await _getSend(context, resourceGroupName, serviceName, options);
  return _getDeserialize(result);
}
