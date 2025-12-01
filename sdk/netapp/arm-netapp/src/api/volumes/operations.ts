// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  Volume,
  VolumePatch,
  _VolumeList,
  VolumeRevert,
  GetGroupIdListForLdapUserRequest,
  GetGroupIdListForLdapUserResponse,
  ReestablishReplicationRequest,
  ReplicationStatus,
  _ListReplications,
  Replication,
  AuthorizeRequest,
  PeerClusterForVolumeMigrationRequest,
  ClusterPeerCommandResponse,
  SvmPeerCommandResponse,
  PoolChangeRequest,
  ListQuotaReportResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  volumeSerializer,
  volumeDeserializer,
  volumePatchSerializer,
  _volumeListDeserializer,
  volumeRevertSerializer,
  breakFileLocksRequestSerializer,
  getGroupIdListForLdapUserRequestSerializer,
  getGroupIdListForLdapUserResponseDeserializer,
  breakReplicationRequestSerializer,
  reestablishReplicationRequestSerializer,
  replicationStatusDeserializer,
  listReplicationsRequestSerializer,
  _listReplicationsDeserializer,
  authorizeRequestSerializer,
  peerClusterForVolumeMigrationRequestSerializer,
  clusterPeerCommandResponseDeserializer,
  svmPeerCommandResponseDeserializer,
  poolChangeRequestSerializer,
  relocateVolumeRequestSerializer,
  listQuotaReportResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VolumesListQuotaReportOptionalParams,
  VolumesRevertRelocationOptionalParams,
  VolumesFinalizeRelocationOptionalParams,
  VolumesRelocateOptionalParams,
  VolumesPoolChangeOptionalParams,
  VolumesPerformReplicationTransferOptionalParams,
  VolumesFinalizeExternalReplicationOptionalParams,
  VolumesAuthorizeExternalReplicationOptionalParams,
  VolumesPeerExternalClusterOptionalParams,
  VolumesReInitializeReplicationOptionalParams,
  VolumesAuthorizeReplicationOptionalParams,
  VolumesDeleteReplicationOptionalParams,
  VolumesResyncReplicationOptionalParams,
  VolumesListReplicationsOptionalParams,
  VolumesReplicationStatusOptionalParams,
  VolumesReestablishReplicationOptionalParams,
  VolumesBreakReplicationOptionalParams,
  VolumesListGetGroupIdListForLdapUserOptionalParams,
  VolumesBreakFileLocksOptionalParams,
  VolumesSplitCloneFromParentOptionalParams,
  VolumesResetCifsPasswordOptionalParams,
  VolumesRevertOptionalParams,
  VolumesPopulateAvailabilityZoneOptionalParams,
  VolumesListOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOrUpdateOptionalParams,
  VolumesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listQuotaReportSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesListQuotaReportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/listQuotaReport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listQuotaReportDeserialize(
  result: PathUncheckedResponse,
): Promise<ListQuotaReportResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return listQuotaReportResponseDeserializer(result.body);
}

/** A long-running resource action. */
export function listQuotaReport(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesListQuotaReportOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ListQuotaReportResponse>, ListQuotaReportResponse> {
  return getLongRunningPoller(context, _listQuotaReportDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listQuotaReportSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ListQuotaReportResponse>, ListQuotaReportResponse>;
}

export function _revertRelocationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesRevertRelocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/revertRelocation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revertRelocationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume. */
export function revertRelocation(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesRevertRelocationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _revertRelocationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _revertRelocationSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _finalizeRelocationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesFinalizeRelocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/finalizeRelocation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _finalizeRelocationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Finalizes the relocation of the volume and cleans up the old volume. */
export function finalizeRelocation(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesFinalizeRelocationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _finalizeRelocationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _finalizeRelocationSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _relocateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesRelocateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/relocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["body"] ? options["body"] : relocateVolumeRequestSerializer(options["body"]),
  });
}

export async function _relocateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Relocates volume to a new stamp */
export function relocate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesRelocateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _relocateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _relocateSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _poolChangeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: PoolChangeRequest,
  options: VolumesPoolChangeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/poolChange{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: poolChangeRequestSerializer(body),
  });
}

