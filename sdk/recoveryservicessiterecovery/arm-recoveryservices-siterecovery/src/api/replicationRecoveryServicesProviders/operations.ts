// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  RecoveryServicesProvider,
  AddRecoveryServicesProviderInput,
  _RecoveryServicesProviderCollection,
} from "../../models/models.js";
import {
  recoveryServicesProviderDeserializer,
  addRecoveryServicesProviderInputSerializer,
  _recoveryServicesProviderCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationRecoveryServicesProvidersListOptionalParams,
  ReplicationRecoveryServicesProvidersDeleteOptionalParams,
  ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams,
  ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams,
  ReplicationRecoveryServicesProvidersPurgeOptionalParams,
  ReplicationRecoveryServicesProvidersCreateOptionalParams,
  ReplicationRecoveryServicesProvidersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationRecoveryServicesProvidersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryServicesProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<_RecoveryServicesProviderCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _recoveryServicesProviderCollectionDeserializer(result.body);
}

/** Lists the registered recovery services providers in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationRecoveryServicesProvidersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryServicesProvider> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}/remove{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The operation to removes/delete(unregister) a recovery services provider from the vault. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["204", "202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, fabricName, providerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _refreshProviderSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}/refreshProvider{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _refreshProviderDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryServicesProvider> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryServicesProviderDeserializer(result.body);
}

/** The operation to refresh the information from the recovery services provider. */
export function refreshProvider(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersRefreshProviderOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider> {
  return getLongRunningPoller(context, _refreshProviderDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshProviderSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider>;
}

export function _listByReplicationFabricsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _listByReplicationFabricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoveryServicesProviderCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _recoveryServicesProviderCollectionDeserializer(result.body);
}

/** Lists the registered recovery services providers for the specified fabric. */
export function listByReplicationFabrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationRecoveryServicesProvidersListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RecoveryServicesProvider> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationFabricsSend(context, resourceGroupName, resourceName, fabricName, options),
    _listByReplicationFabricsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The operation to purge(force delete) a recovery services provider from the vault. */
export function purge(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeSend(context, resourceGroupName, resourceName, fabricName, providerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  addProviderInput: AddRecoveryServicesProviderInput,
  options: ReplicationRecoveryServicesProvidersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: addRecoveryServicesProviderInputSerializer(addProviderInput),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryServicesProvider> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryServicesProviderDeserializer(result.body);
}

/** The operation to add a recovery services provider. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  addProviderInput: AddRecoveryServicesProviderInput,
  options: ReplicationRecoveryServicesProvidersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        providerName,
        addProviderInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryServicesProvider>, RecoveryServicesProvider>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<RecoveryServicesProvider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryServicesProviderDeserializer(result.body);
}

/** Gets the details of registered recovery services provider. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  providerName: string,
  options: ReplicationRecoveryServicesProvidersGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryServicesProvider> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    providerName,
    options,
  );
  return _getDeserialize(result);
}
