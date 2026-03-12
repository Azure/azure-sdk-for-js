// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  ProtectionContainerMapping,
  CreateProtectionContainerMappingInput,
  UpdateProtectionContainerMappingInput,
  _ProtectionContainerMappingCollection,
  RemoveProtectionContainerMappingInput,
} from "../../models/models.js";
import {
  protectionContainerMappingDeserializer,
  createProtectionContainerMappingInputSerializer,
  updateProtectionContainerMappingInputSerializer,
  _protectionContainerMappingCollectionDeserializer,
  removeProtectionContainerMappingInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationProtectionContainerMappingsListOptionalParams,
  ReplicationProtectionContainerMappingsDeleteOptionalParams,
  ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectionContainerMappingsPurgeOptionalParams,
  ReplicationProtectionContainerMappingsUpdateOptionalParams,
  ReplicationProtectionContainerMappingsCreateOptionalParams,
  ReplicationProtectionContainerMappingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionContainerMappingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectionContainerMappings{?api%2Dversion}",
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
): Promise<_ProtectionContainerMappingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _protectionContainerMappingCollectionDeserializer(result.body);
}

/** Lists the protection container mappings in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionContainerMappingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProtectionContainerMapping> {
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
  protectionContainerName: string,
  mappingName: string,
  removalInput: RemoveProtectionContainerMappingInput,
  options: ReplicationProtectionContainerMappingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}/remove{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      mappingName: mappingName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: removeProtectionContainerMappingInputSerializer(removalInput),
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The operation to delete or remove a protection container mapping. */
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
  mappingName: string,
  removalInput: RemoveProtectionContainerMappingInput,
  options: ReplicationProtectionContainerMappingsDeleteOptionalParams = { requestOptions: {} },
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
        mappingName,
        removalInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByReplicationProtectionContainersSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings{?api%2Dversion}",
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

export async function _listByReplicationProtectionContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProtectionContainerMappingCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _protectionContainerMappingCollectionDeserializer(result.body);
}

/** Lists the protection container mappings for a protection container. */
export function listByReplicationProtectionContainers(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionContainerMappingsListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProtectionContainerMapping> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationProtectionContainersSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    _listByReplicationProtectionContainersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  options: ReplicationProtectionContainerMappingsPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      mappingName: mappingName,
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

/** The operation to purge(force delete) a protection container mapping. */
export function purge(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  options: ReplicationProtectionContainerMappingsPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  updateInput: UpdateProtectionContainerMappingInput,
  options: ReplicationProtectionContainerMappingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      mappingName: mappingName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateProtectionContainerMappingInputSerializer(updateInput),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainerMapping> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerMappingDeserializer(result.body);
}

/** The operation to update protection container mapping. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  updateInput: UpdateProtectionContainerMappingInput,
  options: ReplicationProtectionContainerMappingsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        mappingName,
        updateInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  creationInput: CreateProtectionContainerMappingInput,
  options: ReplicationProtectionContainerMappingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      mappingName: mappingName,
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
    body: createProtectionContainerMappingInputSerializer(creationInput),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionContainerMapping> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerMappingDeserializer(result.body);
}

/** The operation to create a protection container mapping. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  creationInput: CreateProtectionContainerMappingInput,
  options: ReplicationProtectionContainerMappingsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping> {
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
        mappingName,
        creationInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ProtectionContainerMapping>, ProtectionContainerMapping>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  options: ReplicationProtectionContainerMappingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      mappingName: mappingName,
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
): Promise<ProtectionContainerMapping> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return protectionContainerMappingDeserializer(result.body);
}

/** Gets the details of a protection container mapping. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  mappingName: string,
  options: ReplicationProtectionContainerMappingsGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionContainerMapping> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    mappingName,
    options,
  );
  return _getDeserialize(result);
}