export async function _poolChangeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Moves volume to another pool */
export function poolChange(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: PoolChangeRequest,
  options: VolumesPoolChangeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _poolChangeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _poolChangeSend(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _performReplicationTransferSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesPerformReplicationTransferOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/performReplicationTransfer{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _performReplicationTransferDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Performs an adhoc replication transfer on a volume with volumeType Migration */
export function performReplicationTransfer(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesPerformReplicationTransferOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _performReplicationTransferDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _performReplicationTransferSend(
          context,
          resourceGroupName,
          accountName,
          poolName,
          volumeName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _finalizeExternalReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesFinalizeExternalReplicationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/finalizeExternalReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _finalizeExternalReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Finalizes the migration of an external volume by releasing the replication and breaking the external cluster peering if no other migration is active. */
export function finalizeExternalReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesFinalizeExternalReplicationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _finalizeExternalReplicationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _finalizeExternalReplicationSend(
          context,
          resourceGroupName,
          accountName,
          poolName,
          volumeName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _authorizeExternalReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesAuthorizeExternalReplicationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/authorizeExternalReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _authorizeExternalReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<SvmPeerCommandResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return svmPeerCommandResponseDeserializer(result.body);
}

/** Starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created */
export function authorizeExternalReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesAuthorizeExternalReplicationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SvmPeerCommandResponse>, SvmPeerCommandResponse> {
  return getLongRunningPoller(
    context,
    _authorizeExternalReplicationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _authorizeExternalReplicationSend(
          context,
          resourceGroupName,
          accountName,
          poolName,
          volumeName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<SvmPeerCommandResponse>, SvmPeerCommandResponse>;
}

export function _peerExternalClusterSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: PeerClusterForVolumeMigrationRequest,
  options: VolumesPeerExternalClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/peerExternalCluster{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: peerClusterForVolumeMigrationRequestSerializer(body),
  });
}

export async function _peerExternalClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterPeerCommandResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterPeerCommandResponseDeserializer(result.body);
}

/** Starts peering the external cluster for this migration volume */
export function peerExternalCluster(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: PeerClusterForVolumeMigrationRequest,
  options: VolumesPeerExternalClusterOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterPeerCommandResponse>, ClusterPeerCommandResponse> {
  return getLongRunningPoller(context, _peerExternalClusterDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _peerExternalClusterSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ClusterPeerCommandResponse>, ClusterPeerCommandResponse>;
}

export function _reInitializeReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesReInitializeReplicationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/reinitializeReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reInitializeReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Re-Initializes the replication connection on the destination volume */
export function reInitializeReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesReInitializeReplicationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reInitializeReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reInitializeReplicationSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _authorizeReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: AuthorizeRequest,
  options: VolumesAuthorizeReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/authorizeReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: authorizeRequestSerializer(body),
  });
}

export async function _authorizeReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Authorize the replication connection on the source volume */
export function authorizeReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: AuthorizeRequest,
  options: VolumesAuthorizeReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _authorizeReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _authorizeReplicationSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _deleteReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesDeleteReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/deleteReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteReplicationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete the replication connection on the destination volume, and send release to the source replication */
export function deleteReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesDeleteReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteReplicationSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resyncReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesResyncReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/resyncReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resyncReplicationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resync the connection on the destination volume. If the operation is ran on the source volume it will reverse-resync the connection and sync from destination to source. */
export function resyncReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesResyncReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resyncReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncReplicationSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listReplicationsSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesListReplicationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/listReplications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : listReplicationsRequestSerializer(options["body"]),
  });
}

export async function _listReplicationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListReplications> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listReplicationsDeserializer(result.body);
}

/** List all replications for a specified volume */
export function listReplications(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesListReplicationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Replication> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listReplicationsSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    _listReplicationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _replicationStatusSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesReplicationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/replicationStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _replicationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return replicationStatusDeserializer(result.body);
}

/** Get the status of the replication */
export async function replicationStatus(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesReplicationStatusOptionalParams = { requestOptions: {} },
): Promise<ReplicationStatus> {
  const result = await _replicationStatusSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    options,
  );
  return _replicationStatusDeserialize(result);
}

export function _reestablishReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: ReestablishReplicationRequest,
  options: VolumesReestablishReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/reestablishReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: reestablishReplicationRequestSerializer(body),
  });
}

