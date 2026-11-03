// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext as Client } from "../index.js";
import type {
  VolumeGroupSnapshot,
  _VolumeGroupSnapshotListResult,
  VolumeGroupSnapshotListRequest,
  VolumeGroupSnapshotPostListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  volumeGroupSnapshotSerializer,
  volumeGroupSnapshotDeserializer,
  _volumeGroupSnapshotListResultDeserializer,
  volumeGroupSnapshotListRequestSerializer,
  volumeGroupSnapshotPostListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VolumeGroupSnapshotsListSnapshotsOptionalParams,
  VolumeGroupSnapshotsListByVolumeGroupOptionalParams,
  VolumeGroupSnapshotsDeleteOptionalParams,
  VolumeGroupSnapshotsCreateOptionalParams,
  VolumeGroupSnapshotsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSnapshotsSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  properties: VolumeGroupSnapshotListRequest,
  options: VolumeGroupSnapshotsListSnapshotsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/listSnapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeGroupSnapshotListRequestSerializer(properties),
  });
}

export async function _listSnapshotsDeserialize(
  result: PathUncheckedResponse,
): Promise<VolumeGroupSnapshotPostListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return volumeGroupSnapshotPostListResultDeserializer(result.body);
}
/** List all snapshots for a given volume group using POST with the same request and response contract */
export async function listSnapshots(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  properties: VolumeGroupSnapshotListRequest,
  options: VolumeGroupSnapshotsListSnapshotsOptionalParams = { requestOptions: {} },
): Promise<VolumeGroupSnapshotPostListResult> {
  const result = await _listSnapshotsSend(
    context,
    resourceGroupName,
    storagePoolName,
    volumeGroupName,
    properties,
    options,
  );
  return _listSnapshotsDeserialize(result);
}

export function _listByVolumeGroupSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupSnapshotsListByVolumeGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/snapshots{?api%2Dversion,%24filter,%24orderby,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByVolumeGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_VolumeGroupSnapshotListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _volumeGroupSnapshotListResultDeserializer(result.body);
}
/** List all snapshots for a given volume group */
export function listByVolumeGroup(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  options: VolumeGroupSnapshotsListByVolumeGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VolumeGroupSnapshot> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVolumeGroupSend(context, resourceGroupName, storagePoolName, volumeGroupName, options),
    _listByVolumeGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  snapshotName: string,
  options: VolumeGroupSnapshotsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
/** Delete a volume group snapshot */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  snapshotName: string,
  options: VolumeGroupSnapshotsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        snapshotName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  snapshotName: string,
  resource: VolumeGroupSnapshot,
  options: VolumeGroupSnapshotsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: volumeGroupSnapshotSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<VolumeGroupSnapshot> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return volumeGroupSnapshotDeserializer(result.body);
}
/** Create a manual snapshot of a volume group, or recover from an existing snapshot by providing sourceSnapshotResourceId */
export function create(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  snapshotName: string,
  resource: VolumeGroupSnapshot,
  options: VolumeGroupSnapshotsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VolumeGroupSnapshot>, VolumeGroupSnapshot> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        storagePoolName,
        volumeGroupName,
        snapshotName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<VolumeGroupSnapshot>, VolumeGroupSnapshot>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  snapshotName: string,
  options: VolumeGroupSnapshotsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/storagePools/{storagePoolName}/volumeGroups/{volumeGroupName}/snapshots/{snapshotName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storagePoolName: storagePoolName,
      volumeGroupName: volumeGroupName,
      snapshotName: snapshotName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VolumeGroupSnapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return volumeGroupSnapshotDeserializer(result.body);
}
/** Get a volume group snapshot */
export async function get(
  context: Client,
  resourceGroupName: string,
  storagePoolName: string,
  volumeGroupName: string,
  snapshotName: string,
  options: VolumeGroupSnapshotsGetOptionalParams = { requestOptions: {} },
): Promise<VolumeGroupSnapshot> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storagePoolName,
    volumeGroupName,
    snapshotName,
    options,
  );
  return _getDeserialize(result);
}
