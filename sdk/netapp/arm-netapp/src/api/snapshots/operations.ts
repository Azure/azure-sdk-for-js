// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  Snapshot,
  SnapshotPatch,
  _SnapshotsList,
  SnapshotRestoreFiles,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  snapshotSerializer,
  snapshotDeserializer,
  snapshotPatchSerializer,
  _snapshotsListDeserializer,
  snapshotRestoreFilesSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SnapshotsRestoreFilesOptionalParams,
  SnapshotsListOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOptionalParams,
  SnapshotsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _restoreFilesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: SnapshotRestoreFiles,
  options: SnapshotsRestoreFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}/restoreFiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: snapshotRestoreFilesSerializer(body),
  });
}

export async function _restoreFilesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Restore the specified files from the specified snapshot to the active filesystem */
export function restoreFiles(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: SnapshotRestoreFiles,
  options: SnapshotsRestoreFilesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restoreFilesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restoreFilesSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: SnapshotsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_SnapshotsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _snapshotsListDeserializer(result.body);
}

/** List all snapshots associated with the volume */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  options: SnapshotsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Snapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, poolName, volumeName, options),
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
  snapshotName: string,
  options: SnapshotsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete snapshot */
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
  snapshotName: string,
  options: SnapshotsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: SnapshotPatch,
  options: SnapshotsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
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
    body: snapshotPatchSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Patch a snapshot */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: SnapshotPatch,
  options: SnapshotsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Snapshot>, Snapshot> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Snapshot>, Snapshot>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: Snapshot,
  options: SnapshotsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
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
    body: snapshotSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["201", "202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Create the specified snapshot within the given volume */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  body: Snapshot,
  options: SnapshotsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Snapshot>, Snapshot> {
  return getLongRunningPoller(context, _createDeserialize, ["201", "202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        snapshotName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Snapshot>, Snapshot>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  options: SnapshotsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      poolName: poolName,
      volumeName: volumeName,
      snapshotName: snapshotName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Get details of the specified snapshot */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  poolName: string,
  volumeName: string,
  snapshotName: string,
  options: SnapshotsGetOptionalParams = { requestOptions: {} },
): Promise<Snapshot> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    snapshotName,
    options,
  );
  return _getDeserialize(result);
}