export async function _reestablishReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Re-establish a previously deleted replication between 2 volumes that have a common ad-hoc or policy-based snapshots */
export function reestablishReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: ReestablishReplicationRequest,
  options: VolumesReestablishReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reestablishReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reestablishReplicationSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _breakReplicationSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesBreakReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/breakReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["body"] ? options["body"] : breakReplicationRequestSerializer(options["body"]),
  });
}

export async function _breakReplicationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Break the replication connection on the destination volume */
export function breakReplication(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesBreakReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _breakReplicationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _breakReplicationSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listGetGroupIdListForLdapUserSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: GetGroupIdListForLdapUserRequest,
  options: VolumesListGetGroupIdListForLdapUserOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/getGroupIdListForLdapUser{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: getGroupIdListForLdapUserRequestSerializer(body),
  });
}

export async function _listGetGroupIdListForLdapUserDeserialize(
  result: PathUncheckedResponse,
): Promise<GetGroupIdListForLdapUserResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getGroupIdListForLdapUserResponseDeserializer(result.body);
}

/** Returns the list of group Ids for a specific LDAP User */
export function listGetGroupIdListForLdapUser(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: GetGroupIdListForLdapUserRequest,
  options: VolumesListGetGroupIdListForLdapUserOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<GetGroupIdListForLdapUserResponse>,
  GetGroupIdListForLdapUserResponse
> {
  return getLongRunningPoller(
    context,
    _listGetGroupIdListForLdapUserDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _listGetGroupIdListForLdapUserSend(
          context,
          resourceGroupName,
          accountName,
          poolName,
          volumeName,
          body,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<GetGroupIdListForLdapUserResponse>,
    GetGroupIdListForLdapUserResponse
  >;
}

export function _breakFileLocksSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesBreakFileLocksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/breakFileLocks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["body"] ? options["body"] : breakFileLocksRequestSerializer(options["body"]),
  });
}

export async function _breakFileLocksDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Break all the file locks on a volume */
export function breakFileLocks(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesBreakFileLocksOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _breakFileLocksDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _breakFileLocksSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _splitCloneFromParentSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesSplitCloneFromParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/splitCloneFromParent{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _splitCloneFromParentDeserialize(
  result: PathUncheckedResponse,
): Promise<Volume> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Split operation to convert clone volume to an independent volume. */
export function splitCloneFromParent(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesSplitCloneFromParentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _splitCloneFromParentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _splitCloneFromParentSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _resetCifsPasswordSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesResetCifsPasswordOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/resetCifsPassword{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetCifsPasswordDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Reset cifs password from volume */
export function resetCifsPassword(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesResetCifsPasswordOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resetCifsPasswordDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetCifsPasswordSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _revertSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: VolumeRevert,
  options: VolumesRevertOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/revert{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: volumeRevertSerializer(body),
  });
}

export async function _revertDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Revert a volume to the snapshot specified in the body */
export function revert(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: VolumeRevert,
  options: VolumesRevertOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _revertDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _revertSend(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _populateAvailabilityZoneSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesPopulateAvailabilityZoneOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/populateAvailabilityZone{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _populateAvailabilityZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<Volume> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** This operation will populate availability zone information for a volume */
export function populateAvailabilityZone(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesPopulateAvailabilityZoneOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(
    context,
    _populateAvailabilityZoneDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _populateAvailabilityZoneSend(
          context,
          resourceGroupName,
          accountName,
          poolName,
          volumeName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<Volume>, Volume>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  options: VolumesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_VolumeList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _volumeListDeserializer(result.body);
}

/** List all volumes within the capacity pool */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  options: VolumesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Volume> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, poolName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}{?api%2Dversion,forceDelete}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
      forceDelete: options?.forceDelete,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete the specified volume */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, poolName, volumeName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: VolumePatch,
  options: VolumesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: volumePatchSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Patch the specified volume */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: VolumePatch,
  options: VolumesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, poolName, volumeName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: Volume,
  options: VolumesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: volumeSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Create or update the specified volume within the capacity pool */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  body: Volume,
  options: VolumesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Volume>, Volume> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Volume>, Volume>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Volume> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeDeserializer(result.body);
}

/** Get the details of the specified volume */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: VolumesGetOptionalParams = { requestOptions: {} },
): Promise<Volume> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    options,
  );
  return _getDeserialize(result);
}
