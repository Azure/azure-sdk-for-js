// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  Pool,
  _PoolListResult,
  PoolCreateOrUpdate,
  PoolForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  poolDeserializer,
  _poolListResultDeserializer,
  poolCreateOrUpdateSerializer,
  poolForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PoolsRestartOptionalParams,
  PoolsStopOptionalParams,
  PoolsStartOptionalParams,
  PoolsListOptionalParams,
  PoolsDeleteOptionalParams,
  PoolsUpdateOptionalParams,
  PoolsCreateOrReplaceOptionalParams,
  PoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return poolDeserializer(result.body);
}

/** Restarts the PostgreSQL container on all allocated nodes in a ready HorizonDB pool and applies pending dynamic and static parameter changes. This customer-initiated Restart is the only operation that applies static parameter changes or dynamic parameter changes requested with PendingReboot; Stop followed by Start and scheduled maintenance do not apply them. Power operations are supported only at pool scope in this API version; there is no cluster-level restart action. When the pool has no allocated nodes, the operation succeeds without restarting any nodes, pending changes are considered applied, parameterGroup.syncStatus becomes InSync, and the resulting configuration applies to nodes allocated later. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state. */
export function restart(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _restartDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, clusterName, poolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return poolDeserializer(result.body);
}

/** Stops a running HorizonDB pool and deallocates compute. Power operations are supported only at pool scope in this API version; there is no cluster-level stop action. Stop does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot. A subsequent Start also preserves those pending changes. The operation succeeds as an idempotent no-op when the pool is already Stopped. It is allowed when the pool has no allocated nodes. The Pool-scoped ReadOnly Endpoint remains discoverable but has no routing destination while the Pool is Stopped. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state. */
export function stop(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, clusterName, poolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _startDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return poolDeserializer(result.body);
}

/** Starts a stopped HorizonDB pool. Power operations are supported only at pool scope in this API version; there is no cluster-level start action. Start does not apply pending dynamic or static parameter changes; parameterGroup.syncStatus remains PendingReboot until a customer-initiated Restart. When the pool is already Ready, the operation succeeds as a true idempotent no-op and likewise leaves pending parameter changes pending. The operation is allowed when the pool has no allocated nodes. After the Pool is running, its Pool-scoped ReadOnly Endpoint routes only when at least one allocated node is not currently playing the read-write role. The request fails with 409 Conflict when another operation is in progress or the pool is in any other incompatible state. */
export function start(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, clusterName, poolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: PoolsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _poolListResultDeserializer(result.body);
}

/** Lists all HorizonDB pools in a cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: PoolsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Pool> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a HorizonDB pool together with the Pool-scoped Endpoint whose associatedResourceId identifies that Pool and all FirewallRule children of that Endpoint. The Endpoint cannot outlive or be deleted independently from its Pool. When this is the Cluster's last surviving Pool, the service also disconnects every existing private endpoint connection associated with the Cluster by setting its privateLinkServiceConnectionState.status to Rejected and providing a description that the last Pool was deleted. The HorizonDB private endpoint connection resources remain available for inspection and cleanup, and customer-owned Microsoft.Network/privateEndpoints resources are not deleted. The delete long-running operation completes only after all required private endpoint disconnections have completed. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, poolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  properties: PoolForPatchUpdateUpdate,
  options: PoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: poolForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return poolDeserializer(result.body);
}

/** Updates an existing HorizonDB pool, including its node allocation, selected compute model properties, compute model type, high-availability configuration, or associated parameter group. Omitted nodeCount and highAvailability.mode values preserve their existing values; the service recursively merges the PATCH before atomically validating the effective tuple. nodeCount, when supplied, must be 1 through 16. Disabled is valid only when the effective nodeCount is 1. AnyZone and ZoneRedundant are valid only when the effective nodeCount is 2 through 16. Therefore, crossing between those node-count ranges requires nodeCount and highAvailability.mode to be changed together. AnyZone permits same-zone or cross-zone placement. Changing from AnyZone to ZoneRedundant may allocate a replacement node in another availability zone and replace a read-only node, disconnecting connections to the replaced node. If all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. To deallocate runtime compute without changing the configured nodeCount, use the Pool stop action. When parameterGroup is supplied, both parameterGroupResourceId and applyMethod are required. The pool can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated against the recursively merged configuration. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  properties: PoolForPatchUpdateUpdate,
  options: PoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, poolName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  resource: PoolCreateOrUpdate,
  options: PoolsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: poolCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return poolDeserializer(result.body);
}

/** Creates a new HorizonDB pool or replaces an existing pool, including its node allocation, compute model, high-availability configuration, or associated parameter group. nodeCount and highAvailability.mode are required and have no service defaults. nodeCount must be 1 through 16. Disabled is valid only when nodeCount is 1. AnyZone and ZoneRedundant are valid only when nodeCount is 2 through 16. AnyZone permits same-zone or cross-zone placement, while ZoneRedundant requires nodes to be allocated across availability zones. Node allocation and high-availability reconfiguration are atomic: if all requested nodes or the required zonal topology cannot be provisioned, the long-running operation fails and the previous resource state is preserved. A pool name must differ from its parent cluster name because the Cluster-scoped ReadWrite Endpoint is named after the Cluster and the Pool-scoped ReadOnly Endpoint is named after the Pool; the service rejects a request whose names would collide. Creating a pool also creates exactly one service-managed Pool-scoped ReadOnly Endpoint representing that Pool and its network boundary. The Endpoint's associatedResourceId identifies the Pool, and the Endpoint cannot outlive or be deleted independently from it. When the first pool is created, the service automatically designates it to host the cluster's read-write node when an eligible node is available. A Cluster must contain at least one Pool before a private endpoint connection can be created or approved. This API version supports at most one pool per cluster; an attempt to create another pool is rejected with 409 Conflict. parameterGroup, parameterGroupResourceId, and applyMethod are required. When creating a new pool in this API version, parameterGroupResourceId must identify the corresponding default parameter group; a customer-created parameter group is rejected. When replacing an existing pool, the request can switch its association in either direction between the corresponding default parameter group and a customer-created parameter group. applyMethod controls when dynamic parameter changes become effective. Static parameter changes always require a customer-initiated Restart; Stop followed by Start and scheduled maintenance do not apply pending changes. Subtype-specific compute constraints are validated before the resource is changed. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  resource: PoolCreateOrUpdate,
  options: PoolsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Pool>, Pool> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, clusterName, poolName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<Pool>, Pool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return poolDeserializer(result.body);
}

/** Gets information about a HorizonDB pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: PoolsGetOptionalParams = { requestOptions: {} },
): Promise<Pool> {
  const result = await _getSend(context, resourceGroupName, clusterName, poolName, options);
  return _getDeserialize(result);
}
