// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  HorizonDbReplica,
  _HorizonDbReplicaListResult,
  HorizonDbReplicaForPatchUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  horizonDbReplicaSerializer,
  horizonDbReplicaDeserializer,
  _horizonDbReplicaListResultDeserializer,
  horizonDbReplicaForPatchUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HorizonDbReplicasDeleteOptionalParams,
  HorizonDbReplicasUpdateOptionalParams,
  HorizonDbReplicasCreateOrUpdateOptionalParams,
  HorizonDbReplicasListOptionalParams,
  HorizonDbReplicasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  options: HorizonDbReplicasDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/replicas/{replicaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a HorizonDb replica. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  options: HorizonDbReplicasDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, poolName, replicaName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  properties: HorizonDbReplicaForPatchUpdate,
  options: HorizonDbReplicasUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/replicas/{replicaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: horizonDbReplicaForPatchUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<HorizonDbReplica> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbReplicaDeserializer(result.body);
}

/** Updates an existing HorizonDb replica (e.g., role). */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  properties: HorizonDbReplicaForPatchUpdate,
  options: HorizonDbReplicasUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  resource: HorizonDbReplica,
  options: HorizonDbReplicasCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/replicas/{replicaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: horizonDbReplicaSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HorizonDbReplica> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbReplicaDeserializer(result.body);
}

/** Creates a new HorizonDb replica or updates an existing replica. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  resource: HorizonDbReplica,
  options: HorizonDbReplicasCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        replicaName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<HorizonDbReplica>, HorizonDbReplica>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: HorizonDbReplicasListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/replicas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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
): Promise<_HorizonDbReplicaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbReplicaListResultDeserializer(result.body);
}

/** Lists all HorizonDb replicas in a pool. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: HorizonDbReplicasListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbReplica> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, poolName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  options: HorizonDbReplicasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/replicas/{replicaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      replicaName: replicaName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HorizonDbReplica> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbReplicaDeserializer(result.body);
}

/** Gets information about a HorizonDb replica. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  replicaName: string,
  options: HorizonDbReplicasGetOptionalParams = { requestOptions: {} },
): Promise<HorizonDbReplica> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    poolName,
    replicaName,
    options,
  );
  return _getDeserialize(result);
}
