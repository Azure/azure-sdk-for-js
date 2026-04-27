// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  ClusterResource,
  _ListClusters,
  CommandPostBody,
  CommandOutput,
  CommandAsyncPostBody,
  CommandPublicResource,
  _ListCommands,
  _ListBackups,
  BackupResource,
  CassandraClusterPublicStatus,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudErrorDeserializer,
  clusterResourceSerializer,
  clusterResourceDeserializer,
  _listClustersDeserializer,
  commandPostBodySerializer,
  commandOutputDeserializer,
  commandAsyncPostBodySerializer,
  commandPublicResourceDeserializer,
  _listCommandsDeserializer,
  _listBackupsDeserializer,
  backupResourceDeserializer,
  cassandraClusterPublicStatusDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CassandraClustersStatusOptionalParams,
  CassandraClustersStartOptionalParams,
  CassandraClustersDeallocateOptionalParams,
  CassandraClustersGetBackupOptionalParams,
  CassandraClustersListBackupsOptionalParams,
  CassandraClustersGetCommandAsyncOptionalParams,
  CassandraClustersListCommandOptionalParams,
  CassandraClustersInvokeCommandAsyncOptionalParams,
  CassandraClustersInvokeCommandOptionalParams,
  CassandraClustersListBySubscriptionOptionalParams,
  CassandraClustersListByResourceGroupOptionalParams,
  CassandraClustersDeleteOptionalParams,
  CassandraClustersUpdateOptionalParams,
  CassandraClustersCreateUpdateOptionalParams,
  CassandraClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _statusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/status{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _statusDeserialize(
  result: PathUncheckedResponse,
): Promise<CassandraClusterPublicStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return cassandraClusterPublicStatusDeserializer(result.body);
}

/** Gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster. */
export async function status(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersStatusOptionalParams = { requestOptions: {} },
): Promise<CassandraClusterPublicStatus> {
  const result = await _statusSend(context, resourceGroupName, clusterName, options);
  return _statusDeserialize(result);
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual machine of this cluster with reserved data disk. This won't do anything on an already running cluster. Use Deallocate to deallocate the cluster. */
export function start(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _deallocateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersDeallocateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/deallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.xMsForceDeallocate !== undefined
        ? { "x-ms-force-deallocate": options?.xMsForceDeallocate }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deallocateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an already deallocated cluster. Use Start to restart the cluster. */
export function deallocate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersDeallocateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deallocateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deallocateSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getBackupSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  backupId: string,
  options: CassandraClustersGetBackupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/backups/{backupId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      backupId: backupId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getBackupDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return backupResourceDeserializer(result.body);
}

/** Get the properties of an individual backup of this cluster that is available to restore. */
export async function getBackup(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  backupId: string,
  options: CassandraClustersGetBackupOptionalParams = { requestOptions: {} },
): Promise<BackupResource> {
  const result = await _getBackupSend(context, resourceGroupName, clusterName, backupId, options);
  return _getBackupDeserialize(result);
}

export function _listBackupsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersListBackupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/backups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listBackupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListBackups> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listBackupsDeserializer(result.body);
}

/** List the backups of this cluster that are available to restore. */
export function listBackups(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersListBackupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBackupsSend(context, resourceGroupName, clusterName, options),
    _listBackupsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _getCommandAsyncSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  commandId: string,
  options: CassandraClustersGetCommandAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/commands/{commandId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      commandId: commandId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getCommandAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<CommandPublicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return commandPublicResourceDeserializer(result.body);
}

/** Get details about a specified command that was run asynchronously. */
export async function getCommandAsync(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  commandId: string,
  options: CassandraClustersGetCommandAsyncOptionalParams = { requestOptions: {} },
): Promise<CommandPublicResource> {
  const result = await _getCommandAsyncSend(
    context,
    resourceGroupName,
    clusterName,
    commandId,
    options,
  );
  return _getCommandAsyncDeserialize(result);
}

export function _listCommandSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersListCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/commands{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListCommands> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listCommandsDeserializer(result.body);
}

/** List all commands currently running on ring info */
export function listCommand(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersListCommandOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommandPublicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listCommandSend(context, resourceGroupName, clusterName, options),
    _listCommandDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _invokeCommandAsyncSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: CommandAsyncPostBody,
  options: CassandraClustersInvokeCommandAsyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/invokeCommandAsync{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commandAsyncPostBodySerializer(body),
  });
}

export async function _invokeCommandAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<CommandPublicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commandPublicResourceDeserializer(result.body);
}

/** Invoke a command like nodetool for cassandra maintenance asynchronously */
export function invokeCommandAsync(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: CommandAsyncPostBody,
  options: CassandraClustersInvokeCommandAsyncOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommandPublicResource>, CommandPublicResource> {
  return getLongRunningPoller(context, _invokeCommandAsyncDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invokeCommandAsyncSend(context, resourceGroupName, clusterName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<CommandPublicResource>, CommandPublicResource>;
}

export function _invokeCommandSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: CommandPostBody,
  options: CassandraClustersInvokeCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/invokeCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commandPostBodySerializer(body),
  });
}

export async function _invokeCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<CommandOutput> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return commandOutputDeserializer(result.body);
}

/** Invoke a command like nodetool for cassandra maintenance */
export function invokeCommand(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: CommandPostBody,
  options: CassandraClustersInvokeCommandOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommandOutput>, CommandOutput> {
  return getLongRunningPoller(context, _invokeCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invokeCommandSend(context, resourceGroupName, clusterName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<CommandOutput>, CommandOutput>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: CassandraClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/cassandraClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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
): Promise<_ListClusters> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listClustersDeserializer(result.body);
}

/** List all managed Cassandra clusters in this subscription. */
export function listBySubscription(
  context: Client,
  options: CassandraClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CassandraClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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
): Promise<_ListClusters> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listClustersDeserializer(result.body);
}

/** List all managed Cassandra clusters in this resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CassandraClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a managed Cassandra cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: ClusterResource,
  options: CassandraClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clusterResourceSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ClusterResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return clusterResourceDeserializer(result.body);
}

/** Updates some of the properties of a managed Cassandra cluster. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: ClusterResource,
  options: CassandraClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterResource>, ClusterResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, clusterName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<ClusterResource>, ClusterResource>;
}

export function _createUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: ClusterResource,
  options: CassandraClustersCreateUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clusterResourceSerializer(body),
  });
}

export async function _createUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return clusterResourceDeserializer(result.body);
}

/** Create or update a managed Cassandra cluster. When updating, you must specify all writable properties. To update only some properties, use PATCH. */
export function createUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: ClusterResource,
  options: CassandraClustersCreateUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterResource>, ClusterResource> {
  return getLongRunningPoller(context, _createUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createUpdateSend(context, resourceGroupName, clusterName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<ClusterResource>, ClusterResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ClusterResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return clusterResourceDeserializer(result.body);
}

/** Get the properties of a managed Cassandra cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: CassandraClustersGetOptionalParams = { requestOptions: {} },
): Promise<ClusterResource> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
