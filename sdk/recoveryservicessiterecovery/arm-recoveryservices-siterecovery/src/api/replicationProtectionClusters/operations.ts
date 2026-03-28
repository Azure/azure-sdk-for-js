// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  ReplicationProtectionCluster,
  ApplyClusterRecoveryPointInput,
  ClusterTestFailoverInput,
  ClusterTestFailoverCleanupInput,
  ClusterUnplannedFailoverInput,
  _ReplicationProtectionClusterCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  replicationProtectionClusterSerializer,
  replicationProtectionClusterDeserializer,
  applyClusterRecoveryPointInputSerializer,
  clusterTestFailoverInputSerializer,
  clusterTestFailoverCleanupInputSerializer,
  clusterUnplannedFailoverInputSerializer,
  _replicationProtectionClusterCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationProtectionClustersListOptionalParams,
  ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectionClustersGetOperationResultsOptionalParams,
  ReplicationProtectionClustersUnplannedFailoverOptionalParams,
  ReplicationProtectionClustersTestFailoverCleanupOptionalParams,
  ReplicationProtectionClustersTestFailoverOptionalParams,
  ReplicationProtectionClustersRepairReplicationOptionalParams,
  ReplicationProtectionClustersFailoverCommitOptionalParams,
  ReplicationProtectionClustersApplyRecoveryPointOptionalParams,
  ReplicationProtectionClustersPurgeOptionalParams,
  ReplicationProtectionClustersCreateOptionalParams,
  ReplicationProtectionClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectionClusters{?api%2Dversion,skipToken,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      skipToken: options?.skipToken,
      "%24filter": options?.filter,
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
): Promise<_ReplicationProtectionClusterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _replicationProtectionClusterCollectionDeserializer(result.body);
}

/** Gets the list of ASR replication protected clusters in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectionClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReplicationProtectionCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _listByReplicationProtectionContainersSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters{?api%2Dversion}",
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
): Promise<_ReplicationProtectionClusterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _replicationProtectionClusterCollectionDeserializer(result.body);
}

/** Gets the list of ASR replication protected clusters in the protection container. */
export function listByReplicationProtectionContainers(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectionClustersListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ReplicationProtectionCluster> {
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

export function _getOperationResultsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  jobId: string,
  options: ReplicationProtectionClustersGetOperationResultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/operationResults/{jobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
      jobId: jobId,
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

export async function _getOperationResultsDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Track the results of an asynchronous operation on the replication protection cluster. */
export async function getOperationResults(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  jobId: string,
  options: ReplicationProtectionClustersGetOperationResultsOptionalParams = { requestOptions: {} },
): Promise<ReplicationProtectionCluster> {
  const result = await _getOperationResultsSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicationProtectionClusterName,
    jobId,
    options,
  );
  return _getOperationResultsDeserialize(result);
}

export function _unplannedFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  failoverInput: ClusterUnplannedFailoverInput,
  options: ReplicationProtectionClustersUnplannedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/unplannedFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
    body: clusterUnplannedFailoverInputSerializer(failoverInput),
  });
}

export async function _unplannedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Operation to initiate a failover of the replication protection cluster. */
export function unplannedFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  failoverInput: ClusterUnplannedFailoverInput,
  options: ReplicationProtectionClustersUnplannedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
  return getLongRunningPoller(context, _unplannedFailoverDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unplannedFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _testFailoverCleanupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  cleanupInput: ClusterTestFailoverCleanupInput,
  options: ReplicationProtectionClustersTestFailoverCleanupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/testFailoverCleanup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
    body: clusterTestFailoverCleanupInputSerializer(cleanupInput),
  });
}

export async function _testFailoverCleanupDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Operation to clean up the test failover of a replication protected cluster. */
export function testFailoverCleanup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  cleanupInput: ClusterTestFailoverCleanupInput,
  options: ReplicationProtectionClustersTestFailoverCleanupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
  return getLongRunningPoller(context, _testFailoverCleanupDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverCleanupSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        cleanupInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _testFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  failoverInput: ClusterTestFailoverInput,
  options: ReplicationProtectionClustersTestFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/testFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
    body: clusterTestFailoverInputSerializer(failoverInput),
  });
}

export async function _testFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Operation to initiate a failover of the replication protection cluster. */
export function testFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  failoverInput: ClusterTestFailoverInput,
  options: ReplicationProtectionClustersTestFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
  return getLongRunningPoller(context, _testFailoverDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        failoverInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _repairReplicationSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersRepairReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/repairReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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

export async function _repairReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** The operation to repair replication protection cluster. */
export function repairReplication(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersRepairReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
  return getLongRunningPoller(context, _repairReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _repairReplicationSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _failoverCommitSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersFailoverCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/failoverCommit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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

export async function _failoverCommitDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Operation to initiate commit failover of the replication protection cluster. */
export function failoverCommit(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersFailoverCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
  return getLongRunningPoller(context, _failoverCommitDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverCommitSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _applyRecoveryPointSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
  options: ReplicationProtectionClustersApplyRecoveryPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/applyRecoveryPoint{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
    body: applyClusterRecoveryPointInputSerializer(applyClusterRecoveryPointInput),
  });
}

export async function _applyRecoveryPointDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Operation to apply a new cluster recovery point on the Protection cluster. */
export function applyRecoveryPoint(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  applyClusterRecoveryPointInput: ApplyClusterRecoveryPointInput,
  options: ReplicationProtectionClustersApplyRecoveryPointOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
  return getLongRunningPoller(context, _applyRecoveryPointDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applyRecoveryPointSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        applyClusterRecoveryPointInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** The operation to purge the replication protection cluster. This operation will force delete the replication protection cluster. Use the remove operation on replication protection cluster to perform a clean disable replication protection cluster. */
export function purge(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersPurgeOptionalParams = { requestOptions: {} },
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
        replicationProtectionClusterName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  replicationProtectionCluster: ReplicationProtectionCluster,
  options: ReplicationProtectionClustersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
    body: replicationProtectionClusterSerializer(replicationProtectionCluster),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** The operation to create an ASR replication protection cluster item. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  replicationProtectionCluster: ReplicationProtectionCluster,
  options: ReplicationProtectionClustersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster> {
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
        replicationProtectionClusterName,
        replicationProtectionCluster,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectionCluster>, ReplicationProtectionCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicationProtectionClusterName: replicationProtectionClusterName,
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
): Promise<ReplicationProtectionCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectionClusterDeserializer(result.body);
}

/** Gets the details of an ASR replication protection cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicationProtectionClusterName: string,
  options: ReplicationProtectionClustersGetOptionalParams = { requestOptions: {} },
): Promise<ReplicationProtectionCluster> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicationProtectionClusterName,
    options,
  );
  return _getDeserialize(result);
}
