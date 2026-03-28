// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  ProtectionContainer,
  CreateProtectionContainerInput,
  _ProtectionContainerCollection,
  DiscoverProtectableItemRequest,
  SwitchClusterProtectionInput,
  SwitchProtectionInput,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  protectionContainerDeserializer,
  createProtectionContainerInputSerializer,
  _protectionContainerCollectionDeserializer,
  discoverProtectableItemRequestSerializer,
  switchClusterProtectionInputSerializer,
  switchProtectionInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationProtectionContainersListOptionalParams,
  ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ReplicationProtectionContainersDeleteOptionalParams,
  ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
  ReplicationProtectionContainersCreateOptionalParams,
  ReplicationProtectionContainersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionContainersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectionContainers{?api%2Dversion}",
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
): Promise<_ProtectionContainerCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _protectionContainerCollectionDeserializer(result.body);
}

/** Lists the protection containers in a vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionContainersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProtectionContainer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _switchProtectionSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  switchInput: SwitchProtectionInput,
  options: ReplicationProtectionContainersSwitchProtectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/switchprotection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: switchProtectionInputSerializer(switchInput),
  });
}

export async function _switchProtectionDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerDeserializer(result.body);
}

/** Operation to switch protection from one container to another or one replication provider to another. */
export function switchProtection(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  switchInput: SwitchProtectionInput,
  options: ReplicationProtectionContainersSwitchProtectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectionContainer>, ProtectionContainer> {
  return getLongRunningPoller(context, _switchProtectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _switchProtectionSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
}

export function _switchClusterProtectionSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  switchInput: SwitchClusterProtectionInput,
  options: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/switchClusterProtection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: switchClusterProtectionInputSerializer(switchInput),
  });
}

export async function _switchClusterProtectionDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainer> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return protectionContainerDeserializer(result.body);
}

/** Operation to switch protection from one container to another. */
export function switchClusterProtection(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  switchInput: SwitchClusterProtectionInput,
  options: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ProtectionContainer>, ProtectionContainer> {
  return getLongRunningPoller(context, _switchClusterProtectionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _switchClusterProtectionSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        switchInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionContainersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/remove{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
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

/** Operation to remove a protection container. */
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
  protectionContainerName: string,
  options: ReplicationProtectionContainersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["204", "202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _discoverProtectableItemSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  discoverProtectableItemRequest: DiscoverProtectableItemRequest,
  options: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/discoverProtectableItem{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: discoverProtectableItemRequestSerializer(discoverProtectableItemRequest),
  });
}

export async function _discoverProtectableItemDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerDeserializer(result.body);
}

/** The operation to a add a protectable item to a protection container(Add physical server). */
export function discoverProtectableItem(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  discoverProtectableItemRequest: DiscoverProtectableItemRequest,
  options: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ProtectionContainer>, ProtectionContainer> {
  return getLongRunningPoller(context, _discoverProtectableItemDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _discoverProtectableItemSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        discoverProtectableItemRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
}

export function _listByReplicationFabricsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationProtectionContainersListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers{?api%2Dversion}",
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
): Promise<_ProtectionContainerCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _protectionContainerCollectionDeserializer(result.body);
}

/** Lists the protection containers in the specified fabric. */
export function listByReplicationFabrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  options: ReplicationProtectionContainersListByReplicationFabricsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProtectionContainer> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationFabricsSend(context, resourceGroupName, resourceName, fabricName, options),
    _listByReplicationFabricsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  creationInput: CreateProtectionContainerInput,
  options: ReplicationProtectionContainersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
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
    body: createProtectionContainerInputSerializer(creationInput),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerDeserializer(result.body);
}

/** Operation to create a protection container. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  creationInput: CreateProtectionContainerInput,
  options: ReplicationProtectionContainersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectionContainer>, ProtectionContainer> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        creationInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ProtectionContainer>, ProtectionContainer>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProtectionContainer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerDeserializer(result.body);
}

/** Gets the details of a protection container. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionContainersGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionContainer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    options,
  );
  return _getDeserialize(result);
}
